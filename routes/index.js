const express = require("express");
const routeV1 = require("./V1");
const routes = express();
function initRoutes() {
  routes.use("/api", routeV1());
  return routes;
}
module.exports = initRoutes;
