import React, { useContext } from "react";
import { minusOrderQuantity, plusOrderQuantity } from "../../apollo/actions";
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
  BinButton,
} from "./order-preview.styles";

const OrderPreview = ({ order }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;
  //graphql
  const [plusQuantity] = plusOrderQuantity();
  const [minusQuantity] = minusOrderQuantity();

  return (
    <OrderPreviewContainer hmBreakPoint={hmBreakPoint}>
      <ProductName>{order.product.name}</ProductName>
      <WhiteBackground>
        <ProductImages images={order.product.imagePasses} />
        <TextRight>
          <div>
            <LeftJutifyStart>
              単価:￥
              {String(order.product.price).replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                "$1,"
              )}
            </LeftJutifyStart>
            <Flex>
              {(order.quantity === 1 && <BinButton />) || (
                <MinusCircleButton
                  onClick={() => {
                    minusQuantity({ variables: { id: order._id } });
                  }}>
                  -
                </MinusCircleButton>
              )}
              <QuantityContainer>{order.quantity}</QuantityContainer>
              <PlusCircleButton
                onClick={() => {
                  plusQuantity({ variables: { id: order._id } });
                }}>
                +
              </PlusCircleButton>
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
