const mongo = require("mongoose");
const Schema = mongo.Schema;
const Message = new Schema({
  pseudo: String,
  content:String,
  likes : int,
});

module.exports = mongo.model("message",Message);