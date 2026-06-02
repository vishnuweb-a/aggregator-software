import {getShipments,updateShipmentStatus} from '../controller/getTracking.controller.js'
import {authCheck} from '../middleware/authCheck.middleware.js'
import {isBlocked} from '../middleware/isBlocked.middleware.js'
import router from 'express'

const  TrackingOrder = router()

TrackingOrder.get('/tracking/:awb',authCheck,isBlocked,getShipments)
TrackingOrder.post('/updateTracking/:awb',authCheck,isBlocked,updateShipmentStatus)
export default TrackingOrder