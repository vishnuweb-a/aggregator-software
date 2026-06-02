import mongoose from "mongoose";

const zonePricingSchema = new mongoose.Schema(
  {
    fromZone: {
      type: String,
      required: true,
      enum: [
        "NORTH",
        "SOUTH",
        "EAST",
        "WEST",
        "CENTRAL",
        "NORTHEAST"
      ],
      index: true
    },
    toZone: {
      type: String,
      required: true,
      enum: [
        "NORTH",
        "SOUTH",
        "EAST",
        "WEST",
        "CENTRAL",
        "NORTHEAST"
      ],
      index: true
    },
    surfaceCharge: {
      type: Number,
      default: 0
    },
    airwayCharge: {
      type: Number,
      default: 0
    },
    estimatedDays: {
      type: Number,
      default: 3
    }
  },
  {
    timestamps: true
  }
);

// Compound index for fast lookups
zonePricingSchema.index({ fromZone: 1, toZone: 1 }, { unique: true });

const ZonePricing = mongoose.model("zonePricing", zonePricingSchema);

export default ZonePricing;
