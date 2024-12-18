"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = (0, next_1.default)({ dev, hostname, port });
const handler = app.getRequestHandler();
app.prepare().then(() => {
    const httpServer = (0, node_http_1.createServer)(handler);
    const io = new socket_io_1.Server(httpServer);
    io.on("connection", (socket) => {
        socket.on("welcome", (data) => {
            console.log(data);
        });
        socket.on("send-message", (data) => {
            io.to(data.room).emit("send-message", data);
        });
    });
    httpServer
        .once("error", (err) => {
        console.log(err);
        process.exit(1);
    })
        .listen(port, () => {
        console.log(`Socket is running on http://${hostname}:${port}`);
    });
});
