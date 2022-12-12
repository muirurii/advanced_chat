const express = require("express");
const { createServer } = require("http");
const path = require("path");
const cors = require("cors");
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), });
const PORT = process.env.PORT || 5000;
const connection = require("./config/db");
connection();

const app = express();
const httpServer = createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const { Server } = require("socket.io");
const io = new Server(httpServer, {});

io.on("connection", (socket) => {
    console.log("connected")
});

app.use("/api/users", require("./routes/userRoutes"))

app.get('*', (req, res) => res.send("ttt"))

httpServer.listen(PORT, (req, res) => console.log(`server started at port ${PORT}`));