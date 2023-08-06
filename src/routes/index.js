const express = require("express");
const router = express.Router();
const photoRouter = require("./photo.js");
const userRouter = require("./user.js");
const categoriesRouter = require("./categories.js");

router.use("/photos", photoRouter);
router.use("/users", userRouter);
router.use("/categories", categoriesRouter);

module.exports = router;