//UserのMutation
exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    //const registerdUser = await ctx.models.User.signUp(input);
    //return registerdUser._id;
    return await ctx.models.User.signUp(input);
  },
  signIn: async (root, { input }, ctx) => {
    return await ctx.models.User.signIn(input, ctx); //ここ
  },
  signOut: (root, args, ctx) => {
    return ctx.models.User.signOut(ctx);
  },
};
//UserのQuery
exports.userQueries = {
  user: (root, args, ctx) => {
    return ctx.models.User.getAuthUser(ctx);
  },
};

//Productのmutation
exports.productMutations = {
  createProduct: async (root, { input }, ctx) => {
    const createdProduct = await ctx.models.Product.create(input, ctx);
    ctx.models.User.addProduct(ctx, createdProduct);
    return createdProduct;
  },
};

//ProductのQuery
exports.productQueries = {
  products: (root, args, ctx) => {
    return ctx.models.Product.getAll();
  },
  product: (root, { id }, ctx) => {
    return ctx.models.Product.getById(id);
  },
};

//QuestionのQueries
exports.questionQueries = {
  question: (root, { id }, ctx) => {
    return ctx.models.Question.getById(id);
  },
};

//QuestionのMutation
exports.questionMutations = {
  createQuestion: async (root, { input }, ctx) => {
    const createdQuestion = await ctx.models.Question.create(input);
    ctx.models.Product.addQuestion(ctx, createdQuestion);
    return createdQuestion;
  },
};

//ReplyのMutation
exports.replyMutations = {
  createReply: async (root, { input }, ctx) => {
    const { question } = input;
    const createdReply = await ctx.models.Reply.create(input);
    await ctx.models.Question.addReply(question, createdReply);
    return createdReply;
  },
};
