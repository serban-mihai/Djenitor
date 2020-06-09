const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const router = require("./router")
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const TEENSY_PORT = "/dev/ttyACM0";
const BAUDRATE = 2000000;

const SerialPort = require("serialport");
const serial = new SerialPort(TEENSY_PORT, { baudRate: BAUDRATE });

const Readline = require('@serialport/parser-readline');
const parser = new Readline();
serial.pipe(parser);

let users = []

io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    parser.on("data", (line) => {
        socket.emit("notes", JSON.parse(line));
    });

    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});


app.use(router);
server.listen(port, () => console.log(`Server Started on port ${port}`));