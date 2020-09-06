const Router = require("express").Router();
const addItemController = require("../controllers/items").addItemController;
const getItemsController = require("../controllers/items").getItemsController;
const updateItemController = require("../controllers/items")
  .updateItemController;
const getItemsHistoryController = require("../controllers/items")
  .getItemsHistoryController;

Router.get("/getitemshistory", getItemsHistoryController);
Router.get("/getitems", getItemsController);

Router.post("/additem", addItemController);
Router.post("/update", updateItemController);

module.exports = Router;
