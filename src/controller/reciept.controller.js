import PDFDocument from "pdfkit";
import Shipment from "../model/shipment.model.js";

export const downloadReceipt = async(req,res)=>{

try{

const { shipmentId }=req.params;

const shipment=
await Shipment.findById(
shipmentId
);

if(!shipment){

return res.status(404).json({
response:"shipment not found"
});

}

const doc=
new PDFDocument({
margin:50
});

res.setHeader(
"Content-Type",
"application/pdf"
);

res.setHeader(
"Content-Disposition",
`attachment; filename=shipment-${shipment.awb}.pdf`
);

doc.pipe(res);

/* HEADER */

doc
.fontSize(24)
.text(
"AGGREGATOR SOFTWARE",
{
align:"center"
}
);

doc
.fontSize(12)
.text(
"Shipment Receipt",
{
align:"center"
}
);

doc.moveDown(2);

/* RECEIPT INFO */

doc
.fontSize(14)
.text(
`Receipt ID : REC-${shipment._id}`
);

doc.text(
`AWB : ${shipment.awb}`
);

doc.text(
`Booking Date : ${
new Date(
shipment.createdAt
).toLocaleString()
}`
);

doc.text(
`Courier : ${shipment.courierPartner}`
);

doc.text(
`ETA : ${shipment.eta} Days`
);

doc.moveDown();

/* PAYMENT */

doc
.fontSize(16)
.text(
"PAYMENT DETAILS"
);

doc.moveDown(0.5);

doc
.fontSize(12)
.text(
`Amount Paid : ₹${shipment.price}`
);

doc.text(
`Payment Status : ${shipment.paymentStatus}`
);

doc.moveDown();

/* SENDER */

doc
.fontSize(16)
.text(
"SENDER DETAILS"
);

doc.moveDown(0.5);

doc
.fontSize(12)
.text(
`Name : ${shipment.sender.name}`
);

doc.text(
`Phone : ${shipment.sender.phone}`
);

doc.text(
`Address : ${shipment.sender.address}`
);

doc.moveDown();

/* RECEIVER */

doc
.fontSize(16)
.text(
"RECEIVER DETAILS"
);

doc.moveDown(0.5);

doc
.fontSize(12)
.text(
`Name : ${shipment.receiver.name}`
);

doc.text(
`Phone : ${shipment.receiver.phone}`
);

doc.text(
`Address : ${shipment.receiver.address}`
);

doc.moveDown();

/* TRACKING */

doc
.fontSize(16)
.text(
"TRACKING"
);

doc.moveDown(0.5);

shipment.trackingHistory.forEach(
(item)=>{

doc.text(
`${item.status}
 - 
${item.location}`
);

}
);

doc.moveDown(2);

/* FOOTER */

doc
.fontSize(10)
.text(
"Generated automatically by Aggregator Software",
{
align:"center"
}
);

doc.text(
"Thank you for shipping with us",
{
align:"center"
}
);

doc.end();

}
catch(err){

return res.status(500).json({
response:err.message
});

}

};