import mongoose from 'mongoose'


const parcelSchema = new mongoose.Schema({
  senderId : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'user'
   
   
  },
  senderName : {
    type : String,
    required : true,
    index : true
  },
  senderEmail : {
    type :String,
    required : true,
   
    index : true
  },
  senderPhoneNumber : {
    type : Number,
    required : true,
   
  },
senderAddress:{

fullAddress:String,

landmark:String,

city:String,

state:String,

pincode:String

},

receiverAddress:{

fullAddress:String,

landmark:String,

city:String,

state:String,

pincode:String

} ,
  receiverName : {
    type : String,
    required : true
  },
  receiverPhone : {
    type : String,
    required : true
  },

  DelevarableType : {
    type : String,
    required : true
  },
  weight : {
    type : Number,
    required : true
  },
  status : {
    type : String,
    enum : ['CREATED' ,'BOOKED']
  }
},{
  timestamps : true

})

const Parcel = mongoose.model('parcel',parcelSchema)

export default Parcel