const express = require("express");
const cfg = require("./config");
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const routesInit = require("./routes");

const httpServer = http.createServer(app);
let routes = routesInit();
routes.use("/api/public", express.static(cfg.storage));
app.use(routes);
const port = process.env.PORT || 3001;
httpServer.listen(port);
module.exports = app;
