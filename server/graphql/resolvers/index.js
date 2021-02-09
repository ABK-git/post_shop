//Userの変異
exports.userMutation = {
  signUp: async (root, { input }, ctx) => {
    const registerdUser = await ctx.models.User.signUp(input);
    return registerdUser._id;
  },
};
