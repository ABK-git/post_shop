import React, { useState } from "react";
import { getProducts, getLazyProducts } from "../../apollo/actions";
import Spinner from "../spinner/spinner.component";
import {
  HomeContainer,
  HomeTitleMessage,
  ProductsLayout,
  DisplaySearchButton,
  OpenSearch,
  SearchConditionInput,
  SearchPriceDiv,
  PriceFormInput,
} from "./home.styles";
import withApollo from "../../hoc/withApollo";
import ProductPreview from "../product-preview/product-preview.component";
import FormInput from "../form-input/form-input.component";
import Router from "next/router";

const HomePage = () => {
  const [displaySearchCondition, setDisplaySearchCondition] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    name: "",
    category: "",
    lowestPrice: "",
    highestPrice: "",
  });

  const { data, loading } = getProducts();
  const products = (data && data.products) || [];

  const handleClick = () => {
    setDisplaySearchCondition(!displaySearchCondition);
  };
  /**
   * 検索条件設定
   */
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchCondition({ ...searchCondition, [name]: value });
  };
  const { name, category, highestPrice, lowestPrice } = searchCondition;

  //検索条件によって商品を絞り込むメソッド
  const productsFilter = (products) => {
    let newProducts = products;
    const { name, category, lowestPrice, highestPrice } = searchCondition;
    if (name != "") {
      newProducts = newProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (category != "") {
      newProducts = newProducts.filter((product) => {
        if (product.category.includes("/")) {
          const categories = product.category
            .split("/")
            .map((category) => category.toLowerCase());
          return categories.indexOf(category.toLowerCase()) >= 0;
        } else {
          return product.category.toLowerCase().includes(category.toLowerCase());
        }
      });
    }
    if (lowestPrice != "" && highestPrice != "") {
      const parseLowestPrice = parseInt(lowestPrice);
      const parseHighestPrice = parseInt(highestPrice);
      if (parseLowestPrice < parseHighestPrice) {
        newProducts = newProducts.filter(
          (product) =>
            product.price > parseLowestPrice &&
            product.price < parseHighestPrice
        );
      }
    }
    return newProducts;
  };
  const options = [
    { value: 'NAME_DESC', label: '商品名降順' },
    { value: 'NAME_ASC', label: '商品名昇順' },
    { value: 'PRICE_DESC', label: '値段降順' },
    { value: 'PRICE_ASC', label: '値段昇順' },
    { value: 'CREATED_DESC', label: '出品日降順' },
    { value: 'CREATED_ASC', label: '出品日昇順' },
  ]

  if (loading) {
    return <Spinner />;
  }

  if(products[0].imagePasses == null){
    Router.reload();
  }

  return (
    <HomeContainer>
      {displaySearchCondition && (
        <SearchConditionInput>
          <FormInput
            type="search"
            name="name"
            value={name}
            onChange={handleChange}
            label="商品名"
          />
          <FormInput
            type="search"
            name="category"
            value={category}
            onChange={handleChange}
            label="カテゴリ名"
          />
          <SearchPriceDiv>
            <PriceFormInput
              type="number"
              name="lowestPrice"
              label="値段下限"
              step="100"
              min="0"
              value={lowestPrice}
              onChange={handleChange}
            />
            <PriceFormInput
              type="number"
              name="highestPrice"
              label="値段上限"
              step="100"
              min="0"
              value={highestPrice}
              onChange={handleChange}
            />
          </SearchPriceDiv>
        </SearchConditionInput>
      )}
      <DisplaySearchButton onClick={handleClick}>
        <OpenSearch />
      </DisplaySearchButton>
      <HomeTitleMessage>投稿商品一覧</HomeTitleMessage>
      <ProductsLayout>
        <tbody>
          <tr>
            {productsFilter(products).map((product) => (
              <ProductPreview key={product._id} product={product} />
            ))}
          </tr>
        </tbody>
      </ProductsLayout>
    </HomeContainer>
  );
};

export default withApollo(HomePage);
