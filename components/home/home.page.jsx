import React, { useState } from "react";
import { getProducts } from "../../apollo/actions";
import Spinner from "../spinner/spinner.component";
import {
  HomeContainer,
  HomeTitleMessage,
  ProductsLayout,
  DisplaySearchButton,
  OpenSearch,
  SearchConditionInput,
} from "./home.styles";
import withApollo from "../../hoc/withApollo";
import ProductPreview from "../product-preview/product-preview.component";
import FormInput from "../form-input/form-input.component";

const HomePage = () => {
  const [displaySearchCondition, setDisplaySearchCondition] = useState(false);
  const [searchCondition, setSearchCondition] = useState({
    name: "",
  });

  const { data, loading } = getProducts();
  const products = (data && data.products) || [];

  if (loading) {
    return <Spinner />;
  }

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
  const { name } = searchCondition;

  //検索条件によって商品を絞り込むメソッド
  const productsFilter = (products) => {
    let newProducts = products;
    const { name } = searchCondition;
    if (name != "") {
      newProducts = newProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    return newProducts;
  };
  return (
    <HomeContainer>
      {displaySearchCondition && (
        <SearchConditionInput>
          <FormInput
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            label="商品名"
          />
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
