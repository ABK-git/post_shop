import React from "react";
import { getProducts } from "../../apollo/actions";
import Spinner from "../spinner/spinner.component";
import {
  HomeContainer,
  HomeTitleMessage,
  ProductsLayout,
  ProductCell,
} from "./home.styles";
import withApollo from "../../hoc/withApollo";

const HomePage = () => {
  const { data, loading } = getProducts();
  const products = (data && data.products) || [];

  if (loading) {
    return <Spinner />;
  }
  console.log(products);
  return (
    <HomeContainer>
      <HomeTitleMessage>投稿商品一覧</HomeTitleMessage>
      <ProductsLayout>
        {products.map((product) => (
          <ProductCell key={product._id}>
            <h1>{product.name}</h1>
            <p>{product.price}</p>
          </ProductCell>
        ))}
      </ProductsLayout>
    </HomeContainer>
  );
};

export default withApollo(HomePage);
