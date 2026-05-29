import Shipment from "../model/shipment.model.js";

const getShipments = async (req,res)=>{
  const awb = req.params.awb;

  const shipment = await Shipment.find({awb})
  if(!awb){
    return  res.status(404).json({
      "response" : " shipment not found "
     })
  }
    
      const track =  shipment[0].trackingHistory
  res.status(200).json({
       "tracking " :  track
  })

}


const updateShipmentStatus = async (req,res)=>{
  const awb = req.params.awb;
  const {status , location}  = req.body;
  try {
  const shipment = await Shipment.find({awb})
  if(!awb){
    return res.status(404).json({
      "response" : " shipment not found ."
    })
  }

  shipment[0].
shipmentStatus =
status;

shipment[0].trackingHistory.push({

status,

title:
status.replaceAll(
"_",
" "
),

description:
`Shipment status changed to ${status}`,

location,

timestamp:
new Date()

});

await shipment[0].save();

return res.status(200).json({
    "response" : "status updated ",
    "status" : shipment[0].trackingHistory
})

}catch(err){
  return res.status(500).json({
    "response" : err.message
  })
}

}

export {getShipments,updateShipmentStatus}