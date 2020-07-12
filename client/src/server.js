const express = require("express");
const http = require("http");
const bodyParser = require('body-parser');
const socketIo = require("socket.io");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const SerialPort = require("serialport");
const Readline = require('@serialport/parser-readline');

const ENDPOINT = "https://api.djenitor.com";

const ioClient = require("socket.io-client");
const client = ioClient(ENDPOINT, {reconnection: false});

const teensy = {
    port: "",
    baudrate: 2000000,
    serial: null,
    parser: null
}

io.on("connection", (socket) => {
    console.log(`> App Connected: ${socket.id}`);

    if(teensy.serial !== null) {
        teensy.parser.on("data", (line) => {
            socket.emit("notes", JSON.parse(line));
            client.emit("relay", line);
        });
    } else {
        console.log(">>> Instrument not found!");
    }

    socket.on("disconnect", () => {
        console.log(`> App Disconnected: ${socket.id}`);
    });
});

app.use(bodyParser.json());

app.route("/")
    .get((req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send({"Status": "Up And Running"})
        console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode}`);
    });

app.route("/sensor")
    .get((req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            res.send({"port": teensy.port, "baudrate": teensy.baudrate, "serial": teensy.serial === null ? "disconnected" : "connected"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode}`);
        } catch(ex) {
            res.send({"Status": "Error"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode} ${JSON.stringify(ex)}`);
        }
    })

app.route("/sensor/port")
    .get(async (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        await SerialPort.list()
        .then((ports) => {
            res.send(ports);
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode}`);
        })
        .catch((ex) => {
            res.send({"Status": "Error"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode} ${JSON.stringify(ex)}`);
        });
    })
    .post((req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        teensy.port = req.body.port;
        try {
            if(teensy.serial === null) {
                teensy.serial = new SerialPort(teensy.port, { baudRate: teensy.baudrate });
                teensy.parser = new Readline();
                teensy.serial.pipe(teensy.parser);
            }
            res.send({"port": teensy.port, "baudrate": teensy.baudrate, "serial": teensy.serial === null ? "disconnected" : "connected"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode}`);
        } catch (ex) {
            res.send({"Status": "Error"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode} ${JSON.stringify(ex)}`);
        }
    })
    .delete(async (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Access-Control-Allow-Origin", "*");
        try {
            await teensy.serial.close();
            teensy.serial = null;
            res.send({"port": teensy.port, "baudrate": teensy.baudrate, "serial": teensy.serial === null ? "disconnected" : "connected"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode}`);
        } catch(ex) {
            res.send({"Status": "Error", "Message": "Port already closed"});
            console.log(`>>> ${req.method} "${req.path}" Status: ${res.statusCode} ${JSON.stringify(ex)}`);
        }
    });

server.listen(port, () => console.log(`Server Started on port ${port}`));