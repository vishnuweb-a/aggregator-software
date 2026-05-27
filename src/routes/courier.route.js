import router from 'express'
import {parcel,courierOption,confirmCourier,getUserShipments,verifyPayment} from '../controller/parcel.controller.js'
import {payWallet} from '../controller/wallet.controller.js'
import {authCheck} from '../middleware/authCheck.middleware.js'
import { downloadReceipt } from '../controller/reciept.controller.js'
import { smartRecommend } from '../controller/recommend.controller.js'

const parcelRouter = router()


parcelRouter.post('/parcel',authCheck,parcel)
parcelRouter.post('/recommend/:parcelId',authCheck,smartRecommend)
parcelRouter.post('/courier/:parcelId',authCheck,courierOption)
parcelRouter.post('/parcel/confirmOrder',authCheck,confirmCourier)
parcelRouter.get('/shipments',authCheck,getUserShipments)
parcelRouter.post('/payment/verify',verifyPayment)
parcelRouter.post('/payment/wallet',authCheck,payWallet)
parcelRouter.post('/payment/recipt/:shipmentId',authCheck,downloadReceipt)

export default parcelRouter