const Router = require("express").Router();
const images = require("../controllers/images");

Router.post("/updateimage", images.imageUpdateController);

Router.get("/images/:imgId", images.getImageController);

module.exports = Router;
