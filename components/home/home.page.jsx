import React from "react";
import { getProducts } from "../../apollo/actions";
import Spinner from "../spinner/spinner.component";
import {
  HomeContainer,
  HomeTitleMessage,
  ProductsLayout,
  ProductTr,
} from "./home.styles";
import withApollo from "../../hoc/withApollo";
import ProductPreview from "../product-preview/product-preview.component";

const HomePage = () => {
  const { data, loading } = getProducts();
  const products = (data && data.products) || [];

  if (loading) {
    return <Spinner />;
  }
  
  return (
    <HomeContainer>
      <HomeTitleMessage>投稿商品一覧</HomeTitleMessage>
      <ProductsLayout>
        <tbody>
          <tr>
            {products.map((product) => (
              <ProductPreview key={product._id} product={product} />
            ))}
          </tr>
        </tbody>
      </ProductsLayout>
    </HomeContainer>
  );
};

export default withApollo(HomePage);
