import React, { useState, useEffect } from "react";
import {
  removeOrderFromCart,
  settlementMaximumOrder,
} from "../../apollo/actions";
import Swal from "sweetalert2";

const OrderPreviewSwal = ({ order, error }) => {
  const [settlementMaximum] = settlementMaximumOrder();
  const [deleteOrder] = removeOrderFromCart();
  const [getError, setError] = useState(error);
  useEffect(() => {
    if (getError) {
      fireSwal();
    }
    fireSwal();
    setError(null);
  }, []);
  const fireSwal = () => {
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
        }).catch((e) => {
          setError(e);
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
  };
  return null;
};

export default OrderPreviewSwal;
