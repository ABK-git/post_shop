const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  avatar: String,
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
  },
  name: {
    type: String,
    minLength: [4, "Minimum length is 6 characters!"],
  },
  username: {
    type: String,
    required: true,
    minLength: [4, "Minimum length is 6 characters!"],
  },
  password: {
    type: String,
    minLength: [4, "Minimum length is 6 characters!"],
    maxLength: [32, "Maximum password: length is 32 characters"],
    required: true,
  },
  role: {
    enum: ["guest", "admin"],
    type: String,
    required: true,
    default: "guest",
  },
  info: String,
  createdAt: { type: Date, default: Date.now },
});

//登録前にpasswordのHash化
userSchema.pre("save", function (next) {
  const user = this;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", userSchema);