import React, { useState } from "react";
import withApollo from "../../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import { getProduct, getUsersCart } from "../../../apollo/actions";
import ProductDetails from "../../../components/product-details/product-details.page";
import Spinner from "../../../components/spinner/spinner.component";

const ProductDetailsPage = ({ query }) => {
  const { data, loading } = getProduct({ variables: { id: query.id } });
  const product = (data && data.product) || {};
  const { data: cart, loading: cartLoading } = getUsersCart();
  const usersCart = (cart && cart.usersCart) || {};

  if (loading || cartLoading) {
    return <Spinner />;
  }
  const index =
    usersCart &&
    Object.values(usersCart).findIndex(
      (order) => order.product._id === query.id
    );
  let orderedId = null;
  if (index >= 0) {
    orderedId = usersCart[index]._id;
  }

  return <ProductDetails product={product} orderedId={orderedId} />;
};

ProductDetailsPage.getInitialProps = async ({ query }) => {
  return { query };
};

export default withApollo(ProductDetailsPage, { getDataFromTree });
