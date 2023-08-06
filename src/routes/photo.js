const express = require('express')
const router = express.Router();
const PhotoController = require("../controllers/photoController.js");
const { authentication } = require("../middlewares/auth.js");
const upload = require("../../upload");

router.get("/", PhotoController.findPhoto)
router.get("/:id", PhotoController.findPhotoById)
router.post("/", authentication,upload.single("image"), PhotoController.createPhoto)
router.put("/:id", authentication,upload.single("image"), PhotoController.updatePhoto)
router.delete("/:id", authentication, PhotoController.deletePhoto)


module.exports = router;