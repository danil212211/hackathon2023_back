const express = require("express");
const cfg = require("./config");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const routesInit = require("./routes");

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cookie: true,
});
app.set("io", io);
let routes = routesInit(io);
routes.use("/api/public", express.static(cfg.storage));
app.use(routes);
const port = process.env.PORT || 3001;
httpServer.listen(port);
module.exports = app;
