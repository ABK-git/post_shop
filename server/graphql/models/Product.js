class Product {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  create(data) {
    data.user = this.user;
    return this.Model.create(data);
  }
}

module.exports = Product;