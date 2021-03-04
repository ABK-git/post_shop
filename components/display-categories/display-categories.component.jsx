import React from "react";
import {
  DisplayCategoriesContainer,
  CategoryContainer,
  BorderCategory,
  TitleMessage,
} from "./display-categories.styles";
import Link from "next/link";

const DisplayCategories = ({ categories }) => (
  <DisplayCategoriesContainer>
    <BorderCategory>
      <TitleMessage>カテゴリ</TitleMessage>
      {categories &&
        categories.map((category, index) => (
          <Link key={index} href={{ pathname: "/", query: { category } }}>
            <CategoryContainer
              //一番右のカテゴリのmarginをなくす
              style={{ margin: categories.length === index + 1 && 0 }}>
              {category}
            </CategoryContainer>
          </Link>
        ))}
    </BorderCategory>
  </DisplayCategoriesContainer>
);

export default DisplayCategories;
