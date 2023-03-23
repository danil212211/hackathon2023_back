const express = require("express");
const glob = require("glob");
const path = require("path");
const { dataParserMiddleware } = require("../../middleware/dataParser");
const { dontCrash } = require("../../middleware/noCrash");
const socketCookie = require("../../middleware/socketCookie");

function initRoutes(io) {
  io.on("new_namespace", (namespace) => {
    namespace.use(socketCookie);
  });
  const routing = express();
  routing.use(dataParserMiddleware);
  routing.use(dontCrash);
  let routesDir = __dirname.replace(/\\/g, "/") + "/";
  let routeFiles = glob.sync(routesDir + "**/**.js", { cwd: routesDir });
  routeFiles = routeFiles.map(function (route) {
    return path.relative(__dirname, route).replace(/\\/g, "/");
  });
  routeFiles.forEach((file) => {
    if (file === "index.js") return;
    const handler = require("./" + file);
    file = file.replace(/.js/, "");
    file = file.replace(/\/index/g, ""); // if file is index, then it's root query
    file = file.replace(/\[[a-zA-Z]*\]/g, (match) => {
      // All [text] replace with :text, making params in query
      match = match.slice(1, match.length - 1);
      match = ":" + match;

      return match;
    });
    file = "/" + file;
    if (handler.router) {
      routing.use(file, handler.router);
    }
    if (handler.initSockets) {
      handler.initSockets(io);
    }
  });
  return routing;
}

module.exports = initRoutes;
