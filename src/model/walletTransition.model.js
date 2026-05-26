import mongoose from "mongoose";

const walletTransactionSchema =
new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"user"
},

type:{
type:String,
enum:[
"CREDIT",
"DEBIT"
]
},

amount:Number,

source:{
type:String,
enum:[
"RECHARGE",
"COURIER",
"REFUND"
]
},

shipmentId:{
type:mongoose.Schema.Types.ObjectId,
ref:"shipment"
},

description:String

},{
timestamps:true
});

export default mongoose.model(
"walletTransaction",
walletTransactionSchema
);