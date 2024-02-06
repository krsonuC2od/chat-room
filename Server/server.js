const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const PORT = process.env.PORT || 9090;
const errorHandler = require("./middelwares/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const {Server} = require("socket.io");
const {createServer}= require('http')

// config dotenv
dotenv.config();

// connect mongoose

connectDB();

//app object
const app = express();
// instance of io createServer
const server = new createServer(app);
const io = new Server(server,{
  cors :{
    origin:"*",
    methods:["GET","POST"],
    credentials:true,
  }
});

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

//Api Routes
app.use("/api/v1/auth", authRoutes);
app.get('/',(req,res)=>{
 res.send("Welcome");
})

io.on("connection",(socket)=>{
  console.log("user connected",socket.id)
  // console.log("Id" , socket.id)
  // socket.emit("welcome",`welcome to chat room ",${socket.id}`);
  // socket.broadcast.emit("welcome",`${socket.id} join chat room`);
  socket.on("message",({message,room})=>{
    console.log({message,room});
    io.to(room).emit("receive-message",message)
  })

  socket.on('join-room',(room)=>{
    socket.join(room);
    console.log(`User join in  ${room}`)

  })
  socket.on('disconnect',()=>{
    console.log(`User disconnected ${socket.id}`);
  })
 socket.on('message',(msg)=>{
  console.log(msg);
 })

})
//listen app
server.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.Dev_mode} mode on port no : ${PORT}`
      .bgCyan.white
  );
});
