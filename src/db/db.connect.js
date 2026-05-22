import mongoose from 'mongoose'
import credential from '../config/config.js'

const connectDB =  async()=>{
  try {
    const status = await mongoose.connect(credential.mongourl)
    if(!status){
      console.log("error in connecting the database")
     
    }
     console.log("connected to  database ....")
  }catch(err){
    console.log(err.message)
  }
}

export default connectDB