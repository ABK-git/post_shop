import React, { useState } from "react";
import withApollo from "../../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { getProduct } from "../../../apollo/actions";
import Spinner from "../../../components/spinner/spinner.component";
import WithAuthenticated from "../../../hoc/withAuthenticated";
import ProductUpdate from "../../../components/product-update/product-update.page";
import ProductDetails from "../../../components/product-details/product-details.page";
import router from "next/router";

const ProductUpdatePage = ({ user }) => {
  const { data, loading } = getProduct({ variables: { id: router.query.id } });
  const product = (data && data.product) || {};

  if (loading) {
    return <Spinner />;
  }

  if (user._id === product.user._id) {
    return <ProductUpdate product={product} />;
  }

  return <ProductDetails product={product} />;
};

export default withApollo(WithAuthenticated(ProductUpdatePage), {
  getDataFromTree,
});
