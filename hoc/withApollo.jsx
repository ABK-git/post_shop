import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: (operation) => {
        operation.setContext({
          fetchOptions: {
            credentials: "include",
          },
          headers,
        });
      },
      //uri: "http://localhost:3000/graphql",
      uri: process.env.BASE_URL,
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Product: {
          categories({ category }, args, { cache }) {
            let categories = [];
            if (category.includes("/")) {
              categories = category.split("/").filter((category) => category);
            } else {
              categories.push(category);
            }
            return categories;
          },
        },
        Products: {
          categories({ category }, args, { cache }) {
            let categories = [];
            if (category.includes("/")) {
              categories = category.split("/").filter((category) => category);
            } else {
              categories.push(category);
            }
            return categories;
          },
        },
      },
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
