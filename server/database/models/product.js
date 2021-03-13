const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true, maxLength: 30 },
  category: { type: String, required: true, maxLength: 30 },
  price: { type: Number, required: true, min: 1 },
  quantity: { type: Number, required: true, min: 1 },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  introduce: { type: String, required: true, minLength: 10, maxLength: 1000 },
  imagePasses: [{ type: String }],
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
