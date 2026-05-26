import express from 'express';
import  cookieParser from 'cookie-parser'
import connectDB from './db/db.connect.js';
import { redisConnect } from './redis/redis.js';
import authRouter from './routes/user.auth.js';
import {swaggerUi,specs} from "./config/swagger.js";
import parcelRouter from './routes/courier.route.js';
import Wallet from './routes/wallet.route.js'




const app = express()

connectDB()
redisConnect()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use("/api-docs",swaggerUi.serve,   swaggerUi.setup(specs));

app.use('/api/auth',authRouter)
app.use('/api/user',parcelRouter)
app.use('/api/wallet',Wallet)


export default app

