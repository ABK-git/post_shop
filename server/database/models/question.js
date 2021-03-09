const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  title: { type: String, required: true, maxLength: 255 },
  content: { type: String, required: true, maxLength: 1000 },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Question", questionSchema);
