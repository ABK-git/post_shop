import React from "react";
import moment from "moment";
import {
  DetailsMain,
  ProductIntroduceContainer,
  Introduce,
  SetNameAndContent,
  InName,
  InContent,
  ExhibitDaysAndUserContainer,
  IntroduceContainer,
} from "./product-content.styles";

import DisplayProductImages from "../display-product-images/product-images.component";

const ProductContent = ({ product }) => (
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
        <InName>説明</InName>
      </SetNameAndContent>
      <IntroduceContainer>{product.introduce}</IntroduceContainer>
      <ExhibitDaysAndUserContainer>
        <div>
          <SetNameAndContent>
            <InName>出品者:</InName>
            <InContent>{product.user.username}</InContent>
          </SetNameAndContent>
          <SetNameAndContent>
            <InName>出品日:</InName>
            <InContent>
              {moment(product.createdAt.parseInt).format("L")}
            </InContent>
          </SetNameAndContent>
        </div>
      </ExhibitDaysAndUserContainer>
    </ProductIntroduceContainer>
  </DetailsMain>
);

export default ProductContent;
