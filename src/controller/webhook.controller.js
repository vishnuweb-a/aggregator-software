import crypto from "crypto";
import Shipment from "../model/shipment.model.js";
import Parcel from "../model/parcel.model.js";
import WebhookLog from "../model/webhookLog.model.js";
import credential from "../config/config.js";

/**
 * POST /api/payment/webhook
 * Razorpay webhook handler — receives raw body, verifies signature, processes events
 */
export const handleWebhook = async (req, res) => {
  let eventType = "unknown";

  try {
    // ─── 1. Verify Signature ─────────────────────────
    const signature = req.headers["x-razorpay-signature"];
    const webhookSecret = credential.razorpayWebhookSecret;

    if (!signature || !webhookSecret) {
      await WebhookLog.create({
        eventType: "missing_signature",
        payload: {},
        status: "failed",
        error: !signature ? "Missing x-razorpay-signature header" : "Missing RAZORPAY_WEBHOOK_SECRET in config"
      });
      return res.status(400).json({ response: "Invalid webhook request" });
    }

    // req.body is a raw Buffer (express.raw middleware)
    const rawBody = req.body;
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    if (expectedSignature !== signature) {
      await WebhookLog.create({
        eventType: "invalid_signature",
        payload: {},
        status: "failed",
        error: "Signature mismatch"
      });
      return res.status(400).json({ response: "Invalid signature" });
    }

    // ─── 2. Parse Payload ────────────────────────────
    const event = JSON.parse(rawBody.toString());
    eventType = event.event;

    // ─── 3. Route by Event Type ──────────────────────
    switch (eventType) {
      case "payment.captured":
        await handlePaymentCaptured(event);
        break;

      case "payment.failed":
        await handlePaymentFailed(event);
        break;

      case "refund.created":
        await handleRefundCreated(event);
        break;

      case "refund.processed":
        await handleRefundProcessed(event);
        break;

      default:
        // Log unknown events but acknowledge them
        await WebhookLog.create({
          eventType,
          payload: event,
          status: "ignored",
          error: `Unhandled event type: ${eventType}`
        });
        break;
    }

    // Razorpay expects 200 OK for all successfully received webhooks
    return res.status(200).json({ status: "ok" });

  } catch (err) {
    console.error(`Webhook error [${eventType}]:`, err.message);

    // Log the failure
    try {
      await WebhookLog.create({
        eventType,
        payload: req.body ? JSON.parse(req.body.toString()) : {},
        status: "failed",
        error: err.message
      });
    } catch (logErr) {
      console.error("Failed to log webhook error:", logErr.message);
    }

    // Still return 200 to prevent Razorpay from retrying
    return res.status(200).json({ status: "error logged" });
  }
};


// ─── Event Handlers ───────────────────────────────────

/**
 * payment.captured — Payment successful
 * Updates shipment to PAID/BOOKED, generates AWB, adds tracking
 */
async function handlePaymentCaptured(event) {
  const payment = event.payload?.payment?.entity;
  if (!payment) throw new Error("No payment entity in payload");

  const orderId = payment.order_id;
  const paymentId = payment.id;

  // Find shipment by razorpayOrderId
  const shipment = await Shipment.findOne({ razorpayOrderId: orderId });

  if (!shipment) {
    await WebhookLog.create({
      eventType: "payment.captured",
      payload: event,
      status: "failed",
      error: `No shipment found for order ${orderId}`,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId
    });
    return;
  }

  // Prevent duplicate processing
  if (shipment.paymentStatus === "PAID") {
    await WebhookLog.create({
      eventType: "payment.captured",
      payload: event,
      status: "ignored",
      error: "Shipment already paid — duplicate webhook",
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      shipmentId: shipment._id
    });
    return;
  }

  // Update shipment
  shipment.paymentStatus = "PAID";
  shipment.shipmentStatus = "BOOKED";
  shipment.razorpayPaymentId = paymentId;
  shipment.utr = paymentId;

  // Generate AWB if missing
  if (!shipment.awb) {
    shipment.awb = "AWB" + Date.now();
  }

  // Add tracking event
  shipment.trackingHistory.push({
    status: "BOOKED",
    title: "Shipment Booked",
    description: "Payment received and shipment confirmed",
    location: shipment.sender?.address?.city
      ? `${shipment.sender.address.city}, ${shipment.sender.address.pincode}`
      : "Origin Hub",
    timestamp: new Date()
  });

  await shipment.save();

  // Update parcel status
  if (shipment.parcelId) {
    await Parcel.findByIdAndUpdate(shipment.parcelId, { status: "BOOKED" });
  }

  // Log success
  await WebhookLog.create({
    eventType: "payment.captured",
    payload: event,
    status: "success",
    razorpayOrderId: orderId,
    razorpayPaymentId: paymentId,
    shipmentId: shipment._id
  });
}

/**
 * payment.failed — Payment failed
 * Updates shipment to FAILED/PAYMENT_FAILED
 */
async function handlePaymentFailed(event) {
  const payment = event.payload?.payment?.entity;
  if (!payment) throw new Error("No payment entity in payload");

  const orderId = payment.order_id;
  const paymentId = payment.id;

  const shipment = await Shipment.findOne({ razorpayOrderId: orderId });

  if (!shipment) {
    await WebhookLog.create({
      eventType: "payment.failed",
      payload: event,
      status: "failed",
      error: `No shipment found for order ${orderId}`,
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId
    });
    return;
  }

  // Don't override if already paid (race condition guard)
  if (shipment.paymentStatus === "PAID") {
    await WebhookLog.create({
      eventType: "payment.failed",
      payload: event,
      status: "ignored",
      error: "Shipment already paid — ignoring failure event",
      razorpayOrderId: orderId,
      shipmentId: shipment._id
    });
    return;
  }

  shipment.paymentStatus = "FAILED";
  shipment.shipmentStatus = "PAYMENT_FAILED";
  shipment.razorpayPaymentId = paymentId;
  await shipment.save();

  await WebhookLog.create({
    eventType: "payment.failed",
    payload: event,
    status: "success",
    razorpayOrderId: orderId,
    razorpayPaymentId: paymentId,
    shipmentId: shipment._id
  });
}

/**
 * refund.created — Refund initiated on Razorpay
 * Updates paymentStatus to REFUND_INITIATED
 */
async function handleRefundCreated(event) {
  const refund = event.payload?.refund?.entity;
  if (!refund) throw new Error("No refund entity in payload");

  const paymentId = refund.payment_id;
  const refundId = refund.id;

  const shipment = await Shipment.findOne({ razorpayPaymentId: paymentId });

  if (!shipment) {
    await WebhookLog.create({
      eventType: "refund.created",
      payload: event,
      status: "failed",
      error: `No shipment found for payment ${paymentId}`,
      razorpayPaymentId: paymentId
    });
    return;
  }

  shipment.paymentStatus = "REFUND_INITIATED";
  shipment.refund = {
    refundId: refundId,
    refundAmount: refund.amount / 100, // Razorpay sends amount in paise
    refundStatus: "INITIATED",
    refundDate: new Date(),
    refundReason: refund.notes?.reason || "Refund initiated"
  };
  await shipment.save();

  await WebhookLog.create({
    eventType: "refund.created",
    payload: event,
    status: "success",
    razorpayPaymentId: paymentId,
    shipmentId: shipment._id
  });
}

/**
 * refund.processed — Refund completed on Razorpay
 * Updates paymentStatus to REFUNDED, shipmentStatus to REFUNDED
 */
async function handleRefundProcessed(event) {
  const refund = event.payload?.refund?.entity;
  if (!refund) throw new Error("No refund entity in payload");

  const paymentId = refund.payment_id;
  const refundId = refund.id;

  const shipment = await Shipment.findOne({ razorpayPaymentId: paymentId });

  if (!shipment) {
    await WebhookLog.create({
      eventType: "refund.processed",
      payload: event,
      status: "failed",
      error: `No shipment found for payment ${paymentId}`,
      razorpayPaymentId: paymentId
    });
    return;
  }

  shipment.paymentStatus = "REFUNDED";
  shipment.shipmentStatus = "REFUNDED";

  if (shipment.refund) {
    shipment.refund.refundStatus = "PROCESSED";
    shipment.refund.refundDate = new Date();
  } else {
    shipment.refund = {
      refundId: refundId,
      refundAmount: refund.amount / 100,
      refundStatus: "PROCESSED",
      refundDate: new Date(),
      refundReason: refund.notes?.reason || "Refund processed"
    };
  }

  // Add tracking event
  shipment.trackingHistory.push({
    status: "REFUNDED",
    title: "Payment Refunded",
    description: `Refund of ₹${refund.amount / 100} processed successfully`,
    location: "System",
    timestamp: new Date()
  });

  await shipment.save();

  await WebhookLog.create({
    eventType: "refund.processed",
    payload: event,
    status: "success",
    razorpayPaymentId: paymentId,
    shipmentId: shipment._id
  });
}
