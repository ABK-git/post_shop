class User {
  constructor(model) {
    this.Model = model;
  }

  async signUp(signUpData) {
    if (signUpData.password !== signUpData.password_confirm) {
      throw new Error("Passwordを確認してください");
    }

    try {
      return await this.Model.create(signUpData);
    } catch (e) {
      return null;
    }
  }
}

module.exports = User;
