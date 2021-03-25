import React from "react";
import withApollo from "../../hoc/withApollo";
import { getDataFromTree } from "@apollo/react-ssr";
import Spinner from "../../components/spinner/spinner.component";
import { getAllOrderedByAdmin } from "../../apollo/actions";
import WithAdminAuth from "../../hoc/withAdminAuth";
import Transaction from "../../components/transaction/transaction.component";

const AdminPage = (props) => {
  const { data, loading } = getAllOrderedByAdmin();
  const orderHistory = (data && data.getAllOrdered) || {};
  if (loading) {
    return <Spinner />;
  }
  return <Transaction orderHistory={orderHistory} {...props} />;
};

export default withApollo(WithAdminAuth(AdminPage), {
  getDataFromTree,
});
