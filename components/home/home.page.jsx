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

const HomePage = () => {
  const [displaySearchCondition, setDisplaySearchCondition] = useState(false);
  const router = useRouter();
  const { category: queryCategory } = router.query;

  const clearQuery = () => {
    router.replace("/", "/", { shallow: true });
  };
  const ref = useRef(null);
  const my_context = useContext(MyContext);
  const { changeFilter, setFilterFromQuery, filterState } = my_context;

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

  const { data, loading } = getProducts();
  const products = (data && data.products) || [];

  const handleClick = () => {
    setDisplaySearchCondition(!displaySearchCondition);
  };
  /**
   * 検索条件設定
   */
  const handleChange = (event) => {
    changeFilter(event);
  };
  const { name, category, highestPrice, lowestPrice } = filterState;
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
        if (product.category.includes("/")) {
          const categories = product.category
            .split("/")
            .map((category) => category.toLowerCase());
          return categories.includes(category.toLowerCase());
        } else {
          return product.category.toLowerCase() === category.toLowerCase();
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

  //sort関連
  const [selectOption, setSelectOption] = useState("出品日降順");
  const [selectDisplay, setSelectDisplay] = useState(false);
  const productsSort = (products) => {
    let newProducts = products;
    switch (selectOption) {
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
    }
    return newProducts;
  };
  const changeSelectDisplay = () => {
    setSelectDisplay(!selectDisplay);
  };
  //optionsはこうしないと無限ループエラーが出るので注意
  const options = [
    {
      label: "商品名降順",
      onClick: () => {
        setSelectOption("商品名降順");
      },
    },
    {
      label: "商品名昇順",
      onClick: () => {
        setSelectOption("商品名昇順");
      },
    },
    {
      label: "値段降順",
      onClick: () => {
        setSelectOption("値段降順");
      },
    },
    {
      label: "値段昇順",
      onClick: () => {
        setSelectOption("値段昇順");
      },
    },
    {
      label: "出品日降順",
      onClick: () => {
        setSelectOption("出品日降順");
      },
    },
    {
      label: "出品日昇順",
      onClick: () => {
        setSelectOption("出品日昇順");
      },
    },
  ];

  if (loading) {
    return <Spinner />;
  }

  if (products[0].imagePasses == null) {
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
          <GroupContainer>
            <FormInputButton onClick={changeSelectDisplay}>
              {selectOption}
            </FormInputButton>
          </GroupContainer>
          <MaxTable>
            <MaxTbody>
              <MaxTr>
                {selectDisplay &&
                  options.map((option, index) => (
                    <MaxTd key={index}>
                      <OptionButton onClick={option.onClick}>
                        {option.label}
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
              <ProductPreview
                key={product._id}
                product={product}
                selectDisplay={selectDisplay}
              />
            ))}
          </tr>
        </MaxTbody>
      </ProductsLayout>
    </HomeContainer>
  );
};

export default withApollo(HomePage);
