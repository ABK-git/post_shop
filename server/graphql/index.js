const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
//GraphQL types
const {
  userTypes,
  productTypes,
  questionTypes,
  replyTypes,
  reviewTypes,
} = require("./types");
//GraphQL Model
const User = require("./models/User");
const Product = require("./models/Product");
const Question = require("./models/Question");
const Reply = require("./models/Reply");
const Review = require("./models/Review");

//GraphQL resolvers
const {
  userMutations,
  userQueries,
  productMutations,
  productQueries,
  questionMutations,
  questionQueries,
  replyMutations,
  reviewMutations,
} = require("./resolvers");
//context
const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  //Schema
  const typeDefs = gql`
    ${userTypes}
    ${productTypes}
    ${questionTypes}
    ${replyTypes}
    ${reviewTypes}

    type Query {
      user: User

      product(id: ID): Product
      products: [Product]

      question(id: ID): Question
      reply(id: ID): Reply
      review(id: ID): Review
    }

    type Mutation {
      signUp(input: SignUpInput): User
      updateUser(input: SignUpInput): User
      signIn(input: SignInInput): User
      signOut: Boolean

      createProduct(input: ProductCreateInput): Product
      createQuestion(input: QuestionCreateInput): Question
      createReply(input: ReplyCreateInput): Reply
      createReview(input: ReviewCreateInput): Review
    }
  `;
  //resolver
  const resolvers = {
    Query: {
      ...userQueries,
      ...productQueries,
      ...questionQueries,
    },
    Mutation: {
      ...userMutations,
      ...productMutations,
      ...questionMutations,
      ...replyMutations,
      ...reviewMutations,
    },
  };

  //本体
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({
      ...buildAuthContext(req),
      models: {
        User: new User(mongoose.model("User")),
        Product: new Product(mongoose.model("Product"), req.user),
        Question: new Question(mongoose.model("Question"), req.user),
        Reply: new Reply(mongoose.model("Reply"), req.user),
        Review: new Review(mongoose.model("Review"), req.user),
      },
    }),
  });

  return apolloServer;
};
