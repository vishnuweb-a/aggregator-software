import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './db/db.connect.js';

import authRouter from './routes/user.auth.js';
import {swaggerUi,specs} from "./config/swagger.js";
import parcelRouter from './routes/courier.route.js';
import Wallet from './routes/wallet.route.js'
import pincodeRouter from './routes/pincode.route.js'
import credential from './config/config.js'

import TrackingOrder from './routes/shipmentTracking.routes.js'








const app = express()

connectDB()


const clientUrls = (credential.clientUrl || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map((url) => url.trim())
  .filter(Boolean)

app.use(cors({
  origin: clientUrls,
  credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use("/api-docs",swaggerUi.serve,   swaggerUi.setup(specs));

app.use('/api/auth',authRouter)
app.use('/api/user',parcelRouter)
app.use('/api/wallet',Wallet)
app.use('/api/pincode',pincodeRouter)

app.use('/api/order',TrackingOrder)



export default app
