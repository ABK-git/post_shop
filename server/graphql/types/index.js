exports.userTypes = `
  type User {
    _id: ID
    avatar: String
    username: String
    email: String
    password: String
    products: [Product]
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
    questions: [Question],
    reviews: [Review],
    introduce: String,
    imagePasses: [String],
    user: User,
    createdAt: String
  }

  input ProductCreateInput{
    name: String!,
    category: String!,
    price: Int!,
    quantity: Int!,
    imagePasses: [String],
    introduce: String!,
  }

  input ProductUpdateInput{
    id: ID!
    name: String!,
    category: String!,
    price: Int!,
    quantity: Int!,
    imagePasses: [String],
    introduce: String!,
  }
`;

exports.questionTypes = `
  type Question {
    _id: ID,
    title: String,
    content: String,
    product: Product,
    replies: [Reply],
    user: User,
    createdAt: String,
  }

  input QuestionCreateInput{
    title: String,
    content: String,
    product: ID
  }
`;

exports.replyTypes = `
  type Reply {
    _id: ID,
    content: String,
    user: User,
    question: ID,
    createdAt: String,
  }

  input ReplyCreateInput{
    content: String!,
    question: ID!,
  }
`;

exports.reviewTypes = `
  type Review {
    _id: ID,
    title: String,
    content: String,
    stars: Int,
    user: User,
    product: Product,
    createdAt: String,
  }

  input ReviewCreateInput{
    title: String!,
    content: String!,
    stars: Int!
    product: ID!
  }
`;

exports.orderTypes = `
  type Order{
    _id: ID,
    user: User,
    product: Product,
    quantity: Int,
    createdAt: String,
    updatedAt: String,
    ordered: Boolean,
  }

  input OrderCreateInput{
    product: ID!
  }

  input SettlementMaximumInput{
    id: ID!
    quantity: Int!
  }
`;
