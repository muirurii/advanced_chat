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
    "http://localhost:5000",
    "https://advancedchat.onrender.com",
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

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

let allRoomUsers = [];

io.on("connection", (socket) => {

    socket.on("add_user", (data, cb) => {
        socket.join(data.username);
        allRoomUsers = allRoomUsers.filter(user => user.username !== data.username);
        allRoomUsers.push(data);
        const users = allRoomUsers.map(user => user.username);
        io.to(users).emit("active_users", allRoomUsers);
    });

    socket.on("message_delivered", ({ friendsNames, username }) => {
        const friends = allRoomUsers.filter(user => user.username !== username)
            .filter(user => friendsNames.some(friend => friend === user.username)).map(user => user.username)
        io.to(friends).emit("message_delivered", username);
    });

    socket.on("message_seen", ({ friendName, username }) => {
        console.log("seen by", username)
        io.to(friendName).emit("message_seen", username);
    });

    socket.on("send_text", async(data) => {
        const { from, to, body } = data;
        const sendMessage = require("./controllers/messageControllers").sendMessage;
        const savedM = await sendMessage({
            from,
            to,
            body,
        });
        io.in(from).in(to).emit("new_text", savedM)
    });

    socket.on("disconnect", (id) => {
        allRoomUsers = allRoomUsers.filter(user => user.id !== socket.id);
        io.emit("active_users", allRoomUsers)
    });
});

app.use(express.static(path.join(__dirname, '..', 'frontendd', 'build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../", "frontendd", "build", "index.html"));
})

httpServer.listen(PORT, (req, res) => console.log(`server started at port ${PORT}`));