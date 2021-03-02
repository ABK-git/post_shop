import React, { useState } from "react";

import { ProductCell } from "./product-preview.styles";
import DisplayProductImages from "../display-product-images/product-images.component";

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

  return (
    <ProductCell key={product._id}>
      <DisplayProductImages
        images={images}
        index={index}
        handleClickLeftButton={handleClickLeftButton}
        handleClickRightButton={handleClickRightButton}
      />
      <h1>{product.name}</h1>
      <p>{product.price}</p>
    </ProductCell>
  );
};

export default ProductPreview;
