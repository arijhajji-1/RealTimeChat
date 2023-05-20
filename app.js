const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require ("path");
const app = express();
app.set("views",path.join(__dirname,"views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoconnection = require("./config/mongoconnection.json");
const { add,modify,remove } = require("./controller/chatController");

const server = http.createServer(app);
const io = require ("socket.io")(server);
mongoose.connect(mongoconnection.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection eroor :"));
db.once("open", function () {
  console.log("base de données connectée avec succès!!");
});

const UserRouter = require("./routes/chat");
app.use("/", UserRouter);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
  });
  
  io.on("connection", (socket) => {
    console.log("User connected");
    socket.emit("msg", { sender: "Server", message: "A new user is connected" });
  
    socket.on("typing", (data) => {
      socket.broadcast.emit("typing", data);
    });
  
    socket.on("msg", (data) => {
      console.log("d1", data);
      if (data && data.sender && data.message) {
        add(data);
        io.emit("msg", data);
      }
    });
  
    socket.on("disconnect", () => {
        io.emit("msg", { sender: "Server", message: "A user is disconnected" });
    });
    socket.on("modify", async (data) => {
        try {
            
            const chat = await modify(data);
            io.emit("modified", chat);
        } catch (error) {
            console.log("Error modifying message:", error);
        }
     
        

          
      });
      
      socket.on("delete", async (data) => {
        try {
          const { _id } = data;
          await remove(_id);
          io.emit("deleted", { _id });
        } catch (error) {
          console.log("Error deleting message:", error);
        }
      });
      
      
      
  });
  
  



server.listen(3030, () => console.log("server is run in port 3030 "));