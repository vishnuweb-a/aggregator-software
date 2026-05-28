import router from 'express'
import { lookupByPincode, searchByCity } from '../controller/pincode.controller.js'

const pincodeRouter = router()

// Lookup city/state by pincode
pincodeRouter.get('/lookup/:pincode', lookupByPincode)

// Search pincodes by city name
pincodeRouter.get('/search', searchByCity)

export default pincodeRouter
