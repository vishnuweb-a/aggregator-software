import User from '../model/user.model.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
import crypto from 'crypto'
import { strOpt,optValidate } from '../services/otp.service.js'
import { sendOtp,welcomeMessage } from '../services/mail.service.js'
import credential from '../config/config.js'
import { uploadToCloudinary } from '../utils/cloudinary.js'

const isProduction = process.env.NODE_ENV === 'production'
const cookieOptions = {
  httpOnly: true,
  sameSite: isProduction ? 'none' : 'lax',
  secure: isProduction,
  maxAge: 60 * 60 * 1000,
}



/**
 *  - post : /register 
 *  -  registration is performed and otp is sent 
 */

const registerUser = async (req , res)=>{
  try {
        const {name , email , password , phoneNumber}  = req.body

        if(!name || !email || !password || !phoneNumber){
          return res.status(400).json({message : "all fields are required"})
        }

        if(!validator.isEmail(email)){
          return res.status(400).json({message : "invalid email"})
        }
        const isUserExist = await User.findOne({email})
        if (isUserExist){
      return     res.status(400).json({message : "user already exist"})

        }
        const hashedPassword = await bcrypt.hash(password,10)
        const  user = await User.create({
          name,
          email,
          password : hashedPassword,
          phoneNumber,
          status: 'verified'
        })
        if(!user){
        return    res.status(400).json({message : "user not created"})
        }
        
        const token = jwt.sign({userId :user._id,password : user.password},credential.jwtSecret,{expiresIn : '1h'})
        res.cookie('token', token, cookieOptions)
        
        // Send welcome email in background (don't block registration)
        welcomeMessage(email,user.name).catch(err => console.log('Welcome email failed:', err.message))
        
        return res.status(201).json({
          "message"  :  "user created successfully.",
          user: { name: user.name, email: user.email, phoneNumber: user.phoneNumber, status: user.status, profilePicture: user.profilePicture }
        })
  }catch(err){
    console.log(err.message)
    return res.status(500).json({ message: err.message })
  }
}


/**  
 *   - post : /validate  
 *  -  user is verified and welcome email is sent ..
 */

const validateAndMarkStatus = async (req,res)=>{
    try {

      const  {email,otp}  = req.body
      const validate = await optValidate(email,otp)
      if(!validate){
        return res.status(400).json({
          message :  "invalid otp ....."
        })
      }

      const user = await User.findOne({email})
      if(!user){
        return res.status(400).json({
          message : "user not fetched from database ."
        })

      }
      if(user.status === 'verified'){
        return res.status(400).json({
          "response"  :  " user is verified ."
        })
      }

      const insert = await User.updateOne(
   { email: email },
   { $set: { status  : "verified" } }
);
      if(!insert){
        return res.status(400).json({
          "response" : "user not updated .."
        })
      }
     
     

      const token = jwt.sign({userId :user._id,password : user.password},credential.jwtSecret,{expiresIn : '1h'})
      res.cookie('token', token, cookieOptions)
      await welcomeMessage(email,insert.name)
      return res.status(200).json({
        "response" : "user varified successfully ....",
        
      
      })
    }catch(err){
      console.log(err.message)
      return res.status(500).json({ message: err.message })
    }
}



/**  
 *   -  post :  /login  
 *  - helps to  login  user ..
 */

const loginUser = async (req,res)=>{

  try{
   const {email , password} = req.body
   if(!email || !password){
       return res.status(400).json({message  :  "all feilds must be present ..."})
   }

   // Trim input and prepare an $or query
   const input = String(email).trim()
   const isEmail = validator.isEmail(input)
   const query = { $or: [] }

   if (isEmail) {
     query.$or.push({ email: input })
   } else {
     query.$or.push({ email: input }) // Fallback just in case
     
     const numericInput = Number(input)
     if (!isNaN(numericInput)) {
       query.$or.push({ phoneNumber: numericInput })
     }
     
     // Also try to strip non-digits (e.g., if user types +91 98765 43210)
     const phoneStr = input.replace(/\D/g, '')
     if (phoneStr && phoneStr !== input) {
       query.$or.push({ phoneNumber: Number(phoneStr) })
     }
   }

   const user = await User.findOne(query)
   if(!user){
    return res.status(404).json({message  :  "user is not found ...  "})
   }
   const verify = await bcrypt.compare(password,user.password)
   if(!verify){
     return res.status(400).json({
      message : " you have given wrong password ."
     })
   }
   const token = jwt.sign({userId : user._id},credential.jwtSecret,{expiresIn : '1h'})

   res.cookie('token', token, cookieOptions)
   return res.status(200).json({
       "response"  : "user login successfully ...",
       user: { name: user.name, email: user.email, phoneNumber: user.phoneNumber, status: user.status, profilePicture: user.profilePicture }
   })
  }catch(err){
    return res.status(500).json({
      "response" : err.message
    })
  }
}

/**  
 *   - delete : /logout 
 *  - logout  the user 
 */

const logoutUser = async (req, res)=>{
   try{
    res.clearCookie('token', cookieOptions)
    return res.status(200).json({
      "response" : "user logout successfully "
   })
}catch(err){
      return res.status(500).json({
        "response" : err.message
      })
   }
  }

    /**  
     *  - post : /forgetpassword
     *   - send otp at email 
     */
  const forgotPassword = async (req,res)=>{

    try {
     const {email} = req.body
     if(!email){
      return res.status(404).json({
        "response" : "email need to be their ."
      })
     }
     const user = await User.findOne({email})
     if(!user){
      return res.status(404).json({
        "response" : "user not found need to register .."
      })
     }

     const  otp =  crypto.randomInt(1000,9999)

     await strOpt(otp,email)

     await sendOtp(email,otp)

     res.status(200).json({
      "response" : "otp sent successfully .."
     })

    }catch(err){
      return res.status(500).json({
        "response" : err.message
      })
    }
    
    }


   /**  
    *  - post : / verifyotp 
    *   - verify sent otp given by  user 
    */
    const verifyOtpForForgotPassword = async (req,res)=>{
       try {

        const {otp, email} =  req.body
        const validate = await optValidate(email,otp)
         if(!validate){
           return res.status(400).json({
            "response"  : "invalid otp ..."
           })
         }

         res.status(200).json({
          "response" : " otp verified successfully  .."
         })



       }catch(err){
        return res.status(500).json({
          "response" : err.message
        })
       }
    }
   
     /**  
      *  -  post : /changePassword
      *  -  change the pasword and saved  in the database . 
      */

    const changePassword =  async (req,res)=>{
       try {
            const {email,password} = req.body
            const user = await User.findOne({email})
            if(!user){
              return res.status(404).json({
                "response" : "user not found ."
              })
            }
            const hashedPassword = await bcrypt.hash(password,10)
            const update = await User.updateOne(
                                      { email: email },
              { $set: { password : hashedPassword } }
            );
            if(!update){
              return res.status(404).json({
                "response" : "password not updated ."
              })
            }
     res.status(200).json({
      "response" : "password updated successfully ."
     })
    
       }catch(err){
        return res.status(500).json({
          "response" : err.message
        })
       }
    }


const getMe = async (req, res) => {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ response: 'Not authenticated' })
    const decoded = jwt.verify(token, credential.jwtSecret)
    const user = await User.findById(decoded.userId).select('-password')
    if (!user) return res.status(404).json({ response: 'User not found' })
    if (user.isBlocked) return res.status(403).json({ response: user.reasonOfBlock })
    return res.status(200).json({ user: { name: user.name, email: user.email, phoneNumber: user.phoneNumber, status: user.status, profilePicture: user.profilePicture } })
  } catch (err) {
    return res.status(401).json({ response: 'Invalid token' })
  }
}

const updateProfile = async (req, res) => {
  try {
    const token = req.cookies?.token
    if (!token) return res.status(401).json({ response: 'Not authenticated' })
    
    const decoded = jwt.verify(token, credential.jwtSecret)
    const user = await User.findById(decoded.userId)
    if (!user) return res.status(404).json({ response: 'User not found' })

    const { name, password } = req.body
    
    if (name) {
      user.name = name
    }

    if (password && password.trim() !== '') {
      user.password = await bcrypt.hash(password, 10)
    }

    if (req.file) {
      try {
        const result = await uploadToCloudinary(req.file.buffer)
        user.profilePicture = result.secure_url
      } catch (uploadErr) {
        return res.status(500).json({ response: 'Image upload failed' })
      }
    }

    await user.save()

    return res.status(200).json({
      response: 'Profile updated successfully',
      user: { name: user.name, email: user.email, phoneNumber: user.phoneNumber, status: user.status, profilePicture: user.profilePicture }
    })

  } catch (err) {
    return res.status(500).json({ response: err.message })
  }
}

export  { registerUser,validateAndMarkStatus, loginUser ,logoutUser ,forgotPassword ,verifyOtpForForgotPassword ,changePassword, getMe, updateProfile }
