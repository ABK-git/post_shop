class Product {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getAll() {
    return this.Model.find({}).populate("user");
  }

  create(data, ctx) {
    data.user = this.user;
    return this.Model.create(data);
  }
}

module.exports = Product;
