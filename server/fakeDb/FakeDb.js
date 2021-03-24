const { users, products, questions, reviews } = require("./data");

const User = require("../database/models/user");
const Product = require("../database/models/product");
const Question = require("../database/models/question");
const Review = require("../database/models/review");
const Order = require("../database/models/order");
const Reply = require("../database/models/reply");

class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Question.deleteMany({});
    await Review.deleteMany({});
    await Order.deleteMany({});
    await Reply.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Product.create(products);
    await Question.create(questions);
    await Review.create(reviews);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();
