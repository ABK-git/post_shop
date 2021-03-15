const mongoose = require("mongoose");
const moment = require("moment");

const user1Id = mongoose.Types.ObjectId();
const user2Id = mongoose.Types.ObjectId();
const user3Id = mongoose.Types.ObjectId();

const product1Id = mongoose.Types.ObjectId();
const product2Id = mongoose.Types.ObjectId();
const product3Id = mongoose.Types.ObjectId();
const product4Id = mongoose.Types.ObjectId();
const product5Id = mongoose.Types.ObjectId();
const product6Id = mongoose.Types.ObjectId();
const product7Id = mongoose.Types.ObjectId();

const product1CreatedAt = moment().subtract(300, "days");
const product2CreatedAt = moment(product1CreatedAt).add(10, "days");
const product3CreatedAt = moment(product2CreatedAt).add(10, "days");
const product4CreatedAt = moment(product3CreatedAt).add(10, "days");
const product5CreatedAt = moment(product4CreatedAt).add(10, "days");
const product6CreatedAt = moment(product5CreatedAt).add(10, "days");
const product7CreatedAt = moment(product6CreatedAt).add(10, "days");

const question1Id = mongoose.Types.ObjectId();
const question2Id = mongoose.Types.ObjectId();
const question3Id = mongoose.Types.ObjectId();
const question4Id = mongoose.Types.ObjectId();
const question5Id = mongoose.Types.ObjectId();
const question6Id = mongoose.Types.ObjectId();
const question7Id = mongoose.Types.ObjectId();
const question8Id = mongoose.Types.ObjectId();
const question9Id = mongoose.Types.ObjectId();
const question10Id = mongoose.Types.ObjectId();
const question11Id = mongoose.Types.ObjectId();
const question12Id = mongoose.Types.ObjectId();
const question13Id = mongoose.Types.ObjectId();
const question14Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar: "",
      email: "abiko@gmail.com",
      username: "abiko",
      password: "abiko",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar: "",
      email: "test@gmail.com",
      username: "Test",
      password: "test",
    },
    {
      _id: user3Id,
      avatar: "",
      email: "aaaa@gmail.com",
      username: "aaaa",
      password: "aaaa",
    },
  ],
  products: [
    {
      _id: product1Id,
      name: "Sample1",
      category: "aaaa",
      price: 100,
      quantity: 10,
      questions: [question1Id, question2Id],
      reviews: [],
      introduce: "first product",
      imagePasses: [],
      user: user1Id,
      createdAt: product1CreatedAt,
    },
    {
      _id: product2Id,
      name: "Sample2",
      category: "bbbb",
      price: 100,
      quantity: 1,
      questions: [],
      reviews: [],
      introduce: "I will become a programer",
      imagePasses: [],
      user: user1Id,
      createdAt: product2CreatedAt,
    },
    {
      _id: product3Id,
      name: "Sample3",
      category: "cccc",
      price: 9000,
      quantity: 5,
      questions: [question3Id, question4Id, question5Id],
      reviews: [],
      introduce: "I am champion !!!",
      imagePasses: [],
      user: user2Id,
      createdAt: product3CreatedAt,
    },
    {
      _id: product4Id,
      name: "Sample4",
      category: "aaaa",
      price: 100900,
      quantity: 7,
      questions: [question6Id],
      reviews: [],
      introduce: "shadou garden",
      imagePasses: [],
      user: user1Id,
      createdAt: product4CreatedAt,
    },
    {
      _id: product5Id,
      name: "Sample5",
      category: "bbbb",
      price: 1500,
      quantity: 2,
      questions: [question7Id, question8Id],
      reviews: [],
      introduce: "I am atomik!!!",
      imagePasses: [],
      user: user3Id,
      createdAt: product5CreatedAt,
    },
    {
      _id: product6Id,
      name: "Sample6",
      category: "aa",
      price: 1000,
      quantity: 4,
      questions: [question9Id, question10Id, question11Id, question12Id],
      reviews: [],
      introduce: "you are failure",
      imagePasses: [],
      user: user1Id,
      createdAt: product6CreatedAt,
    },
    {
      _id: product7Id,
      name: "Sample7",
      category: "cccc",
      price: 10000,
      quantity: 18,
      questions: [question13Id, question14Id],
      reviews: [],
      introduce: "fake Db populate Test",
      imagePasses: [],
      user: user2Id,
      createdAt: product7CreatedAt,
    },
  ],
  questions: [
    {
      _id: question1Id,
      title: "sample-question-1",
      content: "sample-question-content-1",
      product: product1Id,
      user: user2Id,
      replies: [],
      createdAt: product1CreatedAt,
    },
    {
      _id: question2Id,
      title: "sample-question-2",
      content: "sample-question-content-2",
      product: product1Id,
      user: user1Id,
      replies: [],
      createdAt: product2CreatedAt,
    },
    {
      _id: question3Id,
      title: "sample-question-3",
      content: "sample-question-content-3",
      product: product2Id,
      user: user1Id,
      replies: [],
      createdAt: product3CreatedAt,
    },
    {
      _id: question4Id,
      title: "sample-question-4",
      content: "sample-question-content-4",
      product: product2Id,
      user: user1Id,
      replies: [],
      createdAt: product4CreatedAt,
    },
    {
      _id: question5Id,
      title: "sample-question-5",
      content: "sample-question-content-6",
      product: product3Id,
      user: user1Id,
      replies: [],
      createdAt: product5CreatedAt,
    },
    {
      _id: question6Id,
      title: "sample-question-7",
      content: "sample-question-content-7",
      product: product6Id,
      user: user3Id,
      replies: [],
      createdAt: product6CreatedAt,
    },
    {
      _id: question7Id,
      title: "sample-question-8",
      content: "sample-question-content-8",
      product: product3Id,
      user: user2Id,
      replies: [],
      createdAt: product1CreatedAt,
    },
    {
      _id: question8Id,
      title: "sample-question-9",
      content: "sample-question-content-9",
      product: product4Id,
      user: user2Id,
      replies: [],
      createdAt: product7CreatedAt,
    },
    {
      _id: question9Id,
      title: "sample-question-10",
      content: "sample-question-content-10",
      product: product4Id,
      user: user2Id,
      replies: [],
      createdAt: product1CreatedAt,
    },
    {
      _id: question10Id,
      title: "sample-question-11",
      content: "sample-question-content-11",
      product: product4Id,
      user: user3Id,
      replies: [],
      createdAt: product2CreatedAt,
    },
    {
      _id: question11Id,
      title: "sample-question-12",
      content: "sample-question-content-12",
      product: product4Id,
      user: user3Id,
      replies: [],
      createdAt: product3CreatedAt,
    },
    {
      _id: question12Id,
      title: "sample-question-13",
      content: "sample-question-content-13",
      product: product5Id,
      user: user3Id,
      replies: [],
      createdAt: product4CreatedAt,
    },
    {
      _id: question13Id,
      title: "sample-question-14",
      content: "sample-question-content-14",
      product: product6Id,
      user: user3Id,
      replies: [],
      createdAt: product5CreatedAt,
    },
    {
      _id: question14Id,
      title: "sample-question-1",
      content: "sample-question-content-1",
      product: product1Id,
      user: user3Id,
      replies: [],
      createdAt: product6CreatedAt,
    },
  ],
};

module.exports = data;
