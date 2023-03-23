const db = require("./db");
const mailer = require("./mailer");
const storage = require("./storage");
const translator = require("./translator");
module.exports = {
  serverBaseUrl: "/api/v1/",
  ...db,
  ...mailer,
  ...storage,
  ...translator,
};
