class Order {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getById(id) {
    return this.Model.findById(id).populate("product");
  }

  async create(data) {
    if (!this.user) {
      throw new Error("ログインしてください");
    }
    //購入ユーザのカートに同じ商品が入っているかを確認。
    const getSameProductOrder = await this.Model.findOne({
      user: this.user._id,
      ordered: false,
    });
    //findOneは見つからなかった場合null
    if (getSameProductOrder) {
      //個数を一つ追加
      await getSameProductOrder.quantity++;
      await getSameProductOrder.save();
      return getSameProductOrder;
    } else {
      data.user = this.user;
      const createdOrder = await this.Model.create(data);
      const newOrder = await this.Model.findById(createdOrder._id);
      return newOrder;
    }
  }
}

module.exports = Order;
