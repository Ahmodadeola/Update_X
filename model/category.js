const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  img: String,
  description: String,
  date: Date,
});

module.exports = mongoose.model("Category", categorySchema);
