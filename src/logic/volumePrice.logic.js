


const volumePrice_cal =  (length,width,height,mode)=>{
    const volume = length * width * height 
    if(mode == 'AIRWAY'){
       const volume_price = volume / 5000
       return volume_price
    }else{
      const volume_price = volume / 4750
      return volume_price 
    }
     
}

export {volumePrice_cal}