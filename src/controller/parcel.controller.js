import Parcel from "../model/parcel.model.js";
import User from "../model/user.model.js";
import Courier from "../model/courier.model.js";
import Shipment from "../model/shipment.model.js";
import { bookingConfirmation } from '../services/mail.service.js';
import { insuranceAmount_cal } from "../logic/insurance.logic.js";
import { volumePrice_cal } from "../logic/volumePrice.logic.js";
import insurance from "../model/insurance.model.js";

export const createParcel = async (req, res) => {
  try {
    const userId = req.user;
    const {
      senderName,
      senderPhoneNumber,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
      DelevarableType,
      weight,
      no_of_parcel,
      length,
      width,
      height,
      declaredValue,
      riskType,
      
      courierType ,
      mode,
      description
    } = req.body;

    // VALIDATION
    if (!senderAddress?.pincode || !receiverAddress?.pincode) {
      return res.status(400).json({ response: "pincode required" });
    }

    if (senderAddress.pincode.length !== 6 || receiverAddress.pincode.length !== 6) {
      return res.status(400).json({ response: "invalid pincode" });
    }

    if (weight <= 0) {
      return res.status(400).json({ response: "invalid weight" });
    }

   const amnt_insurance = insuranceAmount_cal(declaredValue,riskType)
   console.log(amnt_insurance)

   const volumePrice = volumePrice_cal(length,width,height,mode)
   console.log(volumePrice)


   

    // Fetch sender email from user record
    const userDoc = await User.findById(userId);
    const senderEmail = userDoc?.email || '';

    // CHECK COURIER AVAILABILITY BEFORE CREATING PARCEL
    const courierQuery = {
      active: true,
      pickup_pincodes: { $in: [senderAddress.pincode] },
      delivery_pincodes: { $in: [receiverAddress.pincode] }
    };

    if (courierType) {
      courierQuery.$or = [
        { supported_types: { $in: [courierType] } },
        { supported_types: { $exists: false } },
        { supported_types: { $size: 0 } }
      ];
    }

    const availableCourier = await Courier.findOne(courierQuery);
    if (!availableCourier) {
      return res.status(400).json({ response: "No courier available for these pincodes and package type" });
    }

    // CREATE PARCEL
    const parcel = await Parcel.create({
      senderId: userId,
      senderName,
      senderEmail,
      senderPhoneNumber,
      senderAddress: {
        fullAddress: senderAddress.fullAddress,
        landmark: senderAddress.landmark,
        city: senderAddress.city,
        state: senderAddress.state,
        pincode: senderAddress.pincode
      },
      receiverName,
      receiverPhone,
      receiverAddress: {
        fullAddress: receiverAddress.fullAddress,
        landmark: receiverAddress.landmark,
        city: receiverAddress.city,
        state: receiverAddress.state,
        pincode: receiverAddress.pincode
      },
      DelevarableType,
      weight,
      no_of_parcel,
      length,
      width,
      height,
      declaredValue,
      riskType,
      riskCharge:amnt_insurance,
      volumePrice:volumePrice,
      courierType ,
      mode,
      description,
      status: "CREATED"
    });


    res.status(200).json({
      "response" : "parcel created ,",
      parcel
    })
  }catch(err){
      return res.status(500).json({
        "response" : err.message
      })
    }
}

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

  export  const courierOption = async (req,res)=>{

      const userId = req.user
      const parcelId  = req.params.parcelId

      try{
      
      const parcel = await Parcel.findById(parcelId)
      if(!parcel){
        return res.status(404).json({
          response : "parcel not found"
        })
      }
     console.log(parcel)

    // Build query – filter by courierType if the courier has supported_types
    const query = {
      active: true,
      pickup_pincodes: { $in: [parcel.senderAddress.pincode] },
      delivery_pincodes: { $in: [parcel.receiverAddress.pincode] }
    };

    // Only add type filter when the parcel specifies a courierType
    if (parcel.courierType) {
      query.$or = [
        { supported_types: { $in: [parcel.courierType] } },
        { supported_types: { $exists: false } },   // legacy docs without this field
        { supported_types: { $size: 0 } }           // legacy docs with empty array
      ];
    }

    // FIND COURIERS
    const couriers = await Courier.find(query);

    // NO COURIER
    if (!couriers.length) {
      return res.status(404).json({
        response: "no courier available",
        parcel
      });
    }

    // SMART RECOMMENDATION
    const recommendation = couriers.map(c => {
      const pricing = resolvePricing(c, parcel.mode);
      const basePrice = pricing.base_price || 0;
      const perKg     = pricing.per_kg     || 0;
      const etaDays   = pricing.eta_days   || 0;

      let price = basePrice + (parcel.weight * perKg) + parcel.riskCharge + parcel.volumePrice;
      price = Math.round(price * 100) / 100;

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
        score: Math.round(finalScore),
        rating: c.rating,
        mode: parcel.mode,
        courierType: parcel.courierType
      };
    });

    // SORTING
    const cheapest = [...recommendation].sort((a, b) => a.price - b.price)[0];
    const fastest = [...recommendation].sort((a, b) => a.eta - b.eta)[0];
    const recommended = [...recommendation].sort((a, b) => b.score - a.score)[0];

    // RESPONSE
    return res.status(201).json({
      response: "couriers found",
      parcel,
      couriers: {
        cheapest,
        fastest,
        recommended,
        all: recommendation.sort((a, b) => b.score - a.score)
      }

    });
  }catch(err){
    return res.status(500).json({
      response : err.message
    })
  } 

  } 

/**
 * - post : /parcel/confirmOrder
 * - used to make order placed.
 */
// CONFIRM COURIER
export const confirmCourier = async (req, res) => {
  try {
    const userId = req.user;
    const { parcelId, courierId, recommendationType } = req.body;

    // GET PARCEL
    const parcelData = await Parcel.findOne({
      _id: parcelId,
      senderId: userId
    });

    if (!parcelData) {
      return res.status(404).json({ response: "parcel not found" });
    }

    // GET COURIER
    const courierData = await Courier.findById(courierId);

    if (!courierData) {
      return res.status(404).json({ response: "courier not found" });
    }

    // CHECK SERVICEABILITY
    const pickupAvailable = courierData.pickup_pincodes.includes(parcelData.senderAddress.pincode);
    const deliveryAvailable = courierData.delivery_pincodes.includes(parcelData.receiverAddress.pincode);

    if (!pickupAvailable || !deliveryAvailable) {
      return res.status(400).json({ response: "courier not serviceable" });
    }

    // MODE-BASED PRICE CALCULATION (handles both legacy + new schema)
    const pricing = resolvePricing(courierData, parcelData.mode);
    const basePrice = pricing.base_price || 0;
    const perKg = pricing.per_kg || 0;
    const etaDays = pricing.eta_days || 0;

    const weightCharge = parcelData.weight * perKg;
    let totalAmount = basePrice + weightCharge + (parcelData.riskCharge || 0) + (parcelData.volumePrice || 0);
    
    // Round off to 2 decimal places
    totalAmount = Math.round(totalAmount * 100) / 100;

    if (totalAmount <= 0) {
      return res.status(400).json({ response: "Invalid shipment price (₹0). Please check courier pricing configuration." });
    }

    // ORDER ID
    const orderId = "ORD_" + Date.now();

    // UPI LINK
    const upiUrl = `upi://pay?pa=v17957621@oksbi&pn=AGGREGATOR SOFTWARE&am=${totalAmount}&cu=INR&tn=${orderId}`;

    // CREATE SHIPMENT
    const shipment = await Shipment.create({
      senderId: userId,
      parcelId: parcelData._id,
      courierId: courierData._id,
      courierPartner: courierData.provider,
      price: totalAmount,
      description: parcelData.description || '',
      eta: etaDays,
      paymentStatus: "PENDING",
      shipmentStatus: "PAYMENT_PENDING",
      mode: parcelData.mode,
      upiUrl,
      receiver: {
        name: parcelData.receiverName,
        phone: parcelData.receiverPhone,
        address: parcelData.receiverAddress
      },
      sender: {
        name: parcelData.senderName,
        phone: parcelData.senderPhoneNumber,
        address: parcelData.senderAddress
      }
    });

    await insurance.create({
      shipmentId : shipment._id,
      insuranceAmount : parcelData.riskCharge,
      mode : parcelData.mode,
      DelevarableType: parcelData.DelevarableType,
    });

    // RESPONSE
    return res.status(201).json({
      response: "payment required",
      payment: {
        amount: totalAmount,
        upiUrl,
        orderId
      },
      shipment: {
        shipmentId: shipment._id,
        courier: shipment.courierPartner,
        amount: shipment.price,
        eta: shipment.eta,
        paymentStatus: shipment.paymentStatus,
        status: shipment.shipmentStatus
      },
      priceBreakdown: {
        basePrice,
        weightCharge,
        volumePrice: parcelData.volumePrice,
        riskCharge: parcelData.riskCharge,
        total: totalAmount
      }
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ response: err.message });
  }
};

/**
 *  -  POST : /api/payment/verify
 */
export const verifyPayment = async (req, res) => {
  try {
    const { shipmentId, utrNumber, paymentScreenshot, amount } = req.body;

    // VALIDATE REQUIRED FIELDS
    if (!shipmentId || !utrNumber) {
      return res.status(400).json({ response: "shipmentId and utrNumber are required" });
    }

    // FIND SHIPMENT
    const shipment = await Shipment.findById(shipmentId);

    if (!shipment) {
      return res.status(404).json({ response: "shipment not found" });
    }
    console.log(shipment);

    // ALREADY VERIFIED
    if (shipment.paymentStatus === "PAID") {
      return res.status(400).json({ response: "payment already verified" });
    }

    // AMOUNT VALIDATION — the paid amount must match the shipment price exactly
    const expectedAmount = shipment.price;
    const paidAmount = Number(amount);

    if (!amount || isNaN(paidAmount)) {
      return res.status(400).json({
        response: "payment amount is required",
        expectedAmount: expectedAmount
      });
    }

    if (paidAmount !== expectedAmount) {
      return res.status(400).json({
        response: `Payment amount mismatch. Expected ₹${expectedAmount} but received ₹${paidAmount}`,
        expectedAmount: expectedAmount,
        receivedAmount: paidAmount
      });
    }

    // UPDATE PAYMENT
    shipment.paymentStatus = "PAID";
    shipment.shipmentStatus = "BOOKED";
    shipment.utr = utrNumber;
    shipment.awb = "AWB" + Date.now();

    // TRACKING HISTORY
    shipment.trackingHistory.push({
      status: "BOOKED",
      location: shipment.sender?.address?.city ? `${shipment.sender.address.city}, ${shipment.sender.address.pincode}` : "Pickup Location",
      time: new Date()
    });

    // OPTIONAL SCREENSHOT
    if (paymentScreenshot) {
      shipment.paymentScreenshot = paymentScreenshot;
    }

    await shipment.save();

    // UPDATE PARCEL
    await Parcel.findByIdAndUpdate(shipment.parcelId, { status: "BOOKED" });

    // RESPONSE
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
    console.log(err);
    return res.status(500).json({ response: err.message });
  }
};

/**
 * - get : /shipments
 * - returns all shipments for the logged-in user
 */
export const getUserShipments = async (req, res) => {
  try {
    const userId = req.user;
    const shipments = await Shipment.find({ senderId: userId })
      .sort({ createdAt: -1 })
      .select('awb courierPartner price eta shipmentStatus paymentStatus createdAt sender receiver');
      
    return res.status(200).json({ shipments });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};
