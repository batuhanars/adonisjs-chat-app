import Ws from "App/Services/Ws";

Ws.boot();

/**
 * Listen for incoming socket connections
 */
Ws.io.on("connection", (socket) => {
  socket.on("message", (data) => {
    Ws.io.emit("message", data);
  });
});
