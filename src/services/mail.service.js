import nodemailer from 'nodemailer'
import credential from '../config/config.js'


const transporter = nodemailer.createTransport({
  service : 'gmail',
  auth : {
    user : credential.emailAccount,
    pass : credential.emailApi
  },
  tls:{
rejectUnauthorized:false
}
})


const  sendOtp = async (email, otp)=>{
  try {
    const status =  await transporter.sendMail({
        from : credential.emailAccount,
        to : email,
        subject : " otp sent  for  tthe varification .",
        text :  `your  otp  for  the varification of service is  ${otp}`
    })

  }catch(err){
     console.log(err.message)
  }
}

const welcomeMessage = async (email,name)=>{
    try {
      const  status = await transporter.sendMail({
        from : credential.emailAccount,
        to : email,
        subject : " welcome message  from Apna courier  ",
        text :  `Apna courier  welcome  ${name} , may your experience with us is smooth .`
      })
      return status
    }catch(err){
      console.log(err.message)
    }
}


const bookingConfirmation = async (email, details)=>{
  try {
     await transporter.sendMail({
       from : credential.emailAccount,
       to : email,
       subject : " booking confirmation from Apna courier  ",
       text :  `Apna courier  booking confirmation ${details}`
     })
  }catch(err){
    console.log(err.message)
  }
}

export  {sendOtp,welcomeMessage,bookingConfirmation}