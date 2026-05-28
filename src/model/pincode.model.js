import mongoose from "mongoose";

const pincodeSchema =
new mongoose.Schema(

{

pincode:{

type:String,

required:true,

unique:true,

trim:true,

index:true

},

city:{

type:String,

required:true,

trim:true,

index:true

},

state:{

type:String,

required:true,

trim:true,

index:true

},

serviceable:{

type:Boolean,

default:true

},

zone:{

type:String,

enum:[

"NORTH",

"SOUTH",

"EAST",

"WEST",

"CENTRAL",

"NORTHEAST"

],

default:"EAST"

},

deliveryType:{

type:String,

enum:[

"METRO",

"URBAN",

"SEMI_URBAN",

"RURAL"

],

default:"URBAN"

},

codAvailable:{

type:Boolean,

default:true

},

estimatedDeliveryDays:{

type:Number,

default:3

}

},

{

timestamps:true

}

);

const PincodeDB =
mongoose.model(

"pincodedb",

pincodeSchema,

"pincodedbs"

);

export default PincodeDB;