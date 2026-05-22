import Parcel from "../model/parcel.model.js";
import Courier from "../model/courier.model.js";
import Shipment from "../model/shipment.model.js";
import {bookingConfirmation}  from '../services/mail.service.js'

/**
 *  - post :  /parcel
 *  - used to create a parcel of status CREATED
 */
// CREATE PARCEL
export const parcel = async (req, res) => {
  try {
    const userId = req.user;

    const {
      senderName,
      senderEmail,
      senderPhoneNumber,
      senderAddress,
      recieverName,
      recieverPhone,
      recieverAddress,
      DelevarableType,
      weight,
    } = req.body;

    const requiredFields = {
      senderName,
      senderEmail,
      senderPhoneNumber,
      senderAddress,
      recieverName,
      recieverPhone,
      recieverAddress,
      DelevarableType,
      weight,
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length) {
      return res.status(400).json({
        response: "missing fields",
        fields: missingFields,
      });
    }

    const createParcel = await Parcel.create({
      senderId: userId,
      senderName,
      senderEmail,
      senderPhoneNumber,
      senderAddress,
      recieverName,
      recieverPhone,
      recieverAddress,
      DelevarableType,
      weight,
      status: "CREATED",
    });

    return res.status(201).json({
      response: "parcel created",
      parcel: createParcel,
    });
  } catch (err) {
    return res.status(500).json({
      response: err.message,
    });
  }
};

/**
 * - get : /courier/:parcelId
 *  -  get courier options
 */
// GET COURIER OPTIONS
export const courierOption = async (req, res) => {
  try {
    const userId = req.user;
    const { parcelId } = req.params;

    const parcelDetail = await Parcel.findOne({
      _id: parcelId,
      senderId: userId,
    });

    if (!parcelDetail) {
      return res.status(404).json({
        response: "parcel not found",
      });
    }

    const courierAvailable = await Courier.aggregate([
      {
        $match: {
          active: true,
          pickup_supported:   { $in: [parcelDetail.senderAddress] },
          delivery_supported: { $in: [parcelDetail.recieverAddress] },
        },
      },
      {
        $addFields: {
          price: {
            $add: [
              "$base_price",
              {
                $multiply: [parcelDetail.weight, "$per_kg"],
              },
            ],
          },
        },
      },
      {
        $project: {
          provider: 1,
          price: 1,
          eta_days: 1,
          base_price: 1,
        },
      },
      {
        $sort: {
          price: 1,
        },
      },
    ]);

    if (!courierAvailable.length) {
      return res.status(404).json({
        response: "no courier found",
      });
    }

    return res.status(200).json({
      response: "couriers found",
      data: courierAvailable,
    });
  } catch (err) {
    return res.status(500).json({
      response: err.message,
    });
  }
};

/**
 * - post : /parcel/confirmOrder
 * - used to make order placed.
 */
// CONFIRM COURIER
export const confirmCourier = async (req, res) => {
  try {
    const userId = req.user;

    const { parcelId, courierId } = req.body;

    // get parcel
    const parcelData = await Parcel.findOne({
      _id: parcelId,
      senderId: userId,
    });

    if (!parcelData) {
      return res.status(404).json({
        response: "parcel not found",
      });
    }

    // get courier
    const courierData = await Courier.findById(courierId);

    if (!courierData) {
      return res.status(404).json({
        response: "courier not found",
      });
    }

    // calculate final price
    const finalPrice = courierData.base_price + parcelData.weight * courierData.per_kg;

    // create awb
    const awb = "AWB" + Date.now();

    // create shipment
    const shipment = await Shipment.create({
      senderId: userId,
      parcelId: parcelData._id,
      courierId: courierData._id,
      courierPartner: courierData.provider,
      price: finalPrice,
      eta: courierData.eta_days,
      awb,

      // receiver auto fill
      receiver: {
        name: parcelData.recieverName,
        phone: parcelData.recieverPhone,
        address: parcelData.recieverAddress,
      },

      // sender auto fill
      sender: {
        name: parcelData.senderName,
        phone: parcelData.senderPhoneNumber,
        address: parcelData.senderAddress,
      },

      trackingHistory: [
        {
          status: "BOOKED",
          location: parcelData.senderAddress,
        },
      ],
    });

    // update parcel
    parcelData.status = "BOOKED";
    await parcelData.save();
    bookingConfirmation(parcelData.senderEmail, JSON.stringify(shipment));
    // recieverEmail is not stored on parcel — skip receiver email
    return res.status(201).json({
      response: "shipment created",
      shipment: {
        awb:            shipment.awb,
        courierPartner: shipment.courierPartner,
        price:          shipment.price,
        eta:            shipment.eta,
        status:         "BOOKED",
      },
    });
  } catch (err) {
    return res.status(500).json({
      response: err.message,
    });
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
      .select('awb courierPartner price eta status createdAt');
    return res.status(200).json({ shipments });
  } catch (err) {
    return res.status(500).json({ response: err.message });
  }
};
