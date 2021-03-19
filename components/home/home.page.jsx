import React, { useState, useEffect, useRef, useContext } from "react";
import { getProducts } from "../../apollo/actions";
import moment from "moment";
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
  GroupContainer,
  FormInputButton,
  OptionButton,
  MaxTbody,
  MaxTd,
  MaxTable,
  MaxTr,
} from "./home.styles";
import withApollo from "../../hoc/withApollo";
import ProductPreview from "../product-preview/product-preview.component";
import FormInput from "../form-input/form-input.component";
import Router, { useRouter } from "next/router";
import MyContext from "../../context";
import { getEvaluationOfStars } from "../../utils/functions";

const HomePage = ({ productsFromPage }) => {
  const [displaySearchCondition, setDisplaySearchCondition] = useState(false);
  const router = useRouter();
  const { category: queryCategory } = router.query;

  const clearQuery = () => {
    router.replace("/", "/", { shallow: true });
  };
  const ref = useRef(null);
  const my_context = useContext(MyContext);
  const {
    changeFilter,
    setFilterFromQuery,
    setSortState,
    filterState,
    sortState,
  } = my_context;
  const options = [
    "出品日降順",
    "出品日昇順",
    "商品名降順",
    "商品名昇順",
    "値段降順",
    "値段昇順",
    "高評価順",
    "評価数順",
  ];

  useEffect(() => {
    if (queryCategory) {
      setFilterFromQuery({ name: "category", value: queryCategory });
      ref.current = setTimeout(() => {
        clearQuery();
      }, 100);
    }
    return () => {
      clearTimeout(ref.current);
    };
  }, [queryCategory]);

  const products = productsFromPage;

  const handleClick = () => {
    setDisplaySearchCondition(!displaySearchCondition);
  };
  /**
   * 検索条件設定
   */
  const handleChange = (event) => {
    changeFilter(event);
  };
  const {
    name,
    category,
    highestPrice,
    lowestPrice,
    lowestEvaluation,
    lowestReviewsLength,
  } = filterState;
  //検索条件によって商品を絞り込むメソッド
  const productsFilter = (products) => {
    let newProducts = products;
    if (name != "") {
      newProducts = newProducts.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase())
      );
    }
    if (category != "") {
      newProducts = newProducts.filter((product) => {
        const { categories } = product;
        for (let i = 0; i < categories.length; i++) {
          if (categories[i].indexOf(category.toLowerCase()) >= 0) {
            return true;
          }
        }
        return false;
      });
    }

    if (lowestPrice || highestPrice) {
      const parseLowestPrice = (lowestPrice && parseInt(lowestPrice)) || 0;
      const parseHighestPrice = (highestPrice && parseInt(highestPrice)) || 0;
      if (parseLowestPrice && parseHighestPrice) {
        if (parseLowestPrice < parseHighestPrice) {
          newProducts = newProducts.filter(
            (product) =>
              product.price > parseLowestPrice &&
              product.price < parseHighestPrice
          );
        }
      } else if (parseLowestPrice && parseHighestPrice == 0) {
        newProducts = newProducts.filter(
          (product) => product.price > parseLowestPrice
        );
      } else if (parseHighestPrice && parseLowestPrice == 0) {
        newProducts = newProducts.filter(
          (product) => product.price < parseHighestPrice
        );
      }
    }
    //評価数絞り
    newProducts = newProducts.filter(
      (product) => product.reviews.length >= lowestReviewsLength
    );
    //評価絞り
    newProducts = newProducts.filter(
      (product) => getEvaluationOfStars(product.reviews) >= lowestEvaluation
    );
    return newProducts;
  };

  //sort関連
  const [selectDisplay, setSelectDisplay] = useState(false);
  const productsSort = (products) => {
    let newProducts = products;
    switch (sortState) {
      case "商品名降順":
        newProducts = newProducts.sort((a, b) =>
          b.name.localeCompare(a.name, "ja", { sensitivity: "base" })
        );
        break;

      case "商品名昇順":
        newProducts = newProducts.sort((a, b) =>
          a.name.localeCompare(b.name, "ja", { sensitivity: "base" })
        );
        break;

      case "出品日降順":
        newProducts = newProducts.sort((a, b) =>
          moment.unix(b.createdAt).diff(moment.unix(a.createdAt), "millisecond")
        );
        break;

      case "出品日昇順":
        newProducts = newProducts.sort((a, b) =>
          moment.unix(a.createdAt).diff(moment.unix(b.createdAt), "millisecond")
        );
        break;

      case "値段降順":
        newProducts = newProducts.sort((a, b) => b.price - a.price);
        break;

      case "値段昇順":
        newProducts = newProducts.sort((a, b) => a.price - b.price);
        break;

      case "高評価順":
        newProducts = newProducts.sort(
          (a, b) =>
            getEvaluationOfStars(b.reviews) - getEvaluationOfStars(a.reviews)
        );
        break;

      case "評価数順":
        newProducts = newProducts.sort(
          (a, b) => b.reviews.length - a.reviews.length
        );
        break;
    }
    return newProducts;
  };
  const changeSelectDisplay = () => {
    setSelectDisplay(!selectDisplay);
  };

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
          <FormInput
            type="number"
            name="lowestEvaluation"
            label="評価下限"
            step="0.5"
            max="5"
            min="0"
            value={lowestEvaluation}
            onChange={handleChange}
          />
          <FormInput
            type="number"
            name="lowestReviewsLength"
            label="評価数下限"
            step="1"
            min="0"
            value={lowestReviewsLength}
            onChange={handleChange}
          />
          <GroupContainer>
            <FormInputButton onClick={changeSelectDisplay}>
              {sortState}
            </FormInputButton>
          </GroupContainer>
          <MaxTable>
            <MaxTbody>
              <MaxTr>
                {selectDisplay &&
                  options.map((option, index) => (
                    <MaxTd key={index}>
                      <OptionButton onClick={() => setSortState(option)}>
                        {option}
                      </OptionButton>
                    </MaxTd>
                  ))}
              </MaxTr>
            </MaxTbody>
          </MaxTable>
        </SearchConditionInput>
      )}
      <DisplaySearchButton onClick={handleClick}>
        <OpenSearch />
      </DisplaySearchButton>
      <HomeTitleMessage>投稿商品一覧</HomeTitleMessage>
      <ProductsLayout>
        <MaxTbody>
          <tr>
            {productsSort(productsFilter(products)).map((product) => (
              <ProductPreview key={product._id} product={product} />
            ))}
          </tr>
        </MaxTbody>
      </ProductsLayout>
    </HomeContainer>
  );
};

export default HomePage;
