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

const requestCancellation = async (req, res) => {
  const awb = req.params.awb;
  try {
    const shipmentList = await Shipment.find({ awb });
    if (!shipmentList || shipmentList.length === 0) {
      return res.status(404).json({ response: "Shipment not found." });
    }
    const shipment = shipmentList[0];

    // Check if cancellation is allowed
    const allowedStatuses = ["PAYMENT_PENDING", "BOOKED"];
    if (!allowedStatuses.includes(shipment.shipmentStatus)) {
      return res.status(400).json({ response: "Shipment cannot be cancelled at this stage." });
    }

    shipment.shipmentStatus = "CANCELLATION_REQUESTED";
    shipment.trackingHistory.push({
      status: "CANCELLATION_REQUESTED",
      title: "Cancellation Requested",
      description: "User has requested cancellation of this shipment.",
      location: "System",
      timestamp: new Date()
    });

    await shipment.save();

    return res.status(200).json({
      response: "Cancellation requested successfully.",
      status: shipment.trackingHistory
    });

  } catch (err) {
    return res.status(500).json({
      response: err.message
    });
  }
}

export {getShipments, updateShipmentStatus, requestCancellation}