const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

//GraphQL types
const { userTypes, productTypes, questionTypes } = require("./types");
//GraphQL Model
const User = require("./models/User");
const Product = require("./models/Product");
const Question = require("./models/Question");
//GraphQL resolvers
const {
  userMutations,
  userQueries,
  productMutations,
  productQueries,
  questionMutations,
} = require("./resolvers");
//context
const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  //Schema
  const typeDefs = gql`
    ${userTypes}
    ${productTypes}
    ${questionTypes}

    type Query {
      user: User

      product(id: ID): Product
      products: [Product]
    }

    type Mutation {
      signUp(input: SignUpInput): User
      signIn(input: SignInInput): User
      signOut: Boolean

      createProduct(input: ProductCreateInput): Product
      
      createQuestion(input: QuestionCreateInput): Question
    }
  `;
  //resolver
  const resolvers = {
    Query: {
      ...userQueries,
      ...productQueries,
    },
    Mutation: {
      ...userMutations,
      ...productMutations,
      ...questionMutations,
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
      },
    }),
  });

  return apolloServer;
};
