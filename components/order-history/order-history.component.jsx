import React, { useState } from "react";
import {
  Container,
  OrderPreviewContainer,
  TitleMessage,
  Buttons,
  DropDownContainer,
  UlContainer,
  LiItem,
} from "./order-history.styles";
import OrderPreview from "../order-preview/order-preview.component";
import CustomButton from "../custom-button/custom-button.component";
import moment from "moment";

const OrderHistory = ({ orderHistory }) => {
  //sortドロップダウンリスト関連
  const [isOpenSort, setIsOpenSort] = useState(false);
  const sortOptions = ["購入日昇順", "購入日降順"];
  const [chooseOption, setChooseOption] = useState(sortOptions[0]);
  const changeIsOpenSort = () => {
    setIsOpenSort(!isOpenSort);
  };
  const ordersSort = (orders) => {
    let new_orders = orders;
    switch (chooseOption) {
      case "購入日昇順":
        new_orders = new_orders.sort((a, b) =>
          moment.unix(a.updatedAt).diff(moment.unix(b.updatedAt), "millisecond")
        );
        break;

      case "購入日降順":
        new_orders = new_orders.sort((a, b) =>
          moment.unix(b.updatedAt).diff(moment.unix(a.updatedAt), "millisecond")
        );
        break;
    }
    return new_orders;
  };
  //filterドロップリスト関連
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const changeIsOpenFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  return (
    <Container>
      <TitleMessage>注文履歴</TitleMessage>
      <Buttons>
        <CustomButton design="filter-history" onClick={changeIsOpenFilter}>
          絞り込み
        </CustomButton>
        <ul>
          <DropDownContainer>
            <CustomButton design="sort-history" onClick={changeIsOpenSort}>
              {chooseOption}
            </CustomButton>
            {isOpenSort && (
              <UlContainer>
                {sortOptions.map((option, index) => (
                  <LiItem
                    key={index}
                    onClick={() => {
                      setChooseOption(option);
                    }}>
                    {option}
                  </LiItem>
                ))}
              </UlContainer>
            )}
          </DropDownContainer>
        </ul>
      </Buttons>
      <OrderPreviewContainer>
        {ordersSort(orderHistory).map((order) => (
          <OrderPreview key={order._id} order={order} />
        ))}
      </OrderPreviewContainer>
    </Container>
  );
};

export default OrderHistory;
