const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

//GraphQL types
const { userTypes, productTypes } = require("./types");
//GraphQL Model
const User = require("./models/User");
const Product = require("./models/Product");
//GraphQL resolvers
const {
  userMutations,
  userQueries,
  productMutations,
  productQueries,
} = require("./resolvers");
//context
const { buildAuthContext } = require("./context");

exports.createApolloServer = () => {
  //Schema
  const typeDefs = gql`
    ${userTypes}
    ${productTypes}

    type Query {
      user: User

      product: Product
      products: [Product]
    }

    type Mutation {
      signUp(input: SignUpInput): User
      signIn(input: SignInInput): User
      signOut: Boolean

      createProduct(input: ProductCreateInput): Product
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
      },
    }),
  });

  return apolloServer;
};
