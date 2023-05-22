const mongo = require('mongoose');
const schema = mongo.Schema; 

var User = new schema({
    name: String,
    email: String,
    cin: Number,
    image: String,
}); 
module.exports = mongo.model("user", User)
