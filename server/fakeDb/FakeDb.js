const { users, products, questions } = require("./data");

const User = require("../database/models/user");
const Product = require("../database/models/product");
const Question = require("../database/models/question");

class FakeDb {
  async clean() {
    await User.deleteMany({});
    await Product.deleteMany({});
    await Question.deleteMany({});
  }

  async addData() {
    await User.create(users);
    await Product.create(products);
    await Question.create(questions);
  }

  async populate() {
    await this.clean();
    await this.addData();
  }
}

module.exports = new FakeDb();
