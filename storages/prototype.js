const multer = require("multer");
const config = require("../config");
const path = require("path");
function getStorageInFolder(folder) {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${config.storage}/${folder}/`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });
  return upload;
}
module.exports = { getStorageInFolder };
