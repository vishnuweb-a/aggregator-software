import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema({

senderId:{
type:mongoose.Schema.Types.ObjectId,
ref:"user"
},

parcelId:{
type:mongoose.Schema.Types.ObjectId,
ref:"parcel"
},

courierId:{
type:mongoose.Schema.Types.ObjectId,
ref:"courier"
},

courierPartner:String,

price:Number,

eta:Number,

awb:String,

paymentStatus:{
type:String,
enum:[
"PENDING",
"PAID",
"FAILED"
],
default:"PENDING"
},

shipmentStatus:{
type:String,
enum:[
"PAYMENT_PENDING",
"BOOKED",
"IN_TRANSIT",
"DELIVERED"
],
default:"PAYMENT_PENDING"
},

utr:String,

paymentScreenshot:String,

upiUrl:String,

receiver:{
name:String,
phone:String,
address:{
fullAddress:String,
landmark:String,
city:String,
state:String,
pincode:String
}
},

sender:{
name:String,
phone:String,
address:{
fullAddress:String,
landmark:String,
city:String,
state:String,
pincode:String
}
},

trackingHistory:[
{
status:String,
location:String,
time:{
type:Date,
default:Date.now
}
}
]

},{timestamps:true});

export default mongoose.model(
"shipment",
shipmentSchema
);