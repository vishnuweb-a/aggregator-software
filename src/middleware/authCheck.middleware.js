import  User from  '../model/user.model.js'
import jwt from 'jsonwebtoken'
import credential from '../config/config.js'
import bcrypt from 'bcrypt'

const authCheck = async (req,res,next)=>{
  try{
     const token = req.cookies.token
     if(!token){
        return res.status(401).json({
          "response" : "token not found , session expired ."
        })
     }
     const assets = jwt.verify(token,credential.jwtSecret)
     const verify =  await User.findOne({_id : assets.userId})
     if(!verify){
      return res.status(401).json({
        "response" : "user not found ."
      })
     }
     console.log(assets)
     req.user = assets.userId
     console.log(req.user)
      next()
  }catch(err){
    return res.status(500).json({
      "response" : err.message
    })
  }
}

export {authCheck}