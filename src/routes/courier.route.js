import router from 'express'
import {parcel,courierOption,confirmCourier,getUserShipments} from '../controller/parcel.controller.js'
import {authCheck} from '../middleware/authCheck.middleware.js'

const parcelRouter = router()


parcelRouter.post('/parcel',authCheck,parcel)
parcelRouter.post('/courier/:parcelId',authCheck,courierOption)
parcelRouter.post('/parcel/confirmOrder',authCheck,confirmCourier)
parcelRouter.get('/shipments',authCheck,getUserShipments)

export default parcelRouter