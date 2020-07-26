const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");

const imagePath = path.join(__dirname, "images");
const imageNames = [];
fs.readdir(imagePath, (err, files) => {
  files.forEach((file) => imageNames.push(file));
  console.log(imageNames);
});

const getFullImageName = (name) =>
  imageNames.find((image) => image.substr(14) === name);

let Item;
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "images"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
    cb(null, true);
  } else cb(null, false);
};

app.use("/images", express.static("images"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));

mongoose
  .connect("mongodb://localhost:27017/itemStore", {
    useNewUrlParser: true,
  })
  .then((connection) => {
    let itemSchema = mongoose.Schema({
      img: String,
      name: String,
      brand: String,
      description: String,
      serialNo: Number,
      costPrice: Number,
      sellPrice: Number,
      quantity: Number,
      category: String,
      date: Date,
    });

    Item = mongoose.model("Item", itemSchema);
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Its all fine");
});

app.get("/images/:imgId", (req, res) => {
  console.log(req.params.imgId);
  if (req.params.imgId === "image.jpg")
    res.sendFile(path.join(__dirname, "images/image.jpg"));
  let actualPath = path.join(
    __dirname,
    "images/" + getFullImageName(req.params.imgId)
  );

  res.sendFile(actualPath);
});

app.post("/api/additem", (req, res) => {
  let data = JSON.parse(req.body.details);
  let item = new Item({ ...data, date: new Date() });
  console.log(item);
  item
    .save()
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.post("/api/update", (req, res) => {
  Item.findById(req.body.id)
    .then((item) => {
      Object.keys(req.body.props).forEach((key) => {
        item[key] = req.body.props[key];
      });
      item.save().then((item) => {
        console.log(item);
        res.json(item);
      });
    })
    .catch((err) => console.log(err));
});

app.get("/api/getitems", (req, res) => {
  Item.find().then((data) => res.json({ dataCount: data.length, data: data }));
});

app.listen(8080, () => console.log("server started at http://localhost:8080"));
