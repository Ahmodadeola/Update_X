const Router = require("express").Router();
const addCategoryController = require("../controllers/category")
  .addCategoryController;

const getCategoriesController = require("../controllers/category")
  .getCategoriesController;

Router.post("/addcategory", addCategoryController);
Router.get("/getcategories", getCategoriesController);

module.exports = Router;
