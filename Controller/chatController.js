const chat = require("../models/chat");
const mongoose = require("mongoose");

async function add(data) {
    try {
      const message = data.message; // Extract the 'message' property from the 'data' object
      const newMessageId = new mongoose.Types.ObjectId();
      const Chat = new chat({
        msg: message,
        date: new Date(),
        messageId: newMessageId
      });
      await Chat.save();
      console.log("Add success");
    } catch (err) {
      console.log({ error: err.toString() });
    }
  }
  //modify
  async function modify(data) {
    try {
      console.log("Inside modify function");
  
      const messageId = data.messageId;
      const message = data.message;
  
      console.log("Message ID:", messageId);
      console.log("New message:", message);
  
      const updatedChat = await chat.findByIdAndUpdate(
        messageId,
        { msg: message },
        { new: true }
      );
  
      console.log("Updated chat:", updatedChat);
  
      return updatedChat;
    } catch (err) {
      console.log({ error: err.toString() });
    }
  }
  
  
  
  async function deleteMessage(id) {
    console.log("Deleting message...");
   
        await Message.deleteOne({_id: id});
        return id;
      
}

  
  
  

module.exports = { add, modify,deleteMessage };
