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
} from "./sold-history.styles";
import CustomButton from "../custom-button/custom-button.component";
import moment from "moment";
import {
  getSortActive,
  getWetherFuture,
  getWetherPast,
} from "../../utils/functions";
import SoldPreview from "../sold-preview/sold-preview.component";

const SoldHistory = ({ soldHistory }) => {
  //sortドロップダウンリスト関連
  const [isOpenSort, setIsOpenSort] = useState(false);
  const sortOptions = ["売却日昇順", "売却日降順"];
  const [chooseOption, setChooseOption] = useState(sortOptions[0]);
  const changeIsOpenSort = () => {
    setIsOpenSort(!isOpenSort);
  };
  const ordersSort = (orders) => {
    let new_orders = orders;
    switch (chooseOption) {
      case "売却日昇順":
        new_orders = new_orders.sort((a, b) =>
          moment.unix(a.updatedAt).diff(moment.unix(b.updatedAt), "millisecond")
        );
        break;

      case "売却日降順":
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
      <TitleMessage>売却履歴</TitleMessage>
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
          売却期間：
          {moment(startDate).format("YYYY/MM/DD")} ~{" "}
          {moment(endDate).format("YYYY/MM/DD")}
        </FilterPeriod>
      )}
      <Flex>
        {(getSortActive(startDate, endDate) && (
          <FilterPeriod>上記期間の売却総額：</FilterPeriod>
        )) || <FilterPeriod>売却総額</FilterPeriod>}
        <FilterPeriod>
          {getAmountPrice(ordersSort(orderFilter(soldHistory))) !== "￥0" &&
            getAmountPrice(ordersSort(orderFilter(soldHistory)))}
        </FilterPeriod>
      </Flex>
      <OrderPreviewContainer>
        {ordersSort(orderFilter(soldHistory)).map((order) => (
          <SoldPreview key={order._id} order={order} />
        ))}
      </OrderPreviewContainer>
    </Container>
  );
};

export default SoldHistory;
