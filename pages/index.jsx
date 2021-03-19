import React from "react";
import HomePage from "../components/home/home.page.jsx";
import { getDataFromTree } from "@apollo/react-ssr";
import withApollo from "../hoc/withApollo";
import { getProducts } from "../apollo/actions/index.js";
import Spinner from "../components/spinner/spinner.component.jsx";

const Home = () => {
  const { data, loading } = getProducts();
  if (loading) {
    return <Spinner />;
  }
  const products = (data && data.products) || [];
  return <HomePage productsFromPage={products} />;
};

export default withApollo(Home, { getDataFromTree });
