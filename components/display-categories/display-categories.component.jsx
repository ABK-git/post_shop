import { Category } from "@styled-icons/boxicons-regular";
import React from "react";
import {
  DisplayCategoriesContainer,
  CategoryContainer,
  BorderCategory,
  TitleMessage,
} from "./display-categories.styles";

const DisplayCategories = ({ categories }) => {
  return (
    <DisplayCategoriesContainer>
      <BorderCategory>
        <TitleMessage>カテゴリ:</TitleMessage>
        {categories &&
          categories.map((category, index) => (
            <CategoryContainer
              key={index}
              //一番右のカテゴリのmarginをなくす
              style={{ margin: categories.length === index + 1 && 0 }}>
              {category}
            </CategoryContainer>
          ))}
      </BorderCategory>
    </DisplayCategoriesContainer>
  );
};

export default DisplayCategories;
