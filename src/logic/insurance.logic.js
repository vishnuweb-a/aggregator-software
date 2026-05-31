

const insuranceAmount_cal  = (declaredValue,riskType)=>{
  let insuranceAmount = 0
  if(riskType ==  'OWNER_RISK' ){
       insuranceAmount = declaredValue * 0.2/100 
      if(insuranceAmount <= 3000){
            return insuranceAmount
      }else{
         return 3000
      }
  }else  if (riskType == 'COURIER_RISK'){
            insuranceAmount = declaredValue * 2/100
            if(insuranceAmount >3000 && insuranceAmount <=10000){
              return insuranceAmount
            }else{
              return 10000
            }
  }else{
       insuranceAmount = 0
       return insuranceAmount  
  }
}

export {insuranceAmount_cal}
