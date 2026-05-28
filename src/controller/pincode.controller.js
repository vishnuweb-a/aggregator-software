import PincodeDB from "../model/pincode.model.js";

/**
 * GET /api/pincode/lookup/:pincode
 * Lookup city & state by pincode
 */
export const lookupByPincode = async (req, res) => {
  try {
    const { pincode } = req.params;

    if (!pincode || pincode.length !== 6) {
      return res.status(400).json({ response: "invalid pincode" });
    }

    const result = await PincodeDB.findOne({ pincode });

    if (!result) {
      return res.status(404).json({ response: "pincode not found" });
    }

    return res.status(200).json({
      pincode: result.pincode,
      city: result.city,
      state: result.state,
      serviceable: result.serviceable,
      zone: result.zone,
      deliveryType: result.deliveryType,
      codAvailable: result.codAvailable,
      estimatedDeliveryDays: result.estimatedDeliveryDays,
    });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};

/**
 * GET /api/pincode/search?city=Mumbai
 * Search pincodes by city name (partial match)
 */
export const searchByCity = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city || city.length < 2) {
      return res.status(400).json({ response: "city name too short" });
    }

    const results = await PincodeDB.find({
      city: { $regex: city, $options: "i" },
      serviceable: true,
    })
      .limit(20)
      .select("pincode city state zone deliveryType");

    return res.status(200).json({ results });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};
