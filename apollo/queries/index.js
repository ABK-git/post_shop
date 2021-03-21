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
export const UPDATE_USER = gql`
  mutation UpdateUser(
    $avatar: String
    $username: String!
    $email: String!
    $password: String!
    $password_confirm: String!
  ) {
    updateUser(
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
      products {
        _id
        name
        category
        price
        quantity
        imagePasses
        introduce
        createdAt
      }
    }
  }
`;
export const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      _id
      avatar
      username
      email
      password
      products {
        _id
        name
        category
        price
        quantity
        imagePasses
        introduce
        createdAt
      }
    }
  }
`;
export const GET_USER = gql`
  query User {
    user {
      _id
      avatar
      username
      email
      password
      products {
        _id
        name
        category
        price
        quantity
        imagePasses
        introduce
        createdAt
      }
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
export const GET_PRODUCT = gql`
  query Product($id: ID) {
    product(id: $id) {
      _id
      name
      category
      categories @client
      price
      quantity
      reviews {
        _id
        title
        content
        stars
        createdAt
        user {
          _id
          avatar
          username
        }
      }
      questions {
        _id
        title
        content
        createdAt
        user {
          _id
          avatar
          username
        }
        replies {
          _id
          content
          createdAt
          user {
            _id
            avatar
            username
          }
        }
      }
      introduce
      imagePasses
      createdAt
      user {
        _id
        avatar
        username
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query Products {
    products {
      _id
      name
      category
      categories @client
      price
      quantity
      reviews {
        _id
        title
        content
        stars
        createdAt
        user {
          _id
          avatar
          username
        }
      }
      imagePasses
      introduce
      createdAt
      user {
        _id
        avatar
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
      reviews {
        _id
        title
        content
        stars
        createdAt
        user {
          _id
          avatar
          username
        }
      }
      questions {
        _id
        title
        content
        createdAt
        user {
          _id
          avatar
          username
        }
        replies {
          _id
          content
          createdAt
          user {
            _id
            avatar
            username
          }
        }
      }
      introduce
      imagePasses
      createdAt
      user {
        _id
        avatar
        username
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $content: String!, $product: ID!) {
    createQuestion(
      input: { title: $title, content: $content, product: $product }
    ) {
      _id
      title
      content
      createdAt
      user {
        _id
        avatar
        username
      }
      product {
        _id
      }
      replies {
        _id
        content
        createdAt
        user {
          _id
          avatar
          username
        }
      }
    }
  }
`;

export const GET_QUESTION = gql`
  query Question($id: ID) {
    question(id: $id) {
      _id
      title
      content
      createdAt
      product {
        _id
      }
      user {
        _id
        username
        avatar
      }
      replies {
        _id
        content
        createdAt
        user {
          _id
          username
          avatar
        }
      }
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation CreateReply($content: String!, $question: ID!) {
    createReply(input: { content: $content, question: $question }) {
      _id
      content
      createdAt
      user {
        _id
        username
        avatar
      }
      question
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview(
    $title: String!
    $content: String!
    $stars: Int!
    $product: ID!
  ) {
    createReview(
      input: {
        title: $title
        content: $content
        stars: $stars
        product: $product
      }
    ) {
      _id
      title
      content
      stars
      createdAt
      user {
        _id
        username
        avatar
      }
      product {
        _id
      }
    }
  }
`;

//OrderのQuery
export const USERS_CART = gql`
  query UsersCart {
    usersCart {
      _id
      user {
        _id
        username
        avatar
      }
      product {
        _id
        name
        quantity
        price
        imagePasses
        user {
          _id
          username
          avatar
        }
      }
      quantity
      ordered
      adminChecked
      createdAt
      updatedAt
    }
  }
`;

//OrderのMutation
export const CREATE_ORDER = gql`
  mutation CreateOrder($product: ID!) {
    createOrder(input: { product: $product }) {
      _id
      user {
        _id
        username
        avatar
      }
      product {
        _id
        name
        quantity
        price
        imagePasses
        user {
          _id
          username
          avatar
        }
      }
      quantity
      ordered
      adminChecked
      createdAt
      updatedAt
    }
  }
`;

export const PLUS_ORDER_QUANTITY = gql`
  mutation PlusQuantity($id: ID) {
    plusQuantity(id: $id) {
      _id
      user {
        _id
        username
        avatar
      }
      product {
        _id
        name
        quantity
        price
        imagePasses
        user {
          _id
          username
          avatar
        }
      }
      quantity
      ordered
      adminChecked
      createdAt
      updatedAt
    }
  }
`;

export const MINUS_ORDER_QUANTITY = gql`
  mutation MinusQuantity($id: ID) {
    minusQuantity(id: $id) {
      _id
      user {
        _id
        username
        avatar
      }
      product {
        _id
        name
        quantity
        price
        imagePasses
        user {
          _id
          username
          avatar
        }
      }
      quantity
      ordered
      adminChecked
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID) {
    deleteOrder(id: $id)
  }
`;

export const SETTLEMENT_MAXIMUM_ORDER = gql`
  mutation SettlementMaximum ($id: ID!, $quantity: Int!) {
    settlementMaximum(input: { id: $id, quantity: $quantity }) {
      _id
      user {
        _id
        username
        avatar
      }
      product {
        _id
        name
        quantity
        price
        imagePasses
        user {
          _id
          username
          avatar
        }
      }
      quantity
      ordered
      adminChecked
      createdAt
      updatedAt
    }
  }
`;

export const SETTLEMENT_ORDER = gql`
  mutation Settlement($id: ID) {
    settlement(id: $id) {
      _id
      user {
        _id
        username
        avatar
      }
      product {
        _id
        name
        quantity
        price
        imagePasses
        user {
          _id
          username
          avatar
        }
      }
      quantity
      ordered
      adminChecked
      createdAt
      updatedAt
    }
  }
`;
