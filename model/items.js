const mongoose = require("mongoose");

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

module.exports = mongoose.model("Item", itemSchema);
