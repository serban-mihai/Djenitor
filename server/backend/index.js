const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log(`> App Started: ${socket.id}`);

    socket.on("disconnect", () => {
        console.log(`> App Closed: ${socket.id}`);
    });
});

app.route("/")
    .get((req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send({"Status": "Up And Running"})
    });

server.listen(port, () => console.log(`Server Started on port ${port}`));