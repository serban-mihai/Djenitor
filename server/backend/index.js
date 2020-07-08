const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const cors = require("cors");
const app = express();
app.use(cors({origin: "https://live.djenitor.com"}));

const server = http.createServer(app);
const io = socketIo(server);


io.on("connection", (socket) => {
    console.log(`> Client Connected: ${socket.id}`);

    socket.on("relay", (line) => {
        socket.emit("notes", JSON.parse(line));
    });

    socket.on("disconnect", () => {
        console.log(`> Client Disconnected: ${socket.id}`);
    });
});

app.route("/")
    .get((req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send({"Status": "Up And Running"})
        console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode}`);
    });

server.listen(port, () => console.log(`Server Started on port ${port}`));