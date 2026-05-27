import dotenv from 'dotenv'

dotenv.config()

const credential = {
  mongourl : process.env.MONGO_URL,
  port : process.env.PORT || 3000,
  emailAccount : process.env.MAIL_PASS,
  emailApi : process.env.MAIL_API,
  redisUri :  process.env.REDIS_URI,
  jwtSecret :  process.env.JWT_SECRET,
  clientUrl : process.env.CLIENT_URL
}

export default credential