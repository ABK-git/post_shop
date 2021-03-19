class Order {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getById(id) {
    return this.Model.findById(id)
      .populate({ path: "product", populate: { path: "user" } })
      .populate("user");
  }

  getAllByUserCart() {
    return this.Model.find({ user: this.user._id, ordered: false })
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
  }

  async plusQuantity(id) {
    const order = await this.Model.findById(id)
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
    order.quantity++;
    await order.save();
    return order;
  }

  async create(data) {
    if (!this.user) {
      throw new Error("ログインしてください");
    }
    //購入ユーザのカートに同じ商品が入っているかを確認。
    const getSameProductOrder = await this.Model.findOne({
      user: this.user._id,
      ordered: false,
      product: data.product,
    })
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });

    //findOneは見つからなかった場合null
    if (getSameProductOrder) {
      //個数を一つ追加
      await getSameProductOrder.quantity++;
      await getSameProductOrder.save();
      return getSameProductOrder;
    } else {
      data.user = this.user;
      return this.Model.create(data);
    }
  }
}

module.exports = Order;
