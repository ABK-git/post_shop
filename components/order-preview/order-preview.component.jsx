import React, { useContext } from "react";
import {
  removeOrderFromCart,
  minusOrderQuantity,
  plusOrderQuantity,
  settlementCartOrder,
  settlementMaximumOrder,
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
import Swal from "sweetalert2";

const OrderPreview = ({ order, inCart }) => {
  //context
  const my_context = useContext(MyContext);
  const { hmBreakPoint } = my_context;
  //graphql
  const [plusQuantity] = plusOrderQuantity();
  const [minusQuantity] = minusOrderQuantity();
  const [deleteOrder] = removeOrderFromCart();
  const [settlement, { error }] = settlementCartOrder();
  const [settlementMaximum, { error: maximumError }] = settlementMaximumOrder();

  if (error || maximumError) {
    Swal.fire({
      title: `注文数${order.quantity}に対し${order.product.name}の在庫は${order.product.quantity}です。`,
      text: `${order.product.quantity}つ購入でよろしいですか?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "注文",
      cancelButtonText: "削除",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const quantity = order.product.quantity;
        await settlementMaximum({
          variables: { id: order._id, quantity },
        });
        Swal.fire(
          `${order.product.name}を${quantity}つ購入しました!`,
          `I bought ${quantity} ${order.product.name}`,
          "success"
        );
      } else if (result.dismiss === "cancel") {
        await deleteOrder({ variables: { id: order._id } });
        Swal.fire(
          "注文を削除しました!",
          "Your order has been deleted.",
          "success"
        );
      }
    });
  }

  return (
    <OrderPreviewContainer hmBreakPoint={hmBreakPoint} inCart={inCart}>
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
          product={order.product}
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
            {inCart && (
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
            ) || <LeftJutifyStart>購入数：{order.quantity}</LeftJutifyStart>}
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
