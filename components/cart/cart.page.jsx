import React from "react";
import OrderPreview from "../order-preview/order-preview.component";
import {
  AmountCart,
  CartContainer,
  OrderPreviewContainer,
  TitleMessage,
} from "./cart.styles";

const Cart = ({ usersCart }) => {
  let amountCart = 0;
  usersCart.forEach((order) => {
    amountCart += order.product.price * order.quantity;
  });

  return (
    <CartContainer>
      <TitleMessage>YOUR CART</TitleMessage>
      <AmountCart>合計:￥{amountCart.toLocaleString()}</AmountCart>
      <OrderPreviewContainer>
        {usersCart.map((order) => (
          <OrderPreview
            key={order._id}
            order={order}
          />
        ))}
      </OrderPreviewContainer>
    </CartContainer>
  );
};
export default Cart;
