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
