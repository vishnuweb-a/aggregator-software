import mongoose from "mongoose"

const insuranceSchema = new mongoose.Schema({
  shipmentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'shipment'
  },
    amount :{
      type : Number,
      required : true
    },
    mode : {
      type : String,
      enum : ['AIRWAY','SURFACE'],
      required : true
    
    },
    deligacy :{
      type : String,
      enum : ['Normal','Fragile','Electronics']
    },
    insuranceAmount :{
      type : Number,
      required : true
    },
    insuranceStatus :{
      type : String,
      enum : ['PENDING','PAID','FAILED'],
      default : 'PENDING'
    },
    utrNumber : {
      type :String,
     
    },
    paymentScreenshot : String
  
})

const insurance = mongoose.model('insurance',insuranceSchema)

export default insurance 

