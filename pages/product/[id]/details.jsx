import React from "react";
import ProductDetails from "../../../components/product-details/product-details.page";
import withApollo from "../../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { getProduct } from "../../../apollo/actions";

const ProductDetailsPage = ({ query }) => {
  const { data } = getProduct({ variables: { id: query.id } });
  const product = (data && data.product) || {};
  return <ProductDetails product={product} />;
};

ProductDetailsPage.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(ProductDetailsPage, { getDataFromTree });
