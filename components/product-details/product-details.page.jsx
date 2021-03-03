import React from "react";
import { ProductDetailsContainer } from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";

const ProductDetails = ({ product }) => {
  return (
    <ProductDetailsContainer>
      <DisplayCategories categories={product.categories} />
    </ProductDetailsContainer>
  );
};

export default ProductDetails;
