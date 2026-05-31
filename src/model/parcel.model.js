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
  no_of_parcel : {
    type :Number,
    required : true
  },
  length : {
    type : Number ,
    required : true
  },
  width : {
    type : Number,
    required : true
  },
  height : {
    type : Number,
    required : true
  },
   declaredValue : {
    type : Number,
    required : true
   },
   riskType: {
  type: String,
  enum: [
    "COURIER_RISK",
    "OWNER_RISK",
    "NO_RISK"
  ],
  required: true
},
riskCharge: {
  type: Number,
  default: 0
},
volumePrice : {
   type :  Number ,
   default : 0 
},
  courierType : {
    type : String,
    enum : ["docx","nonDocx"],
    default : "docx"
  },
 
  status : {
    type : String,
    enum : ['CREATED' ,'BOOKED']
  },
  mode :{
    type : String,
    enum : ['AIRWAY','SURFACE']
  },
  description : {
    type :String,
    maxLength : 200,
    default : ""
  }
},{
  timestamps : true

})

const Parcel = mongoose.model('parcel',parcelSchema)

export default Parcel