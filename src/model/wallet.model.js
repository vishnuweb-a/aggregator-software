import mongoose from 'mongoose'

const walletSchema = new mongoose.Schema({
   userId : {
     type : mongoose.Schema.Types.ObjectId,
     ref : 'user'
   },
   balance : {
    type : Number,
    default : 0
   },
   currency :  {
    type : String,
    default : 'INR',
    enum : ['INR','DOLLAR'],
   }
},{
  timestamp : {
    type : Date,
    default : Date.now
  
  }
})

const Wallet = mongoose.model('wallet',walletSchema)

export default Wallet

