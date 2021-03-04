import React from "react";

import { ProductCell, ProductIntroduce } from "./product-preview.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import { useRouter } from "next/router";

const ProductPreview = ({ product }) => {
  const images = product.imagePasses;

  const router = useRouter();
  //商品ページへの移動
  const handleClickToProductDetails = () => {
    router.push(`/product/${product._id}/details`);
  }

  return (
    <ProductCell key={product._id}>
      <DisplayProductImages
        images={images}
        handleClickToProductDetails={handleClickToProductDetails}
      />
      <ProductIntroduce onClick={handleClickToProductDetails}>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
      </ProductIntroduce>
    </ProductCell>
  );
};

export default ProductPreview;
