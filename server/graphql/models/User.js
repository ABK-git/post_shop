class User {
  constructor(model) {
    this.Model = model;
  }
  getAuthUser(ctx) {
    if (ctx.isAuthenticated()) {
      const user_id = ctx.getUser();
      
      return this.Model.findById(user_id);
    }
    return null;
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
  async signIn(signInData, ctx){
    try{
      const user = await ctx.authenticate(signInData);//ここ
      return user;
    }catch(error){
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
}

module.exports = User;
