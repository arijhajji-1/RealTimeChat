const mongo = require('mongoose');
const schema = mongo.Schema; 

var Plat = new schema({
    plat_name: String,
    nbre_ingredient:Number,
    price:Number,
   description:String,
    plat_image: String,
}); 
module.exports = mongo.model("plat", Plat)
