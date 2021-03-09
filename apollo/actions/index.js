import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  SIGN_IN,
  SIGN_UP,
  GET_USER,
  SIGN_OUT,
  GET_PRODUCT,
  GET_PRODUCTS,
  CREATE_PRODUCT,
  CREATE_QUESTION,
} from "../queries";

//User認証
export const userSignUp = () => useMutation(SIGN_UP);
export const userSignIn = () =>
  useMutation(SIGN_IN, {
    update(cache, { data: { signIn } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user: signIn },
      });
    },
  });
export const getLazyAuthUser = () => useLazyQuery(GET_USER);
export const getAuthUser = () => useQuery(GET_USER);
export const userSignOut = () => useMutation(SIGN_OUT);

//Product
export const getProduct = (options) => useQuery(GET_PRODUCT, options);
export const getProducts = () => useQuery(GET_PRODUCTS);
export const getLazyProducts = () => useLazyQuery(GET_PRODUCTS);
export const useCreateProduct = () =>
  useMutation(CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      const { products } = cache.readQuery({ query: GET_PRODUCTS });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { products: [createProduct, ...products] },
      });
      const { user } = cache.readQuery({ query: GET_USER });
      user.products.push(createProduct);
      cache.writeQuery({ query: GET_USER, data: { user } });
    },
  });

//Question
export const useCreateQuestion = () =>
  useMutation(CREATE_QUESTION, {
    update(cache, { data: { createQuestion } }) {
      debugger;
      //1対多数の関係のProductを取得
      const { _id } = createQuestion.product;
      const { product } = cache.readQuery({
        query: GET_PRODUCT,
        variables: { id: _id },
      });
      delete createQuestion.product;
      product.questions.push(createQuestion);
      cache.writeQuery({ query: GET_PRODUCT, data: { product } });
    },
  });
