const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    orderingPrice: { type: Number, min: 0 },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    ordered: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
