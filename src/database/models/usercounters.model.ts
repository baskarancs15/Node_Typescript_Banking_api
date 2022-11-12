const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: {
    type: String,
  },
  seq: {
    type: Number,
  }
});

export const UserCounters = mongoose.model("userCounters", counterSchema);