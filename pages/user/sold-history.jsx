import React from "react";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Spinner from "../../components/spinner/spinner.component";
import {
  getUsersOrderHistory,
  getUsersSoldHistory,
} from "../../apollo/actions";
import WithAuthenticated from "../../hoc/withAuthenticated";
import SoldHistory from "../../components/sold-history/sold-history.page";

const SoldHistoryPage = () => {
  const { data, loading } = getUsersSoldHistory();
  const soldHistory =
    (data &&
      data.getSoldHistory.filter((order) => order.product.user !== null)) ||
    {};
  if (loading) {
    return <Spinner />;
  }

  return <SoldHistory soldHistory={soldHistory} />;
};

export default withApollo(
  WithAuthenticated(SoldHistoryPage, { getDataFromTree })
);
