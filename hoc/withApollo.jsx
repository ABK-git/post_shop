import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: "http://localhost:3000/graphql",
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Product: {
          categories({ category }, args, { cache }) {
            let categories = [];
            if (category.includes("/")) {
              categories = category.split("/");
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
