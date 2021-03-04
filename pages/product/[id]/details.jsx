import React, { useState } from "react";
import withApollo from "../../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { getProduct } from "../../../apollo/actions";
import ProductDetails from "../../../components/product-details/product-details.page";
import Spinner from "../../../components/spinner/spinner.component";

const ProductDetailsPage = ({ query }) => {
  const { data, loading } = getProduct({ variables: { id: query.id } });
  const product = (data && data.product) || {};

  if (loading) {
    return <Spinner />;
  }

  return <ProductDetails product={product} />;
};

ProductDetailsPage.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(ProductDetailsPage, { getDataFromTree });
