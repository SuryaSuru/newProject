const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: null,
  },
  paymentMode: {
    type: Number,
    default: null,
  },
  amountPaid: {
    type: String,
    required: true,
  },
  active: {
    type: Number,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  del_status: {
    type: String,
    enum: {
      values: ["Live", "Deleted"],
      message: "Value is not matched",
    },
    default: "Live",
  },
});

const payment = mongoose.model("payment", paymentSchema);

module.exports = payment;
