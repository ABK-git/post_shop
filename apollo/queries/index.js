import { gql } from "apollo-boost";

//User認証
export const SIGN_UP = gql`
  mutation SignUp(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $password_confirm: String!
  ) {
    signUp(
      input: {
        avatar: $avatar
        username: $username
        email: $email
        password: $password
        password_confirm: $password_confirm
      }
    ) {
      _id
      username
      email
      password
      avatar
    }
  }
`;
export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      username
      email
      password
      avatar
    }
  }
`;
export const GET_USER = gql`
  query User {
    user {
      _id
      username
      email
      password
      avatar
    }
  }
`;
export const SIGN_OUT = gql`
  mutation SignOut {
    signOut
  }
`;

/**
 * Product
 */
export const GET_PRODUCTS = gql`
  query Products {
    products {
      _id
      name
      category
      price
      quantity
      imagePasses
      introduce
      createdAt
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_PRODUCT = gql`
  mutation CreateProduct(
    $name: String!
    $category: String!
    $price: Int!
    $imagePasses: [String]
    $quantity: Int!
    $introduce: String!
  ) {
    createProduct(
      input: {
        name: $name
        category: $category
        price: $price
        imagePasses: $imagePasses
        quantity: $quantity
        introduce: $introduce
      }
    ) {
      _id
      name
      category
      price
      quantity
      introduce
      imagePasses
      createdAt
      user {
        _id
        username
      }
    }
  }
`;
