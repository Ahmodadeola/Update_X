const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const { resolve } = require("path");

const imagePath = path.join(__dirname, "images");

const getFullImageName = (name) => {
  return new Promise((resolve, reject) => {
    let imageNames = [],
      img;
    fs.readdir(imagePath, (err, files) => {
      if (err) reject("dir reading failed");
      files.forEach((file) => imageNames.push(file));
      img = imageNames.find((image) => image.substr(14) === name);
      resolve(img);
    });
  });
};

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

app.use(express.static(path.join(__dirname, "build")));
app.use("/images", express.static("images"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: fileStorage, fileFilter }).single("image"));
let onlineDB =
  "mongodb+srv://ahmodadeola:salauAde123@realmcluster.viqjz.mongodb.net/itemStore?retryWrites=true&w=majority";
let localDB = "mongodb://localhost:27017/itemStore";
const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI || onlineDB, {
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
      category: String,
      quantityConfig: {
        subCarton: Number,
        unit: Number,
      },
      initQuantity: {
        carton: Number,
        subCarton: Number,
        unit: Number,
      },
      date: Date,
    });

    Item = mongoose.model("Item", itemSchema);
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/images/:imgId", (req, res) => {
  getFullImageName(req.params.imgId).then(
    (name) => {
      if (req.params.imgId === "image.jpg")
        res.sendFile(path.join(__dirname, "images/image.jpg"));
      let actualPath = path.join(__dirname, "images/" + name);

      res.sendFile(actualPath);
    },
    (err) => console.log("Something went wrong")
  );
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

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}`)
);
