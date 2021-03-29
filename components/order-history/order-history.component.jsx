import React, { useState } from "react";
import {
  Container,
  OrderPreviewContainer,
  TitleMessage,
  Buttons,
  DropDownContainer,
  UlContainer,
  LiItem,
  DatePickerContainer,
  FilterPeriod,
  Flex,
} from "./order-history.styles";
import OrderPreview from "../order-preview/order-preview.component";
import CustomButton from "../custom-button/custom-button.component";
import moment from "moment";
import {
  getSortActive,
  getWetherFuture,
  getWetherPast,
} from "../../utils/functions";
import "react-datepicker/dist/react-datepicker";

const OrderHistory = ({ orderHistory, adminPage }) => {
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
  const date = new Date();
  date.setDate(1);
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(new Date());
  const changeIsOpenFilter = () => {
    setIsOpenFilter(!isOpenFilter);
  };
  const orderFilter = (orders) => {
    let new_orders = orders;
    //startDateから見てendDateが未来の場合
    if (getSortActive(startDate, endDate)) {
      //startDateより未来で、endDateよりも過去
      new_orders = new_orders.filter(
        (order) =>
          getWetherPast(order.updatedAt, endDate) &&
          getWetherFuture(order.updatedAt, startDate)
      );
    }
    return new_orders;
  };
  //取引総額を求める
  const getAmountPrice = (orders) => {
    let amountPrice = 0;
    for (let i = 0; i < orders.length; i++) {
      const { orderingPrice, quantity } = orders[i];
      amountPrice += orderingPrice * quantity;
    }
    return (
      "￥" + String(amountPrice).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    );
  };

  return (
    <Container>
      {(adminPage && <TitleMessage>管理者ページ</TitleMessage>) || (
        <TitleMessage>購入履歴</TitleMessage>
      )}
      <Buttons>
        <ul>
          <DropDownContainer>
            <CustomButton design="filter-history" onClick={changeIsOpenFilter}>
              絞り込み
            </CustomButton>
            {isOpenFilter && (
              <UlContainer>
                <DatePickerContainer
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
                <DatePickerContainer
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </UlContainer>
            )}
          </DropDownContainer>
        </ul>
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
      {getSortActive(startDate, endDate) && (
        <FilterPeriod>
          購入期間：
          {moment(startDate).format("YYYY/MM/DD")} ~{" "}
          {moment(endDate).format("YYYY/MM/DD")}
        </FilterPeriod>
      )}
      {getAmountPrice(orderHistory) !== "￥0" && (
        <Flex>
          {getSortActive(startDate, endDate) ? (
            <FilterPeriod>上記期間の取引総額：</FilterPeriod>
          ) : (
            <FilterPeriod>取引総額</FilterPeriod>
          )}
          <FilterPeriod>
            {getAmountPrice(ordersSort(orderFilter(orderHistory))) !== "￥0" &&
              getAmountPrice(ordersSort(orderFilter(orderHistory)))}
          </FilterPeriod>
        </Flex>
      )}
      <OrderPreviewContainer>
        {ordersSort(orderFilter(orderHistory)).map((order) => (
          <OrderPreview key={order._id} order={order} />
        ))}
      </OrderPreviewContainer>
    </Container>
  );
};

export default OrderHistory;
