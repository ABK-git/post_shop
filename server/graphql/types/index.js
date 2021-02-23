exports.userTypes = `
  type User {
    _id: ID
    avatar: String
    username: String
    email: String
    password: String
    role: String
  }

  input SignUpInput{
    avatar: String
    username: String!
    email: String!
    password: String!
    password_confirm: String
  }

  input SignInInput{
    email: String!
    password: String!
  }
`;

exports.productTypes = `
  type Product{
    _id: ID,
    name: String,
    category: String,
    price: Int,
    quantity: Int,
    introduce: String,
    user: User,
    createdAt: String
  }

  input ProductCreateInput{
    name: String!,
    category: String!,
    price: Int!,
    quantity: Int!,
    introduce: String!,
  }
`;
