import React, { useContext } from "react";
import {
  removeOrderFromCart,
  minusOrderQuantity,
  plusOrderQuantity,
  settlementCartOrder,
} from "../../apollo/actions";
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
import CustomButton from "../custom-button/custom-button.component";
import router from "next/router";
import OrderPreviewSwal from "../order-preview-swal/order-preview-swal.component";

const OrderPreview = ({ order, inCart }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;
  //graphql
  const [plusQuantity] = plusOrderQuantity();
  const [minusQuantity] = minusOrderQuantity();
  const [deleteOrder] = removeOrderFromCart();
  const [settlement, { error }] = settlementCartOrder();

  return (
    <OrderPreviewContainer hmBreakPoint={hmBreakPoint} inCart={inCart}>
      {error && <OrderPreviewSwal order={order} error={error} />}
      <ProductName>{order.product.name}</ProductName>
      {inCart && (
        <CustomButton
          design={"order-preview"}
          onClick={() => {
            settlement({ variables: { id: order._id } });
          }}>
          決済
        </CustomButton>
      )}
      <WhiteBackground>
        <ProductImages
          images={order.product.imagePasses}
          handleClickTo={() => {
            router.push(`/product/${order.product._id}/details`);
          }}
          cartSize={true}
        />
        <TextRight>
          <div>
            <LeftJutifyStart>
              単価:￥
              {String(order.product.price).replace(
                /(\d)(?=(\d\d\d)+(?!\d))/g,
                "$1,"
              )}
            </LeftJutifyStart>
            {(inCart && (
              <Flex>
                {(order.quantity === 1 && (
                  <BinButton
                    onClick={() => {
                      deleteOrder({ variables: { id: order._id } });
                    }}
                  />
                )) || (
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
            )) || <LeftJutifyStart>購入数：{order.quantity}</LeftJutifyStart>}
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
