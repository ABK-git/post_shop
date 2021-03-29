import React, { useState } from "react";
import {
  Container,
  PreviewContainer,
  TitleMessage,
  Buttons,
  DropDownContainer,
  UlContainer,
  LiItem,
  DatePickerContainer,
  FilterPeriod,
  Relative,
} from "./exhibit-history.styles";
import CustomButton from "../custom-button/custom-button.component";
import moment from "moment";
import {
  getSortActive,
  getWetherFuture,
  getWetherPast,
} from "../../utils/functions";
import ProductHistoryPreview from "../product-history-preview/product-history-preview.component";

const ExhibitHistory = ({ products }) => {
  //sortドロップダウンリスト関連
  const [isOpenSort, setIsOpenSort] = useState(false);
  const sortOptions = ["出品日昇順", "出品日降順"];
  const [chooseOption, setChooseOption] = useState(sortOptions[0]);
  const changeIsOpenSort = () => {
    setIsOpenSort(!isOpenSort);
  };
  const productsSort = (products) => {
    let new_products = products;
    switch (chooseOption) {
      case "出品日昇順":
        new_products = new_products.sort((a, b) =>
          moment.unix(a.createdAt).diff(moment.unix(b.createdAt), "millisecond")
        );
        break;

      case "出品日降順":
        new_products = new_products.sort((a, b) =>
          moment.unix(b.createdAt).diff(moment.unix(a.createdAt), "millisecond")
        );
        break;
    }
    return new_products;
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
  const productsFilter = (products) => {
    let new_products = products;
    //startDateから見てendDateが未来の場合
    if (getSortActive(startDate, endDate)) {
      //startDateより未来で、endDateよりも過去
      new_products = new_products.filter(
        (product) =>
          getWetherPast(product.createdAt, endDate) &&
          getWetherFuture(product.createdAt, startDate)
      );
    }
    return new_products;
  };
  return (
    <Container>
      <TitleMessage>出品履歴</TitleMessage>
      <Buttons>
        <ul>
          <DropDownContainer>
            <CustomButton design="filter-history" onClick={changeIsOpenFilter}>
              絞り込み
            </CustomButton>
            {isOpenFilter && (
              <UlContainer>
                <Relative>
                  <DatePickerContainer
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                  <DatePickerContainer
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </Relative>
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
          出品期間：
          {moment(startDate).format("YYYY/MM/DD")} ~{" "}
          {moment(endDate).format("YYYY/MM/DD")}
        </FilterPeriod>
      )}
      <PreviewContainer>
        {productsSort(productsFilter(products)).map((product) => (
          <ProductHistoryPreview key={product._id} product={product} />
        ))}
      </PreviewContainer>
    </Container>
  );
};

export default ExhibitHistory;
