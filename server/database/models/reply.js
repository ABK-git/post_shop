const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  content: { type: String, required: true, maxLength: 1000 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reply", replySchema);
