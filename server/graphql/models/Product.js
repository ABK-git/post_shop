class Product {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  findById(id) {
    return this.Model.findById(id);
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

  getByUser() {
    return this.Model.find({ user: this.user._id }).populate("reviews");
  }

  getAll() {
    return this.Model.find({})
      .populate("user")
      .populate("questions")
      .populate("reviews");
  }

  create(data) {
    data.user = this.user;
    return this.Model.create(data);
  }

  async update(data) {
    if (data.imagePasses != undefined) {
      const fs = require("fs");
      const product = await this.Model.findById(data.id);
      const { imagePasses } = product;
      for (let i = 0; i < imagePasses.length; i++) {
        try {
          await fs.unlinkSync(`./public${imagePasses[i]}`);
        } catch (e) {}
      }
    }
    return this.Model.findOneAndUpdate(
      { _id: data.id },
      { $set: data },
      { new: true }
    );
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
