const Router = require("express").Router();
const addCategoryController = require("../controllers/category")
  .addCategoryController;

const getCategoriesController = require("../controllers/category")
  .getCategoriesController;

Router.post("/addcategories", addCategoryController);
Router.get("/getCategories", getCategoriesController);

module.exports = Router;
