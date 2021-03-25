import React, { useContext } from "react";
import {
  Container,
  ProductIntroduce,
  OverhiddenRight,
  DisplayStartsContainer,
  ProductName,
} from "./product-history-preview.styles";
import DisplayProductImages from "../display-product-images/product-images.component";
import { getEvaluationOfStars } from "../../utils/functions";
import Link from "next/link";
import MyContext from "../../context";
import router from "next/router";

const ProductHistoryPreview = ({ product }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;

  const handleClickTo = () => {
    router.push(`/product/${product._id}/update`);
  };

  return (
    <Container hmBreakPoint={hmBreakPoint}>
      <Link href={`/product/${product._id}/update`}>
        <ProductName>{product.name}</ProductName>
      </Link>
      <DisplayProductImages
        images={product.imagePasses}
        handleClickTo={handleClickTo}
      />
      <ProductIntroduce onClick={handleClickTo}>
        <OverhiddenRight>
          単価：￥
          {String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
        </OverhiddenRight>
        <OverhiddenRight>
          <DisplayStartsContainer
            value={getEvaluationOfStars(product.reviews)}
            isEdit={false}
            cursor_pointer={true}
          />
        </OverhiddenRight>
      </ProductIntroduce>
    </Container>
  );
};

export default ProductHistoryPreview;
