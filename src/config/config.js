import dotenv from 'dotenv'

dotenv.config()

const credential = {
  mongourl : process.env.MONGO_URL,
  port : process.env.PORT || 3000,
  emailAccount : process.env.MAIL_PASS,
  emailApi : process.env.MAIL_API,
  redisUri :  process.env.REDIS_URI,
  jwtSecret :  process.env.JWT_SECRET,
  clientUrl : process.env.CLIENT_URL,
  razorpayKeyId : process.env.ROZA_API_KEY,
  razorpayKeySecret : process.env.ROZAPAY_SECRET_KEY,
  cloudnaryApiKey : process.env.CLOUDNARY_API_KEY,
  cloudnaryApiSecret : process.env.CLOUDNARY_API_SECRET,
  cloudnaryName : process.env.CLOUDNARY_NAME
}

export default credential