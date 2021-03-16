class User {
  constructor(model) {
    this.Model = model;
  }
  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      const user_id = ctx.getUser();
      return this.Model.findById(user_id).populate("products");
    }
    return null;
  }
  async signUp(signUpData) {
    if (signUpData.password !== signUpData.password_confirm) {
      throw new Error("Passwordを確認してください");
    }
    try {
      return await this.Model.create(signUpData);
    } catch (error) {
      return new Error("User登録に失敗しました");
    }
  }
  async updateUser(updateData, ctx) {
    const { username, email, password, password_confirm, avatar } = updateData;
    const fs = require("fs");
    if (password !== password_confirm) {
      throw new Error("Passwordを確認してください");
    }
    //ログインユーザーの取得
    let oldAvatar = "";
    const id = ctx.getUser();
    const user = await this.Model.findById(id);
    if(!user){
      throw new Error("ログインしてください");
    }
    //古いavatarを取得
    oldAvatar = user.avatar;
    //編集
    user.username = username;
    user.email = email;
    user.password = password;
    user.avatar = avatar;
    //update
    await user.save();
    //古いUser画像を削除
    if (oldAvatar && avatar) {
      fs.unlink(`./public${oldAvatar}`, (err) => {
        if(err){
          console.log("ファイル削除失敗")
        }
      });
    }
    return user;
  }
  async signIn(signInData, ctx) {
    try {
      return await ctx.authenticate(signInData); //ここ
    } catch (error) {
      return error;
    }
  }
  signOut(ctx) {
    try {
      ctx.logout();
      return true;
    } catch (e) {
      return false;
    }
  }

  async addProduct(ctx, product) {
    const _id = ctx.getUser();
    await this.Model.findOneAndUpdate(
      { _id },
      { $push: { products: [product] } }
    );
  }
}

module.exports = User;
