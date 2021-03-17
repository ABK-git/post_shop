import React from "react";
import {
  Overhidden,
  ProductCell,
  ProductIntroduce,
  OverhiddenLeft,
  OverhiddenRight,
} from "./product-preview.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import { useRouter } from "next/router";
import { getEvaluationOfStars } from "../../utils/functions";
import DisplayStars from "../display-stars/display-stars.component";
import ReloadAndToHome from "../reload-and-tohome";

const ProductPreview = ({ product }) => {
  const router = useRouter();
  //商品ページへの移動
  const handleClickToProductDetails = () => {
    router.push(`/product/${product._id}/details`);
  };

  return (
    <ProductCell>
      <DisplayProductImages
        images={product.imagePasses}
        handleClickToProductDetails={handleClickToProductDetails}
      />
      <ProductIntroduce onClick={handleClickToProductDetails}>
        <Overhidden>{product.name}</Overhidden>
        <OverhiddenLeft>￥{product.price}</OverhiddenLeft>
        <OverhiddenRight>
          <DisplayStars
            value={getEvaluationOfStars(product.reviews)}
            isEdit={false}
            cursor_pointer={true}
          />
          <p>({product.reviews.length})</p>
        </OverhiddenRight>
      </ProductIntroduce>
    </ProductCell>
  );
};

export default ProductPreview;
