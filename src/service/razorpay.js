import Razorpay from 'razorpay'
import credential from '../config/config.js'

const razorpayInstance = new Razorpay({
  key_id: credential.razorpayKeyId,
  key_secret: credential.razorpayKeySecret
})

export default razorpayInstance
