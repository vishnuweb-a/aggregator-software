import Wallet from "../model/wallet.model.js";
import WalletTransaction from "../model/walletTransition.model.js";
import Freezed from "../model/freezedWallet.model.js";
import Courier from "../model/courier.model.js";
import Parcel from "../model/parcel.model.js";
import Shipment from "../model/shipment.model.js";







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
