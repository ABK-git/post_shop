import React, { useContext } from "react";
import MyContext from "../../context";
import ProductImages from "../display-product-images/product-images.component";
import {
  AmountPrice,
  BorderPrice,
  LeftJutifyStart,
  OrderPreviewContainer,
  ProductName,
  TextRight,
  WhiteBackground,
} from "./transaction-preview.styles";
import router from "next/router";

const TransactionPreview = ({ order }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;

  const handleClickTo = () => {
    router.push(`/product/${order.product._id}/details`);
  };

  return (
    <OrderPreviewContainer hmBreakPoint={hmBreakPoint}>
      <ProductName onClick={handleClickTo}>{order.product.name}</ProductName>
      <WhiteBackground>
        <ProductImages
          images={order.product.imagePasses}
          handleClickTo={handleClickTo}
          cartSize={true}
        />
        <TextRight onClick={handleClickTo}>
          <div>
            <LeftJutifyStart>
              単価:￥
              {(order.orderingPrice &&
                String(order.orderingPrice).replace(
                  /(\d)(?=(\d\d\d)+(?!\d))/g,
                  "$1,"
                )) ||
                String(order.product.price).replace(
                  /(\d)(?=(\d\d\d)+(?!\d))/g,
                  "$1,"
                )}
            </LeftJutifyStart>
            <LeftJutifyStart>取引数：{order.quantity}</LeftJutifyStart>
          </div>
        </TextRight>
        <BorderPrice />
        <AmountPrice>
          計:￥
          {(order.orderingPrice &&
            (order.orderingPrice * order.quantity).toLocaleString()) ||
            (order.product.price * order.quantity).toLocaleString()}
        </AmountPrice>
      </WhiteBackground>
    </OrderPreviewContainer>
  );
};

export default TransactionPreview;
