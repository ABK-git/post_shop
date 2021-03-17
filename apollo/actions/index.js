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
  GET_QUESTION,
  CREATE_REPLY,
  CREATE_REVIEW,
  UPDATE_USER,
  CREATE_ORDER,
  USERS_CART,
} from "../queries";

//User認証
export const userSignUp = () => useMutation(SIGN_UP);
export const userUpdate = () =>
  useMutation(UPDATE_USER, {
    update(cache, { data: { user } }) {
      cache.writeQuery({
        query: GET_USER,
        data: { user },
      });
    },
  });
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
    },
  });

//Question
export const getQuestion = (options) => useQuery(GET_QUESTION, options);
export const useCreateQuestion = () =>
  useMutation(CREATE_QUESTION, {
    update(cache, { data: { createQuestion } }) {
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

//Reply
export const useCreateReply = () =>
  useMutation(CREATE_REPLY, {
    update(cache, { data: { createReply } }) {
      const { question: id } = createReply;
      const { question } = cache.readQuery({
        query: GET_QUESTION,
        variables: { id },
      });
      delete createReply.question;
      question.replies.push(createReply);
      cache.writeQuery({ query: GET_QUESTION, data: { question } });
    },
  });

//Review
export const useCreateReview = () =>
  useMutation(CREATE_REVIEW, {
    update(cache, { data: { createReview } }) {
      const { _id: id } = createReview.product;
      const { product } = cache.readQuery({
        query: GET_PRODUCT,
        variables: { id },
      });
      delete createReview.product;
      product.reviews.push(createReview);
      cache.writeQuery({ query: GET_PRODUCT, data: { product } });
    },
  });

//Order
export const getUsersCart = () => useQuery(USERS_CART);
export const useCreateOrder = () =>
  useMutation(CREATE_ORDER, {
    update(cache, { data: { createOrder } }) {
      let { usersCart } = cache.readQuery({
        query: USERS_CART,
      });

      const addQuantity = (order) =>
        order.product._id === createOrder.product._id;

      const haveSameOrder = usersCart.findIndex(addQuantity);
      if (haveSameOrder < 0) {
        if (usersCart.length === 0) {
          cache.writeQuery({
            query: USERS_CART,
            data: { usersCart: [createOrder] },
          });
        } else {
          cache.writeQuery({
            query: USERS_CART,
            data: { usersCart: [...usersCart, createOrder] },
          });
        }
      }
    },
  });
