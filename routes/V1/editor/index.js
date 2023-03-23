const { Router } = require("express");
const sharp = require("sharp");
const suffix = require("suffix");
const router = Router();
const upload = require("../../../storages/editor");
router.post(
  "/image",
  upload.single("image"),
  async function (request, response) {
    const resizedImageDestination = suffix(request.file.filename, "rsz");
    const resizedImagePath = suffix(request.file.path, "rsz");
    await sharp(request.file.path)
      .resize({ height: 500 })
      .jpeg({ quality: 90 })
      .toFile(resizedImagePath);
    response.status(200).json({
      success: 1,
      file: {
        url: "/public/editor/" + resizedImageDestination,
        // ... and any additional fields you want to store, such as width, height, color, extension, etc
      },
    });
  }
);
module.exports = {
  router,
};
