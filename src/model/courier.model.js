import mongoose from "mongoose";


const courierSchema = new mongoose.Schema({

provider:{
type:String,
required:true
},

pickup_supported:[
String
],

delivery_supported:[
String
],

base_price:Number,

per_kg:Number,

eta_days:Number,

active:Boolean

});

// The third argument explicitly sets the collection name so Mongoose doesn't guess.
const courier = mongoose.model(
  "courier",
  courierSchema,
  "courierProviders"   // ← exact MongoDB collection name
);

export default courier;