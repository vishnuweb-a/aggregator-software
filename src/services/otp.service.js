import {client}  from '../redis/redis.js'


const strOpt = async (otp,email)=>{
   try {
       const status = client.set(`email:${email}`,otp,{EX:300})
       

       return  {otp}
   }catch(err){
    console.log(err.message)
   }
}

const optValidate = async  (email,otp)=>{
const returnotp = await  client.get(
    `otp${email}`,
    (err,data)=>{
      if(err){
        console.log(err.message)
      }
 } )
    if(!returnotp){
      return "otp not found expires "
    }
    if(returnotp !== otp){
      return  "invalid otp"
    
    }
    return true ;
 
}


export {strOpt,optValidate}