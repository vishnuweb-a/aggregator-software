import router from 'express'

import { rechargeWallet, getBalance} from '../controller/wallet.controller.js'
import { authCheck } from '../middleware/authCheck.middleware.js'


const Wallet = router()


Wallet.post('/recharge',authCheck,rechargeWallet)
Wallet.get('/balance',authCheck,getBalance)

export default Wallet 