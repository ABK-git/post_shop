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

const ProductHistoryPreview = ({ product }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;
  return (
    <Container hmBreakPoint={hmBreakPoint}>
      <Link href={`/product/${product._id}/details`}>
        <ProductName>{product.name}</ProductName>
      </Link>
      <DisplayProductImages images={product.imagePasses} product={product} />
      <Link href={`/product/${product._id}/details`}>
        <ProductIntroduce>
          <OverhiddenRight>
            単価：￥{String(product.price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
          </OverhiddenRight>
          <OverhiddenRight>
            <DisplayStartsContainer
              value={getEvaluationOfStars(product.reviews)}
              isEdit={false}
              cursor_pointer={true}
            />
          </OverhiddenRight>
        </ProductIntroduce>
      </Link>
    </Container>
  );
};

export default ProductHistoryPreview;
