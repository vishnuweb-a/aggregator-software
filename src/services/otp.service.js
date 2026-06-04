const otpStore = new Map();

const strOpt = async (otp, email) => {
   try {
       // Store OTP with an expiry of 300 seconds (5 minutes)
       const expiryTime = Date.now() + 300 * 1000;
       otpStore.set(email, { otp: String(otp), expiry: expiryTime });
       
       return { otp };
   } catch(err) {
       console.log(err.message);
   }
}

const optValidate = async (email, otp) => {
    const record = otpStore.get(email);
    
    if (!record || record.expiry < Date.now()) {
        if (record) otpStore.delete(email);
        return "otp not found expires ";
    }
    
    if (record.otp !== String(otp)) {
        return "invalid otp";
    }
    
    // OTP is valid; clean it up
    otpStore.delete(email);
    return true;
}

export { strOpt, optValidate }