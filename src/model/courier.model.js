import mongoose from 'mongoose'



const courierSchema = new mongoose.Schema({

provider:{
type:String,
required:true
},

pickup_pincodes:[
String
],

delivery_pincodes:[
String
],

base_price:Number,

per_kg:Number,

eta_days:Number,

active:Boolean,

success_rate:{
type:Number,
default:95
},

on_time_rate:{
type:Number,
default:90
},

damage_rate:{
type:Number,
default:2
},

coverage_score:{
type:Number,
default:80
},

priority:{
type:Number,
default:1
}

});

const Courier = mongoose.model('courier',courierSchema,"courierProviders")
export default Courier 