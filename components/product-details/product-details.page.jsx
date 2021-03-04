import React from "react";
import {
  DisplayProductImagesContainer,
  DetailsMain,
  ProductDetailsContainer,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import DisplayProductImages from "../display-product-images/product-images.component";

const ProductDetails = ({ product }) => (
  <ProductDetailsContainer>
    <DisplayCategories categories={product.categories} />
    <DetailsMain>
      <DisplayProductImages images={product.imagePasses} />
    </DetailsMain>
  </ProductDetailsContainer>
);
export default ProductDetails;
