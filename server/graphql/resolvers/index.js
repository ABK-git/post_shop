//UserのMutation
exports.userMutations = {
  signUp: async (root, { input }, ctx) => {
    return await ctx.models.User.signUp(input);
  },
  updateUser: async (root, { input }, ctx) => {
    return await ctx.models.User.updateUser(input, ctx);
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
    const createdProduct = await ctx.models.Product.create(input);
    ctx.models.User.addProduct(ctx, createdProduct);
    return createdProduct;
  },
  updateProduct: async (root, { input }, ctx) => {
    return ctx.models.Product.update(input);
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
  getByUser: (root, args, ctx) => {
    return ctx.models.Product.getByUser();
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

//ReplyのQueries
exports.replyQueries = {
  reply: (root, { id }, ctx) => {
    return ctx.models.Reply.getById(id);
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

// ReviewのMutation
exports.reviewMutations = {
  createReview: async (root, { input }, ctx) => {
    const { product } = input;
    const createdReview = await ctx.models.Review.create(input);
    await ctx.models.Product.addReview(product, createdReview);
    return createdReview;
  },
};

//OrderのMutation
exports.orderMutations = {
  createOrder: async (root, { id }, ctx) => {
    return await ctx.models.Order.create(id);
  },
  plusQuantity: async (root, { id }, ctx) => {
    return await ctx.models.Order.plusQuantity(id);
  },
  minusQuantity: async (root, { id }, ctx) => {
    return await ctx.models.Order.minusQuantity(id);
  },
  deleteOrder: async (root, { id }, ctx) => {
    const deleteOrder = await ctx.models.Order.findAndDelete(id);
    return deleteOrder._id;
  },
  settlement: async (root, { id }, ctx) => {
    return ctx.models.Order.settlementCart(id, ctx);
  },
  settlementMaximum: async (root, { input }, ctx) => {
    return ctx.models.Order.settlementMaximum(input, ctx);
  },
};

//OrderのQuery
exports.orderQueries = {
  usersCart: async (root, args, ctx) => {
    return ctx.models.Order.getAllByUserCart();
  },
  usersOrderHistory: async (root, args, ctx) => {
    return ctx.models.Order.getAllByUserOrderHistory();
  },
  getAllOrdered: async (root, args, ctx) => {
    return ctx.models.Order.getAllOrdered(ctx);
  },
};
