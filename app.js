const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var path = require("path");
const app = express();
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const mongoconnection = require("./config/mongoconnection.json");
const { add, modify, remove } = require("./controller/chatController");

const server = http.createServer(app);

// emit is used to send events, 
//socket.on is used to listen for events, 
//io represents the socket.io server,
// socket represents an individual client's socket connection, 
//and broadcast is used to emit events to all connected clients except the sender.
const io = require("socket.io")(server);
mongoose.connect(mongoconnection.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully!");
});

const UserRouter = require("./routes/user");
const PlatRouter = require ("./routes/plat");
app.use("/plat", PlatRouter);

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use("/user", UserRouter);


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.emit("msg", { sender: "Server", message: "A new user is connected" });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("msg", (data) => {
    console.log("Received message:", data);
    if (data && data.sender && data.message) {
      add(data);
      io.emit("msg", data);
    }
    
  });
 
  socket.on("notification", (data) => {
    io.emit("notification", data);
  });
  

  socket.on("disconnect", () => {
    io.emit("msg", { sender: "Server", message: "A user is disconnected" });
  });
});

server.listen(3030, () => console.log("Server is running on port 3030"));
