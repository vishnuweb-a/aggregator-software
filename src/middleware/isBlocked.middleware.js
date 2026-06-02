import User from '../model/user.model.js'


const isBlocked =async (req,res,next)=>{
  try{
    const user = await User.findById(req.user)
    if(!user){
      return res.status(401).json({
        "response" : "user not found ."
      })
    }
    if(user.isBlocked){
      return res.status(403).json({
        "response" : user.reasonOfBlock
      })
    }
    next()
  }catch(err){
    return res.status(500).json({
      "response" : err.message
    })
  }
}

export { isBlocked }