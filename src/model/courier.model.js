import mongoose from 'mongoose'

// Pricing sub-schema for each mode (surface / air)
const pricingSchema = new mongoose.Schema({
  base_price: { type: Number, default: 0 },
  per_kg:     { type: Number, default: 0 },
  eta_days:   { type: Number, default: 0 }
}, { _id: false });

const courierSchema = new mongoose.Schema({

  provider: {
    type: String,
    required: true
  },

  pickup_pincodes: [String],

  delivery_pincodes: [String],

  // ── Backward-compatible flat fields (legacy) ──
  base_price: Number,
  per_kg:     Number,
  eta_days:   Number,

  // ── Mode-based nested pricing ──
  surface: pricingSchema,
  air:     pricingSchema,

  // ── Courier type support ──
  // Which shipment types this courier handles: "docx", "nonDocx", or both
  supported_types: {
    type: [String],
    enum: ['docx', 'nonDocx'],
    default: ['docx', 'nonDocx']
  },

  active: Boolean,

  rating: {
    type: Number,
    default: 4
  },

  success_rate: {
    type: Number,
    default: 95
  },

  on_time_rate: {
    type: Number,
    default: 90
  },

  damage_rate: {
    type: Number,
    default: 2
  },

  coverage_score: {
    type: Number,
    default: 80
  },

  priority: {
    type: Number,
    default: 1
  }

});

const Courier = mongoose.model('courier', courierSchema, "courierProviders")
export default Courier