const { Router } = require("express");
const router = Router();
const upload = require("../../../storages/documents");
router.post("/", upload.single("document"), async function (request, response) {
  response.status(200).json({
    success: 1,
    file: {
      url: "/public/documents/" + request.file.filename,
      name: request.file.filename,
    },
  });
});
module.exports = { router };
