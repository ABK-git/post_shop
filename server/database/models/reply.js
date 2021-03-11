const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const replySchema = new Schema({
  content: { type: String, required: true, maxLength: 1000 },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  question: { type: Schema.Types.ObjectId, ref: "Question" },
  createdAt: { type: Date, default: Date.now },
});

let Reply;
try {
  mongoose.model("Reply");
} catch (e) {
  mongoose.model("Reply", replySchema);
}
module.exports = Reply;
