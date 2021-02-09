const mongoose = require("mongoose");
const config = require("../config/dev");

//Userを使用することを宣言
require("./models/User");

exports.connect = () => {
  mongoose.connect(
    config.DB_URI,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    () => {
      console.log("connected to DB");
    }
  );
};
