import router from 'express'

import { rechargeWallet, getBalance, gethistory, createRechargeOrder, verifyRechargePayment} from '../controller/wallet.controller.js'
import { authCheck } from '../middleware/authCheck.middleware.js'
import { isBlocked } from '../middleware/isBlocked.middleware.js'


const Wallet = router()


Wallet.post('/recharge',authCheck,isBlocked,rechargeWallet)
Wallet.get('/balance',authCheck,isBlocked,getBalance)
Wallet.get('/history',authCheck,isBlocked,gethistory)

// Razorpay Recharge Routes
Wallet.post('/recharge/create-order', authCheck, isBlocked, createRechargeOrder)
Wallet.post('/recharge/verify', authCheck, isBlocked, verifyRechargePayment)

export default Wallet 