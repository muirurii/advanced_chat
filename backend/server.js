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
const verifyToken = require("./middleware/verifyJWT");
const io = new Server(httpServer, { cors: { origin: "*" }, });

app.use("/api/users", require("./routes/userRoutes"))

app.use(verifyToken);

app.use("/api/messages", require("./routes/messageRoutes"))

let allRoomUsers = [];

io.on("connection", (socket) => {

    socket.on("add_user", (data, cb) => {
        socket.join(data.username);
        allRoomUsers = allRoomUsers.filter(user => user.username !== data.username);
        allRoomUsers.push(data);
        // console.log(allRoomUsers)s;
        // io.sockets.in(socket.rooms).emit("active_users", allRoomUsers)
        io.emit("active_users", allRoomUsers);
    });

    socket.on("send_text", async(data) => {
        // console.log(data)
        // console.log(socket.rooms)
        // console.log(data);
        const { from, to, body } = data;
        const sendMessage = require("./controllers/messageControllers").sendMessage;
        const savedM = await sendMessage({
            from,
            to,
            body,
        });
        // console.log(savedM, "sav")
        // console.log(io.)
        io.in(from).in(to).emit("new_text", savedM)
            // socket.to(from).to(to).emit("new_text", savedM);
            // socket.join("room");
    });

    socket.on("disconnect", (id) => {
        allRoomUsers = allRoomUsers.filter(user => user.id !== socket.id)
        io.emit("active_users", allRoomUsers)
            // console.log("disconnect", allRoomUsers, socket.id)
    })
});


app.get('*', (req, res) => res.send("ttt"))

httpServer.listen(PORT, (req, res) => console.log(`server started at port ${PORT}`));