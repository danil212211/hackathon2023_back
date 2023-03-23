/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const fs = require("fs");
const path = require("path");
const glob = require("glob");

const Sequelize = require("sequelize");

const config = require("../config");

const db = {};
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
let models = path.join(__dirname, "models") + "\\**.js";
models = models.replace(/\\/g, "/");
let basename = path.basename(module.filename);
let modelFiles = glob.sync(models, {});
modelFiles.forEach(function (file) {
  let model = require(file)(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
});
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;
sequelize
  .authenticate()
  .then(() => {
    db.connection = "db.connect";
  })
  .catch((err) => {
    db.connection = err.toString();
  });
sequelize.sync();
//sequelize.sync({force:true})
module.exports = db;
