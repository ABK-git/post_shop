import React from "react";
import moment from "moment";
import {
  ProductDetailsContainer,
  DetailsMain,
  ProductIntroduceContainer,
  Introduce,
  SetNameAndContent,
  InName,
  InContent,
  CategoriesLeftJustify,
  SetNameAndContentJustifyRight,
  ExhibitDaysAndUserContainer,
} from "./product-details.styles";
import DisplayCategories from "../display-categories/display-categories.component";
import DisplayProductImages from "../display-product-images/product-images.component";

const ProductDetails = ({ product }) => (
  <ProductDetailsContainer>
    <CategoriesLeftJustify>
      <DisplayCategories categories={product.categories} />
    </CategoriesLeftJustify>

    <DetailsMain>
      <DisplayProductImages images={product.imagePasses} />
      <ProductIntroduceContainer>
        <Introduce>商品詳細</Introduce>
        <SetNameAndContent>
          <InName>商品名: </InName>
          <InContent>{product.name}</InContent>
        </SetNameAndContent>
        <SetNameAndContent>
          <InName>値段:</InName>
          <InContent>{product.price}</InContent>
        </SetNameAndContent>
        <SetNameAndContent>
          <InName>在庫:</InName>
          <InContent>{product.quantity}</InContent>
        </SetNameAndContent>
        <SetNameAndContent>
          <InName>説明:</InName>
          <InContent>{product.introduce}</InContent>
        </SetNameAndContent>

        <ExhibitDaysAndUserContainer>
          <SetNameAndContentJustifyRight>
            <InName>出品者:</InName>
            <InContent>{product.user.username}</InContent>
          </SetNameAndContentJustifyRight>
          <SetNameAndContentJustifyRight>
            <InName>出品日:</InName>
            <InContent>{moment(product.createdAt.parseInt).format("L")}</InContent>
          </SetNameAndContentJustifyRight>
        </ExhibitDaysAndUserContainer>
      </ProductIntroduceContainer>
    </DetailsMain>
  </ProductDetailsContainer>
);
export default ProductDetails;
