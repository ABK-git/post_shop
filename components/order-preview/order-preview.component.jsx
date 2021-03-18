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
  Flex,
  QuantityContainer,
  MinusCircleButton,
  PlusCircleButton,
} from "./order-preview.styles";

const OrderPreview = ({ order }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;
  return (
    <OrderPreviewContainer hmBreakPoint={hmBreakPoint}>
      <ProductName>{order.product.name}</ProductName>
      <WhiteBackground>
        <ProductImages images={order.product.imagePasses} />
        <TextRight>
          <div>
            <LeftJutifyStart>
              単価:￥{order.product.price.toLocaleString()}
            </LeftJutifyStart>
            <Flex>
              <MinusCircleButton>-</MinusCircleButton>
              <QuantityContainer>{order.quantity}</QuantityContainer>
              <PlusCircleButton>+</PlusCircleButton>
            </Flex>
          </div>
        </TextRight>
        <BorderPrice />
        <AmountPrice>
          計:￥{(order.product.price * order.quantity).toLocaleString()}
        </AmountPrice>
      </WhiteBackground>
    </OrderPreviewContainer>
  );
};

export default OrderPreview;
