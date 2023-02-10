const express = require("express");
const { createServer } = require("http");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), });
const PORT = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");
const connection = require("./config/db");
connection();

const app = express();
const httpServer = createServer(app);

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const allowedOrigins = [
    "http://localhost:3000",
    "http://127.0.0.2:5500",
    undefined
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || origin === undefined) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by cors"));
        }
    },
    optionSuccessStatus: 200,
    credentials: true,
};

app.use(cors(corsOptions));

const { Server } = require("socket.io");
const io = new Server(httpServer, { cors: { origin: "*" }, });

app.use("/api/users", require("./routes/userRoutes"))

let allRoomUsers = [];
let re = 0;

io.on("connection", (socket) => {
    // console.log(socket.handshake.auth)
    re++
    // roomUsers.push({

    // })

    // socket.join("all");
    // socket.broadcast("updated_users", allRoomUsers.push({ user: {} }))

    console.log("join")
    socket.on("add_user", (data) => {
        // allRoomUsers.push(data);
        // io.emit("active_users", allRoomUsers);
        // console.log(re, allRoomUsers);
        console.log("add")
    });

    socket.on("hello", (cb) => {
        // cb(socket.id)
        // console.log("Hello");
        socket.join("room")
    });

    socket.on("disconnect", (id) => {
        console.log("diss")
        allRoomUsers = allRoomUsers.filter(user => user.id !== socket.id)
            // io.emit("active_users", allRoomUsers)
            // console.log("disconnect", allRoomUsers)
    })
});


app.get('*', (req, res) => res.send("ttt"))

httpServer.listen(PORT, (req, res) => console.log(`server started at port ${PORT}`));