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

const {
parcelId,
courierId
}=req.body;

/* parcel validation */

const parcel=
await Parcel.findOne({

_id:parcelId,

senderId:userId

});

if(!parcel){

return res.status(404)
.json({

response:
"parcel not found"

});

}

/* courier validation */

const courier=
await Courier.findById(
courierId
);

if(!courier){

return res.status(404)
.json({

response:
"courier not found"

});

}

/* price calculation */

const amount=

courier.base_price+

(
parcel.weight*
courier.per_kg
);

/* wallet */

const wallet=
await Wallet.findOne({

userId

});

if(!wallet){

return res.status(404)
.json({

response:
"wallet not found"

});

}

if(
wallet.balance < amount
){

return res.status(402)
.json({

response:
"insufficient balance",

balance:
wallet.balance,

required:
amount

});

}

/* freeze */

let freeze=
await Freezed.findOne({

userId,
parcelId

});

if(!freeze){

freeze=
await Freezed.create({

userId,

amount,

parcelId,

courierId,

status:
"FREEZED"

});

}

/* debit */

wallet.balance -= amount;

await wallet.save();

/* create shipment */

const awb=
"AWB"+
Date.now();

const shipment=
await Shipment.create({

senderId:userId,

parcelId,

courierId,

courierPartner:
courier.provider,

price:
amount,

eta:
courier.eta_days,

awb,

paymentStatus:
"PAID",

shipmentStatus:
"BOOKED",

receiver:{

name:
parcel.recieverName,

phone:
parcel.recieverPhone,

address:
parcel.recieverAddress

},

sender:{

name:
parcel.senderName,

phone:
parcel.senderPhoneNumber,

address:
parcel.senderAddress

},

trackingHistory:[

{

status:
"BOOKED",

location:
`${parcel.senderAddress.city}, ${parcel.senderAddress.pincode}`

}

]

});

/* update parcel */

parcel.status=
"BOOKED";

await parcel.save();

/* transaction */

await WalletTransaction.create({

userId,

type:
"DEBIT",

amount,

source:
"COURIER",

shipmentId:
shipment._id,

description:
"wallet shipment booking"

});

/* release freeze */

freeze.status=
"USED";

await freeze.save();

return res.status(200)
.json({

response:
"payment successful",

shipmentId:
shipment._id,

awb:
shipment.awb,

receiptUrl:

`/api/receipt/${shipment._id}`,

walletBalance:
wallet.balance

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
