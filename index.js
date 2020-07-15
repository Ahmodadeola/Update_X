const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let Item;

mongoose
  .connect("mongodb://localhost:27017/itemStore", {
    useNewUrlParser: true,
  })
  .then((connection) => {
    // let bookSchema = mongoose.Schema({
    //   title: String,
    //   author: String,
    //   ISO: Number,
    //   date: Date,
    // });

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

    // let Book = mongoose.model("Book", bookSchema);
    Item = mongoose.model("Item", itemSchema);
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Its all fine");
});

app.post("/api/additem", (req, res) => {
  let item = new Item({ ...req.body, date: new Date() });
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
