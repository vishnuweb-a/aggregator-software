import Parcel from "../model/parcel.model.js";
import Courier from "../model/courier.model.js";

/**
 * Resolve pricing from a courier document.
 * Supports BOTH legacy flat fields (base_price, per_kg, eta_days)
 * AND new nested mode objects (surface / air).
 */
function resolvePricing(courier, mode) {
  // Try nested first (new schema)
  if (mode === 'AIRWAY' && courier.air && courier.air.base_price != null) {
    return courier.air;
  }
  if (courier.surface && courier.surface.base_price != null) {
    return courier.surface;
  }
  // Fallback to legacy flat fields
  return {
    base_price: courier.base_price || 0,
    per_kg:     courier.per_kg     || 0,
    eta_days:   courier.eta_days   || 0
  };
}

export const smartRecommend = async (req, res) => {
  try {
    const { parcelId } = req.params;

    const parcel = await Parcel.findById(parcelId);

    if (!parcel) {
      return res.status(404).json({
        response: "parcel not found"
      });
    }
    console.log("parcel info is:", parcel);

    // Build query – filter by courierType if set
    const query = {
      active: true,
      pickup_pincodes: { $in: [parcel.senderAddress.pincode] },
      delivery_pincodes: { $in: [parcel.receiverAddress.pincode] }
    };

    if (parcel.courierType) {
      query.$or = [
        { supported_types: { $in: [parcel.courierType] } },
        { supported_types: { $exists: false } },
        { supported_types: { $size: 0 } }
      ];
    }

    const couriers = await Courier.find(query);
    console.log("couriers are:", couriers, "and length is:", couriers.length);

    if (!couriers.length) {
      return res.status(404).json({
        response: "no courier found"
      });
    }

    const result = couriers.map(c => {
      const pricing = resolvePricing(c, parcel.mode);
      const basePrice = pricing.base_price || 0;
      const perKg     = pricing.per_kg     || 0;
      const etaDays   = pricing.eta_days   || 0;

      const price = basePrice + (parcel.weight * perKg);
      const priceScore = 100 - Math.min(price, 100);
      const etaScore = 100 - (etaDays * 10);
      const safetyScore = 100 - ((c.damage_rate || 0) * 5);

      const finalScore =
        (priceScore * 0.30) +
        (etaScore * 0.25) +
        ((c.success_rate || 0) * 0.20) +
        ((c.on_time_rate || 0) * 0.15) +
        (safetyScore * 0.05) +
        ((c.coverage_score || 0) * 0.05) +
        (c.priority || 0);

      return {
        courierId: c._id,
        provider: c.provider,
        price,
        eta: etaDays,
        score: Math.round(finalScore) || 0,
        rating: c.rating,
        mode: parcel.mode,
        courierType: parcel.courierType
      };
    });

    const cheapest = [...result].sort((a, b) => a.price - b.price)[0];
    const fastest  = [...result].sort((a, b) => a.eta - b.eta)[0];
    const recommended = [...result].sort((a, b) => b.score - a.score)[0];

    return res.status(200).json({
      parcelId,
      cheapest,
      fastest,
      recommended,
      all: result.sort((a, b) => b.score - a.score)
    });

  } catch (err) {
    return res.status(500).json({
      response: err.message
    });
  }
};