const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "adeola1735",
  api_key: "816961839298775",
  api_secret: "dhFPLutSqYbAPHbIL_K8TahluZ0",
});

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
  destination: (req, file, cb) => {
    console.log("file info => ", file);
    cb(null, "images");
  },
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname),
});

const fileFilter = (req, file, cb) => {
  if (["image/png", "image/jpeg", "image/jpg"].includes(file.mimetype)) {
    cb(null, true);
  } else cb(null, false);
};

app.use(express.static(path.join(__dirname, "update_x/build")));
app.use("/Update_X", express.static(path.join(__dirname, "update_x", "build")));
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
  .connect(process.env.MONGODB_URI || localDB, {
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
  if (req.file) {
    cloudinary.uploader
      .upload(req.file.path)
      .then((result) => {
        let item = new Item({
          ...data,
          img: result.secure_url,
          date: new Date(),
        });
        item
          .save()
          .then((data) => res.json(data))
          .catch((err) => console.log(err));
      })
      .catch((err) => res.json(err));
  } else {
    let item = new Item({ ...data, date: new Date() });
    console.log(item);
    item
      .save()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  }
});

app.post("/api/update", (req, res) => {
  if (req.file) console.log(req.file);

  console.log(req.body.id);
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

app.post("/api/updateimage", (req, res) => {
  let id = req.body.id;
  console.log(req.file, "In here");
  cloudinary.uploader
    .upload(req.file.path)
    .then((result) => {
      console.log(result);
      Item.findById(id)
        .then((item) => {
          item.img = result.secure_url;
          item.save().then((item) => res.json(item));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.json(err));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "update_x/build/index.html"));
});

app.listen(port, () =>
  console.log(`server started at http://localhost:${port}`)
);
