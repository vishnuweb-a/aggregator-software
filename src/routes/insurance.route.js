import  router from 'express'

import { getInsurance ,validateInsuranceAmount } from '../controller/insurance.controller.js'
import {authCheck} from '../middleware/authCheck.middleware.js'


const insuranceRoute = router()


insuranceRoute.post('/insurance',authCheck,getInsurance)
insuranceRoute.post('/insurance/validate',authCheck,validateInsuranceAmount)

export default insuranceRoute