import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";


const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });

const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);
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
