import React, { useState } from "react";

import { ProductCell, ProductIntroduce } from "./product-preview.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import { useRouter } from "next/router";

const ProductPreview = ({ product }) => {
  const [images, setImages] = useState(product.imagePasses);

  //配列の何番目の画像を表示するか
  const [index, setIndex] = useState(0);
  //表示画像の変更
  const handleClickLeftButton = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const handleClickRightButton = () => {
    if (index < images.length - 1) {
      setIndex(index + 1);
    }
  };
  const router = useRouter();
  //商品ページへの移動
  const handleClickToProductDetails = () => {
    router.push(`/product/${product._id}/details`);
  }

  return (
    <ProductCell key={product._id}>
      <DisplayProductImages
        images={images}
        index={index}
        handleClickLeftButton={handleClickLeftButton}
        handleClickRightButton={handleClickRightButton}
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
