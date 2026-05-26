import mongoose from 'mongoose'

const freezedSchema = new mongoose.Schema({
  userId : {
    type :  mongoose.Schema.Types.ObjectId,
    ref : 'user'
  
  },
  amount : {
    type : Number,
    required : true
  },
  parcelId : {
    type  :  mongoose.Schema.Types.ObjectId,
    ref : 'parcel'
  
  },
  courierId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'courier'
  },
  status : {
    type : String,
    enum : ["FREEZED","completed","USED"],
    default : "pending"
  }
})

const freezed = mongoose.model('freezed',freezedSchema)

export default freezed