const express = require('express');
const router = express.Router();
const CategoriesController = require('../controllers/categoryController.js');


router.get("/", CategoriesController.findCategories)
router.get("/:id", CategoriesController.findCategoriesById)
router.post("/", CategoriesController.createCategories)
router.put("/:id", CategoriesController.updateCategories) 
router.delete("/:id", CategoriesController.deleteCategories)

module.exports = router;