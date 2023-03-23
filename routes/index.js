const express = require("express");
const routeV1 = require("./V1");
const routes = express();
function initRoutes(io) {
  routes.use("/api", routeV1(io));
  return routes;
}
module.exports = initRoutes;
