const mongoose = require("mongoose");

const TransactionSchema = mongoose.Schema({
  item: String,
  type: String,
  quantity: {
    carton: Number,
    subCarton: Number,
    unit: Number,
  },
  time: Date,
});

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;
