class Question {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  async create(data) {
    data.user = this.user;
    return this.Model.create(data);
  }

  getById(id) {
    return this.Model.findById(id).populate("product");
  }
}

module.exports = Question;
