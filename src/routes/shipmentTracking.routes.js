import {getShipments,updateShipmentStatus} from '../controller/getTracking.controller.js'
import {authCheck} from '../middleware/authCheck.middleware.js'
import router from 'express'

const  TrackingOrder = router()

TrackingOrder.get('/tracking/:awb',authCheck,getShipments)
TrackingOrder.post('/updateTracking/:awb',authCheck,updateShipmentStatus)
export default TrackingOrder