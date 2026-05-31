import mongoose from "mongoose"

const insuranceSchema = new mongoose.Schema({
  shipmentId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'shipment'
  },
  
    mode : {
      type : String,
      enum : ['AIRWAY','SURFACE'],
      required : true
    
    },
    
    insuranceAmount :{
      type : Number,
      required : true
    },
   
    
    paymentScreenshot : String
  
})

const insurance = mongoose.model('insurance',insuranceSchema)

export default insurance 

