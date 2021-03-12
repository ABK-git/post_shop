class Product {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getById(id) {
    try {
      return this.Model.findById(id)
        .populate("user")
        .populate({ path: "questions" , populate: "replies" });
    } catch (e) {
      throw new Error("商品が存在しません。");
    }
  }

  getAll() {
    return this.Model.find({}).populate("user").populate("questions");
  }

  create(data, ctx) {
    data.user = this.user;
    return this.Model.create(data);
  }

  async addQuestion(ctx, question) {
    const { _id } = question.product;
    await this.Model.findOneAndUpdate(
      { _id },
      { $push: { questions: [question] } }
    );
  }
}

module.exports = Product;
