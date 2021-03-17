class Order {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getById(id) {
    return this.Model.findById(id).populate("product");
  }

  create(data) {
    if (!this.user) {
      throw new Error("ログインしてください");
    }
    data.user = this.user;
    return this.Model.create(data);
  }
}

module.exports = Order;
