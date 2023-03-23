const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const session = require("express-session");
const cors = require("cors");
let xss = require("xss-clean");
const cfg = require("./config");
const compress = require("compression");
const app = express();

app.use(
  session({
    secret: "Today is a great day, innit?",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(compress());

app.use(xss());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cookieParser());
app.use(cors());
module.exports = app;
