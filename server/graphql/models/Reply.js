class Reply {
  constructor(model, user) {
    this.Model = model;
    this.user = user;
  }

  create(data) {
    if (!this.user) {
      throw new Error("ログインしてください");
    }
    data.user = this.user;
    return this.Model.create(data);
  }

  getById(id) {
    return this.Model.findById(id);
  }
}

module.exports = Reply;
