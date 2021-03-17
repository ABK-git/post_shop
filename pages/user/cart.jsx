import React from "react";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Spinner from "../../components/spinner/spinner.component";
import { getUsersCart } from "../../apollo/actions";
import WithAuthenticated from "../../hoc/withAuthenticated";
import Cart from "../../components/cart/cart.page";

const CartPage = () => {
  const { data, loading } = getUsersCart();
  const usersCart = (data && data.usersCart) || {};
  if (loading) {
    return <Spinner />;
  }

  return <Cart usersCart={usersCart} />;
};

export default withApollo(WithAuthenticated(CartPage, { getDataFromTree }));
