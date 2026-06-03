import Wallet from "../model/wallet.model.js";
import WalletTransaction from "../model/walletTransition.model.js";
import Freezed from "../model/freezedWallet.model.js";
import Courier from "../model/courier.model.js";
import Parcel from "../model/parcel.model.js";
import Shipment from "../model/shipment.model.js";
import razorpayInstance from "../service/razorpay.js";
import credential from "../config/config.js";
import crypto from "crypto";




//  recharge wallet 

/**  
 *  -  post : /api/wallet/recharge
 *  - recharge the wallet 
 */

export const rechargeWallet =
async(req,res)=>{

const userId=req.user;

const { amount }=req.body;

let wallet=
await Wallet.findOne({
userId
});

if(!wallet){

wallet=
await Wallet.create({
userId,
balance:0
});

}

wallet.balance += amount;

await wallet.save();

await WalletTransaction.create({

userId,

type:"CREDIT",

amount,

source:"RECHARGE",

description:"wallet recharge"

});

return res.json({

balance:
wallet.balance

});

};


/**  
 * - get :  /api/wallet/balance
 *  - provide the balance in user wallet 
 */

export  const getBalance = async (req,res)=>{
    try {
      const userId  = req.user
      const wallet = await Wallet.findOne({userId})
      if(!wallet){
        return res.status(404).json({
          "response" : "wallet not found ."
        })
      }
      const balance = wallet.balance
      return res.status(200).json({
         "balance in wallet is"  : balance
      })
    }catch(err){
        return res.status(500).json({
            "response" :  err.message
        })
    }
}



/**   
 *  - get : /api//wallet/getHistory 
 *  - get all the history of  transaction 
 */

  export const gethistory = async (req,res)=>{
      const userId = req.user
      try {
        const history = await  WalletTransaction.find({userId})
        if(!history){
            return res.status(404).json({
            "response" : "history not found ."
          })

        }
        return res.status(200).json({
            "history" : history
        })
      }catch(err){
          return res.status(500).json({
            "response" :  err.message
          })
      }
  }



 /**  
  * - post /api/wallet/walletpayment
  *  - pay by wallet 
  */


 export const payWallet = async(req,res)=>{

try{

const userId=req.user;

const { shipmentId } = req.body;

if (!shipmentId) {
  return res.status(400).json({ response: "shipmentId is required" });
}

/* find shipment */
const shipment = await Shipment.findOne({ _id: shipmentId, senderId: userId });
if (!shipment) {
  return res.status(404).json({ response: "shipment not found" });
}

if (shipment.paymentStatus === "PAID") {
  return res.status(400).json({ response: "Shipment is already paid" });
}

const amount = shipment.price;

/* wallet */
const wallet = await Wallet.findOne({ userId });
if (!wallet) {
  return res.status(404).json({ response: "wallet not found" });
}

if (wallet.balance < amount) {
  return res.status(402).json({
    response: "insufficient balance",
    balance: wallet.balance,
    required: amount
  });
}

/* debit */
wallet.balance -= amount;
await wallet.save();

/* update shipment */
shipment.paymentStatus = "PAID";
shipment.shipmentStatus = "BOOKED";
shipment.awb = "AWB" + Date.now();
shipment.trackingHistory.push({
  status: "BOOKED",
  location: shipment.sender?.address?.city ? `${shipment.sender.address.city}, ${shipment.sender.address.pincode}` : "Pickup Location",
  time: new Date()
});
await shipment.save();

/* update parcel */
await Parcel.findByIdAndUpdate(shipment.parcelId, { status: "BOOKED" });

/* transaction */
await WalletTransaction.create({
  userId,
  type: "DEBIT",
  amount,
  source: "COURIER",
  shipmentId: shipment._id,
  description: "wallet shipment booking"
});

return res.status(200).json({
  response: "payment successful",
  shipmentId: shipment._id,
  awb: shipment.awb,
  receiptUrl: `/api/receipt/${shipment._id}`,
  walletBalance: wallet.balance
});

}
catch(err){

return res.status(500)
.json({

response:
err.message

});

}

};


/**
 * ─── Razorpay Wallet Recharge ─────────────────────
 * POST /api/wallet/recharge/create-order
 * Creates a Razorpay order for wallet recharge
 */
export const createRechargeOrder = async (req, res) => {
  try {
    const userId = req.user;
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ response: "Valid amount is required" });
    }

    const amountInPaise = Math.round(Number(amount) * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcg_${String(userId).slice(-6)}_${Date.now()}`,
      notes: {
        type: "WALLET_RECHARGE",
        userId: String(userId)
      }
    };

    const order = await razorpayInstance.orders.create(options);

    return res.status(201).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: credential.razorpayKeyId
    });
  } catch (err) {
    console.log("Razorpay create order error:", err);
    return res.status(500).json({ response: err.message });
  }
};


/**
 * POST /api/wallet/recharge/verify
 * Verifies Razorpay payment signature and credits wallet
 */
export const verifyRechargePayment = async (req, res) => {
  try {
    const userId = req.user;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ response: "Missing payment verification fields" });
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

    // Credit wallet
    const creditAmount = Number(amount);
    if (!creditAmount || creditAmount <= 0) {
      return res.status(400).json({ response: "Invalid recharge amount" });
    }

    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 0 });
    }

    wallet.balance += creditAmount;
    await wallet.save();

    // Create transaction record
    await WalletTransaction.create({
      userId,
      type: "CREDIT",
      amount: creditAmount,
      source: "RECHARGE",
      description: `Razorpay recharge — ${razorpay_payment_id}`
    });

    return res.status(200).json({
      response: "Wallet recharged successfully",
      balance: wallet.balance,
      paymentId: razorpay_payment_id
    });
  } catch (err) {
    console.log("Razorpay verify error:", err);
    return res.status(500).json({ response: err.message });
  }
};
