const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const itemsRoutes = require("./Routes/items");
const imagesRoutes = require("./Routes/images");
const categoryRoutes = require("./Routes/category");

const port = process.env.PORT || 8080;

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
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

app.use("/api", itemsRoutes);
app.use("/api", categoryRoutes);
app.use(imagesRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "update_x/build/index.html"));
});

let localDB = "mongodb://localhost:27017/itemStore";

mongoose
  .connect(process.env.MONGODB_URI || localDB, {
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`server started at http://localhost:${port}`)
    );
  });
