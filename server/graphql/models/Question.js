class Question {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  async create(data) {
    data.user = this.user;
    if (data.user == null) {
      throw new Error("ログインしてください");
    }
    return this.Model.create(data);
  }

  getById(id) {
    return this.Model.findById(id)
      .populate("user")
      .populate("product")
      .populate({ path: "replies", populate: "user" });
  }

  addReply(_id, reply) {
    return this.Model.findOneAndUpdate(
      { _id },
      { $push: { replies: [reply] } }
    );
  }
}

module.exports = Question;
