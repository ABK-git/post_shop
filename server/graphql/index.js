const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");

//GraphQL types
const { userTypes } = require("./types");
//GraphQL Model
const User = require("./models/User");
//GraphQL resolvers
const { userMutation } = require("./resolvers");
//context
const { buildAuthContext } = require('./context');

exports.createApolloServer = () => {
  //Schema
  const typeDefs = gql`
    ${userTypes}

    type Query {
      user: User
    }

    type Mutation {
      signUp(input: SignUpInput): User
      signIn(input: SignInInput): User
      signOut: Boolean
    }
  `;
  //resolver
  const resolvers = {
    Mutation: {
      ...userMutation,
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
      },
    }),
  });

  return apolloServer;
};
