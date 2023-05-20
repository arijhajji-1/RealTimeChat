const chat = require("../models/chat");
const mongoose = require("mongoose");

async function add(data) {
    try {
      const message = data.message; // Extract the 'message' property from the 'data' object
      const Chat = new chat({
        msg: message,
        date: new Date(),
      });
      await Chat.save();
      console.log("Add success");
    } catch (err) {
      console.log({ error: err.toString() });
    }
  }
  async function modify(messageId, message) {
    try {
      const updatedMessage = await chat.findOneAndUpdate(
        { _id: messageId },
        { message: message },
        { new: true }
      );
      if (updatedMessage) {
        console.log("Modify success");
        console.log("Updated Message:", updatedMessage);
      } else {
        console.log("Message not found");
      }
    } catch (err) {
      console.log({ error: err.toString() });
    }
  }
  
  
  async function remove(messageId) {
    try {
      const removedMessage = await chat.findByIdAndRemove(messageId);
      if (removedMessage) {
        console.log("Remove success");
        console.log("Removed Message:", removedMessage);
      } else {
        console.log("Message not found");
      }
    } catch (err) {
      console.log({ error: err.toString() });
    }
  }
  
  

module.exports = { add, modify, remove };
