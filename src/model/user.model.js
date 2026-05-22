import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name :  {
    type :String,
    required : true,
    index : true
  },
  email : {
    type : String,
    required :true,
    unique :  true
  },
  password : {
    type : String,
    required :  true,
      minlength : 6
  },
  phoneNumber : {
    type  : Number,
    required : true,
    unique : true,
  },
  status : {
    type : String,
    enum : ["unverified","verified"],
    default : "unverified"
  }
},{
  timestamps :  true
})


const User = mongoose.model('user',userSchema)

export  default  User 
