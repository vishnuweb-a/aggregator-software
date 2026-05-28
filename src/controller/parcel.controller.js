import Parcel from "../model/parcel.model.js";
import Courier from "../model/courier.model.js";
import Shipment from "../model/shipment.model.js";
import { bookingConfirmation } from '../services/mail.service.js';

export const createParcel = async (req, res) => {
  try {
    const userId = req.user;
    const {
      senderName,
      senderEmail,
      senderPhoneNumber,
      senderAddress,
      receiverName,
      receiverPhone,
      receiverAddress,
      DelevarableType,
      weight
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

  export  const courierOption = async (req,res)=>{

      const userId = req.user
      const parcelId  = req.params.parcelId
    //  console.log("here is the prcelid", parcelId.parcelId)

      try{
      
      const parcel = await Parcel.findById(parcelId)
      if(!parcel){
        return res.status(404).json({
          response : "parcel not found"
        })
      }
     console.log(parcel)


    // FIND COURIERS
    const couriers = await Courier.find({
      active: true,
      pickup_pincodes: { $in: [parcel.senderAddress.pincode] },
      delivery_pincodes: { $in: [parcel.receiverAddress.pincode] },
      max_weight: { $gte: parcel.weight }
    });

    // NO COURIER
    if (!couriers.length) {
      return res.status(404).json({
        response: "no courier available",
        parcel
      });
    }

    // SMART RECOMMENDATION
    const recommendation = couriers.map(c => {
      const price = c.base_price + (parcel.weight * c.per_kg);
      const priceScore = 100 - Math.min(price, 100);
      const etaScore = 100 - (c.eta_days * 10);
      const safetyScore = 100 - (c.damage_rate * 5);

      const finalScore = 
        (priceScore * 0.30) + 
        (etaScore * 0.25) + 
        (c.success_rate * 0.20) + 
        (c.on_time_rate * 0.15) + 
        (safetyScore * 0.05) + 
        (c.coverage_score * 0.05) + 
        c.priority;

      return {
        courierId: c._id,
        provider: c.provider,
        price,
        eta: c.eta_days,
        score: Math.round(finalScore),
        rating: c.rating
      };
    });

    // SORTING
    const cheapest = [...recommendation].sort((a, b) => a.price - b.price)[0];
    const fastest = [...recommendation].sort((a, b) => a.eta - b.eta)[0];
    const recommended = [...recommendation].sort((a, b) => b.score - a.score)[0];

    // RESPONSE
    return res.status(201).json({
      response: "parcel created",
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

    // PRICE CALCULATION
    const totalAmount = courierData.base_price + (parcelData.weight * courierData.per_kg);

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
      eta: courierData.eta_days,
      paymentStatus: "PENDING",
      shipmentStatus: "PAYMENT_PENDING",
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
    const { shipmentId, utrNumber, paymentScreenshot } = req.body;

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
      .select('awb courierPartner price eta shipmentStatus paymentStatus createdAt');
      
    return res.status(200).json({ shipments });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};
