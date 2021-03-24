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
    try {
      return this.Model.find({ user: this.user._id, ordered: false })
        .populate("user")
        .populate({ path: "product", populate: { path: "user" } });
    } catch (e) {}
  }

  getAllByUserOrderHistory() {
    return this.Model.find({ user: this.user._id, ordered: true })
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
  }

  async getAllOrdered(ctx) {
    const user = await ctx.models.User.getAuthUser(ctx);

    if (user && user.role === "admin") {
      return await this.Model.find({ ordered: true })
        .populate("user")
        .populate({ path: "product", populate: { path: "user" } });
    } else {
      throw new Error("管理者でのログインが必要です");
    }
  }

  async plusQuantity(id) {
    const order = await this.Model.findById(id)
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
    order.quantity++;
    await order.save();
    return order;
  }

  async minusQuantity(id) {
    const order = await this.Model.findById(id)
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
    order.quantity--;
    await order.save();
    return order;
  }

  findAndDelete(id) {
    return this.Model.findOneAndRemove({ _id: id });
  }

  async settlementMaximum(data, ctx) {
    const { id, quantity } = data;
    //orderとproduct取得
    const order = await this.Model.findById(id);
    const product = await ctx.models.Product.findById(order.product._id);
    //在庫数が注文に応えられない場合
    if (product.quantity < quantity) {
      throw new Error(`在庫${product.quantity}です`);
    }
    //注文数を在庫から減らす
    product.quantity -= quantity;
    await product.save();
    //注文を決済済みにする
    return await this.Model.findOneAndUpdate(
      { _id: id },
      { $set: { ordered: true, quantity, orderingPrice: product.price } },
      { new: true }
    )
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
  }

  async settlementCart(id, ctx) {
    //orderとproduct取得
    const order = await this.Model.findById(id);
    const product = await ctx.models.Product.findById(order.product._id);
    //在庫数が注文に応えられない場合
    if (product.quantity < order.quantity) {
      throw new Error(`在庫${product.quantity}です`);
    }
    //注文数を在庫から減らす
    product.quantity -= order.quantity;
    await product.save();
    //注文を決済済みにする
    return await this.Model.findOneAndUpdate(
      { _id: id },
      { $set: { ordered: true, orderingPrice: product.price } },
      { new: true }
    )
      .populate("user")
      .populate({ path: "product", populate: { path: "user" } });
  }

  async create(id) {
    const createdOrder = await this.Model.create({
      product: id,
      user: this.user._id,
    });
    return await this.getById(createdOrder._id);
  }
}

module.exports = Order;
