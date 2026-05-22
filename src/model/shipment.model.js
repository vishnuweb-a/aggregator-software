import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
  {
    // user who created shipment
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // linked parcel
    parcelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parcel",
      required: true,
    },

    // selected courier
    courierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourierService",
      required: true,
    },

    // provider name
    courierPartner: {
      type: String,
      required: true,
    },

    // calculated final price
    price: {
      type: Number,
      required: true,
    },

    // estimated delivery time
    eta: {
      type: Number,
      required: true,
    },

    // generated shipment code
    awb: {
      type: String,
      required: true,
      unique: true,
    },

    // shipment lifecycle
    status: {
      type: String,
      enum: [
        "BOOKED",
        "PICKED_UP",
        "IN_TRANSIT",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "BOOKED",
    },

    // receiver details
    receiver: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
    },

    // sender details snapshot
    sender: {
      name: String,
      phone: String,
      address: String,
    },

    // payment info
    paymentType: {
      type: String,
      enum: ["PREPAID", "COD"],
      default: "PREPAID",
    },

    // tracking timeline
    trackingHistory: [
      {
        status: String,
        location: String,
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// indexes
shipmentSchema.index({ senderId: 1 });
shipmentSchema.index({ parcelId: 1 });
shipmentSchema.index({ courierId: 1 });

shipmentSchema.index({ status: 1 });

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;