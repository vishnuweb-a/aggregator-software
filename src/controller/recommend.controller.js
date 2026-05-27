import Parcel from "../model/parcel.model.js";
import Courier from "../model/courier.model.js";

export const smartRecommend =
async(req,res)=>{

try{

const {parcelId}=req.params;

const parcel =
await Parcel.findById(
parcelId
);
const courier = await Courier.find({});

console.log(courier.length);
console.log(courier[0]);



if(!parcel){

return res.status(404)
.json({

response:
"parcel not found"

});

}
console.log("parcel info is :",parcel)

const couriers =
await Courier.find({

active:true,

pickup_supported:{
$in:[
parcel.senderAddress
]
},

$or:[

{
delivery_supported:{
$in:[
parcel.recieverAddress
]
}
},

{
delivery_supported:{
$in:[
"All India"
]
}
}

]

});
console.log("couriers are :",couriers, "and length is :",couriers.length)

if(!couriers.length){

return res.status(404)
.json({

response:
"no courier found"

});

}

const result=
couriers.map(c=>{

const price=

c.base_price+

(
parcel.weight*
c.per_kg
);

const priceScore=

100-
Math.min(
price,
100
);

const etaScore = 100 - ((c.eta_days || 0) * 10);
const safetyScore = 100 - ((c.damage_rate || 0) * 5);

const finalScore = (priceScore * 0.30) + 
                   (etaScore * 0.25) + 
                   ((c.success_rate || 0) * 0.20) + 
                   ((c.on_time_rate || 0) * 0.15) + 
                   (safetyScore * 0.05) + 
                   ((c.coverage_score || 0) * 0.05) + 
                   (c.priority || 0);

return {
  ...c.toObject(),
  price,
  score: Math.round(finalScore) || 0
};

});

const cheapest=
[...result]
.sort(
(a,b)=>

a.price-
b.price

)[0];

const fastest=
[...result]
.sort(
(a,b)=>

a.eta_days-
b.eta_days

)[0];

const recommended=
[...result]
.sort(
(a,b)=>

b.score-
a.score

)[0];

return res.status(200)
.json({

parcelId,

cheapest,

fastest,

recommended,

all:

result.sort(
(a,b)=>

b.score-
a.score

)

});

}

catch(err){

return res.status(500)
.json({

response:
err.message

});

}

};