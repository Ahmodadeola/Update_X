const Router = require("express").Router();
const addItemController = require("../controllers/items").addItemController;
const getItemsController = require("../controllers/items").getItemsController;
const updateItemController = require("../controllers/items")
  .updateItemController;

Router.post("/additem", addItemController);

Router.get("/getitems", getItemsController);

Router.post("/update", updateItemController);

module.exports = Router;
