class Product {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  getById(id) {
    try {
      return this.Model.findById(id)
        .populate("user")
        .populate("reviews")
        .populate({ path: "questions", populate: "replies", populate: "user" });
    } catch (e) {
      throw new Error("商品が存在しません。");
    }
  }

  getAll() {
    return this.Model.find({})
      .populate("user")
      .populate("questions")
      .populate("reviews");
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

  async addReview(_id, review) {
    return this.Model.findOneAndUpdate(
      { _id },
      { $push: { reviews: [review] } }
    );
  }
}

module.exports = Product;
