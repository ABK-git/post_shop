import React from "react";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Spinner from "../../components/spinner/spinner.component";
import { getUsersOrderHistory } from "../../apollo/actions";
import WithAuthenticated from "../../hoc/withAuthenticated";
import OrderHistory from "../../components/order-history/order-history.component";

const OrderHistoryPage = () => {
  const { data, loading } = getUsersOrderHistory();
  const orderHistory = (data && data.usersOrderHistory) || {};
  if (loading) {
    return <Spinner />;
  }

  return <OrderHistory orderHistory={orderHistory} />;
};

export default withApollo(
  WithAuthenticated(OrderHistoryPage, { getDataFromTree })
);
