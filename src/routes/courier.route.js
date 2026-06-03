import router from 'express'
import {createParcel,courierOption,confirmCourier,getUserShipments,verifyPayment} from '../controller/parcel.controller.js'
import {payWallet} from '../controller/wallet.controller.js'
import {createShipmentOrder, verifyShipmentPayment} from '../controller/payment.controller.js'
import {authCheck} from '../middleware/authCheck.middleware.js'
import {isBlocked} from '../middleware/isBlocked.middleware.js'
import { downloadReceipt } from '../controller/reciept.controller.js'
import { smartRecommend } from '../controller/recommend.controller.js'

const parcelRouter = router()


parcelRouter.post('/parcel',authCheck,isBlocked,createParcel)
parcelRouter.post('/recommend/:parcelId',authCheck,isBlocked,smartRecommend)
parcelRouter.post('/courier/:parcelId',authCheck,isBlocked,courierOption)
parcelRouter.post('/parcel/confirmOrder',authCheck,isBlocked,confirmCourier)
parcelRouter.get('/shipments',authCheck,isBlocked,getUserShipments)
parcelRouter.post('/payment/verify',verifyPayment)
parcelRouter.post('/payment/wallet',authCheck,isBlocked,payWallet)
parcelRouter.post('/payment/recipt/:shipmentId',authCheck,isBlocked,downloadReceipt)
parcelRouter.get('/parcel//getAllParcel',authCheck,isBlocked,)

// Razorpay Shipment Payment Routes
parcelRouter.post('/payment/razorpay/create', authCheck, isBlocked, createShipmentOrder)
parcelRouter.post('/payment/razorpay/verify', authCheck, isBlocked, verifyShipmentPayment)

export default parcelRouter