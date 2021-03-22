import React from "react";
import {
  Overhidden,
  ProductCell,
  ProductIntroduce,
  OverhiddenLeft,
  OverhiddenRight,
} from "./product-preview.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import { getEvaluationOfStars } from "../../utils/functions";
import DisplayStars from "../display-stars/display-stars.component";
import Link from "next/link";
import router from "next/router";

const ProductPreview = ({ product }) => {
  //商品ページへの移動
  const handleClickTo = () => {
    router.push(`/product/${product._id}/details`);
  };
  return (
    <ProductCell>
      <DisplayProductImages
        images={product.imagePasses}
        product={product}
        handleClickTo={handleClickTo}
      />
      <Link href={`/product/${product._id}/details`}>
        <ProductIntroduce>
          <Overhidden>{product.name}</Overhidden>
          <OverhiddenLeft>
            ￥{String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
          </OverhiddenLeft>
          <OverhiddenRight>
            <DisplayStars
              value={getEvaluationOfStars(product.reviews)}
              isEdit={false}
              cursor_pointer={true}
            />
            <p>({product.reviews.length})</p>
          </OverhiddenRight>
        </ProductIntroduce>
      </Link>
    </ProductCell>
  );
};

export default ProductPreview;
