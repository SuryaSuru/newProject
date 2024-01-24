const express = require('express');
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supportSchema = Schema({
  createdAt: { type: Date, default: Date.now },
  user_id: { type: String, ref: "User", required: true },
  description: { type: String, required: [true, "Please enter a description for the item"], trim: true }
});

module.exports = mongoose.model("Support", supportSchema);
