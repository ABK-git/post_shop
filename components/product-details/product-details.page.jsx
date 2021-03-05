import React from "react";
import {
  ProductDetailsContainer,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import DisplayProductImages from "../display-product-images/product-images.component";

const ProductDetails = ({ product }) => (
  <ProductDetailsContainer>
    <DisplayCategories categories={product.categories} />
    <DisplayProductImages images={product.imagePasses} />
  </ProductDetailsContainer>
);
export default ProductDetails;
