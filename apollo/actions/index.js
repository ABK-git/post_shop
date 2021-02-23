import { useMutation, useQuery, useLazyQuery } from "@apollo/react-hooks";
import {
  SIGN_IN,
  SIGN_UP,
  GET_USER,
  SIGN_OUT,
  GET_PRODUCTS,
  CREATE_PRODUCT,
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
export const getProducts = () => useQuery(GET_PRODUCTS);
export const useCreateProduct = () =>
  useMutation(CREATE_PRODUCT, {
    update(cache, { data: { createProduct } }) {
      const { products } = cache.readQuery({ query: GET_PRODUCTS });
      cache.writeQuery({
        query: GET_PRODUCTS,
        data: { products: [createProduct, ...products] },
      });
    },
  });
