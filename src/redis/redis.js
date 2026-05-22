import { createClient } from "redis";

import credential from "../config/config.js";


const  client =  createClient({
  url : credential.redisUri
})

const redisConnect = async ()=>{
   try {
     const  status = await client.connect()
     if(!status){
      console.log("redis connected to server  ..")
     }
     console.log("redis connected to server ...")
   }catch(err){
      console.log(err.message)
   }
}

export  {client , redisConnect}