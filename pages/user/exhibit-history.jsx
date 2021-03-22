import React from "react";
import ExhibitHistory from "../../components/exhibit-history/exhibit-history.component";
import withApollo from "../../hoc/withApollo";
import WithAuthenticated from "../../hoc/withAuthenticated";
import { getDataFromTree } from "@apollo/react-ssr";
import { getProductsByUser } from "../../apollo/actions";
import Spinner from "../../components/spinner/spinner.component";

const ExhibitHistoryPage = () => {
  const { data, loading } = getProductsByUser();
  const products = (data && data.getByUser) || {};
  if (loading) {
    <Spinner />;
  }
  return <ExhibitHistory products={products} />;
};

export default withApollo(
  WithAuthenticated(ExhibitHistoryPage, { getDataFromTree })
);
