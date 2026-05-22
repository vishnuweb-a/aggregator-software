import app from './src/app.js'
import credential  from './src/config/config.js'


app.listen(credential.port,()=>{
  console.log(`server is running at port ${credential.port}`)
})