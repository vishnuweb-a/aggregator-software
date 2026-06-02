import router from 'express'

import { rechargeWallet, getBalance} from '../controller/wallet.controller.js'
import { authCheck } from '../middleware/authCheck.middleware.js'
import { isBlocked } from '../middleware/isBlocked.middleware.js'


const Wallet = router()


Wallet.post('/recharge',authCheck,isBlocked,rechargeWallet)
Wallet.get('/balance',authCheck,isBlocked,getBalance)

export default Wallet 