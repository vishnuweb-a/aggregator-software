import mongoose from "mongoose";

const webhookLogSchema = new mongoose.Schema({
  eventType: {
    type: String,
    required: true,
    index: true
  },
  payload: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  receivedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ["success", "failed", "ignored"],
    default: "success"
  },
  error: String,
  razorpayOrderId: String,
  razorpayPaymentId: String,
  shipmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shipment"
  }
}, { timestamps: true });

export default mongoose.model("webhookLog", webhookLogSchema);
