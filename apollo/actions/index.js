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
  PLUS_ORDER_QUANTITY,
  MINUS_ORDER_QUANTITY,
  DELETE_ORDER,
  SETTLEMENT_ORDER,
  SETTLEMENT_MAXIMUM_ORDER,
  USERS_ORDER_HISTORY,
  GET_PRODUCTS_BY_USER,
  UPDATE_PRODUCT,
  GET_ALL_ORDERED,
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
export const getProductsByUser = () => useQuery(GET_PRODUCTS_BY_USER);
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
export const useUpdateProduct = () =>
  useMutation(UPDATE_PRODUCT, {
    update(cache, { data: { updateProduct } }) {
      cache.modify({
        id: cache.identify(updateProduct),
        fields: {
          updateProduct,
        },
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
export const getUsersOrderHistory = () => useQuery(USERS_ORDER_HISTORY);
export const getAllOrderedByAdmin = () => useQuery(GET_ALL_ORDERED);
export const plusOrderQuantity = () => useMutation(PLUS_ORDER_QUANTITY);
export const minusOrderQuantity = () => useMutation(MINUS_ORDER_QUANTITY);
export const settlementCartOrder = () =>
  useMutation(SETTLEMENT_ORDER, {
    update(cache, { data: { settlement } }) {
      const { usersCart } = cache.readQuery({ query: USERS_CART });
      const newUsersCart = usersCart.filter(
        (order) => order._id !== settlement._id
      );
      cache.writeQuery({
        query: USERS_CART,
        data: { usersCart: newUsersCart },
      });
      const { usersOrderHistory } = cache.readQuery({
        query: USERS_ORDER_HISTORY,
      });
      cache.writeQuery({
        query: USERS_ORDER_HISTORY,
        data: { usersOrderHistory: [...usersOrderHistory, settlement] },
      });
      const { getAllOrdered } = cache.readQuery({
        query: GET_ALL_ORDERED,
      });
      cache.writeQuery({
        query: GET_ALL_ORDERED,
        data: { getAllOrdered: [...getAllOrdered, settlement] },
      });
    },
  });
export const settlementMaximumOrder = () =>
  useMutation(SETTLEMENT_MAXIMUM_ORDER, {
    update(cache, { data: { settlementMaximum } }) {
      const { usersCart } = cache.readQuery({ query: USERS_CART });
      const newUsersCart = usersCart.filter(
        (order) => order._id !== settlementMaximum._id
      );
      cache.writeQuery({
        query: USERS_CART,
        data: { usersCart: newUsersCart },
      });
      const { usersOrderHistory } = cache.readQuery({
        query: USERS_ORDER_HISTORY,
      });
      cache.writeQuery({
        query: USERS_ORDER_HISTORY,
        data: { usersOrderHistory: [...usersOrderHistory, settlementMaximum] },
      });
      const { getAllOrdered } = cache.readQuery({
        query: GET_ALL_ORDERED,
      });
      cache.writeQuery({
        query: GET_ALL_ORDERED,
        data: { getAllOrdered: [...getAllOrdered, settlementMaximum] },
      });
    },
  });
export const removeOrderFromCart = () =>
  useMutation(DELETE_ORDER, {
    update(cache, { data: { deleteOrder } }) {
      const { usersCart } = cache.readQuery({ query: USERS_CART });
      const newUsersCart = usersCart.filter(
        (order) => order._id !== deleteOrder
      );
      cache.writeQuery({
        query: USERS_CART,
        data: { usersCart: newUsersCart },
      });
    },
  });
export const useCreateOrder = () =>
  useMutation(CREATE_ORDER, {
    update(cache, { data: { createOrder } }) {
      const { usersCart } = cache.readQuery({
        query: USERS_CART,
      });
      cache.writeQuery({
        query: USERS_CART,
        data: { usersCart: [...usersCart, createOrder] },
      });
    },
  });
