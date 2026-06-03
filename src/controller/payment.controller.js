import Shipment from "../model/shipment.model.js";
import Parcel from "../model/parcel.model.js";
import razorpayInstance from "../service/razorpay.js";
import credential from "../config/config.js";
import crypto from "crypto";

/**
 * POST /api/user/payment/razorpay/create
 * Creates a Razorpay order for shipment payment
 */
export const createShipmentOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { shipmentId } = req.body;

    if (!shipmentId) {
      return res.status(400).json({ response: "shipmentId is required" });
    }

    const shipment = await Shipment.findOne({ _id: shipmentId, senderId: userId });
    if (!shipment) {
      return res.status(404).json({ response: "shipment not found" });
    }

    if (shipment.paymentStatus === "PAID") {
      return res.status(400).json({ response: "Shipment is already paid" });
    }

    const amountInPaise = Math.round(shipment.price * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `shp_${String(shipmentId).slice(-6)}_${Date.now()}`,
      notes: {
        type: "SHIPMENT_PAYMENT",
        userId: String(userId),
        shipmentId: String(shipmentId)
      }
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(201).json({
      orderId: order.id,
      amount: shipment.price,
      currency: order.currency,
      shipmentId: shipment._id,
      keyId: credential.razorpayKeyId
    });
  } catch (err) {
    console.log("Razorpay shipment create order error:", err);
    return res.status(500).json({ response: err.message });
  }
};

/**
 * POST /api/user/payment/razorpay/verify
 * Verifies Razorpay signature and updates shipment status
 */
export const verifyShipmentPayment = async (req, res) => {
  try {
    const userId = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, shipmentId } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !shipmentId) {
      return res.status(400).json({ response: "Missing payment verification fields" });
    }

    const shipment = await Shipment.findOne({ _id: shipmentId, senderId: userId });
    if (!shipment) {
      return res.status(404).json({ response: "shipment not found" });
    }

    if (shipment.paymentStatus === "PAID") {
      return res.status(400).json({ response: "payment already verified" });
    }

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", credential.razorpayKeySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ response: "Payment verification failed — invalid signature" });
    }

    // Update shipment
    shipment.paymentStatus = "PAID";
    shipment.shipmentStatus = "BOOKED";
    shipment.utr = razorpay_payment_id;
    shipment.awb = "AWB" + Date.now();

    shipment.trackingHistory.push({
      status: "BOOKED",
      location: shipment.sender?.address?.city ? `${shipment.sender.address.city}, ${shipment.sender.address.pincode}` : "Pickup Location",
      time: new Date()
    });

    await shipment.save();

    // Update parcel
    await Parcel.findByIdAndUpdate(shipment.parcelId, { status: "BOOKED" });

    return res.status(200).json({
      response: "payment verified",
      shipment: {
        shipmentId: shipment._id,
        awb: shipment.awb,
        courier: shipment.courierPartner,
        amount: shipment.price,
        eta: shipment.eta,
        paymentStatus: shipment.paymentStatus,
        status: shipment.shipmentStatus,
        trackingHistory: shipment.trackingHistory
      }
    });
  } catch (err) {
    console.log("Razorpay shipment verify error:", err);
    return res.status(500).json({ response: err.message });
  }
};
