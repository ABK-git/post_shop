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

const review1Id = mongoose.Types.ObjectId();
const review2Id = mongoose.Types.ObjectId();
const review3Id = mongoose.Types.ObjectId();
const review4Id = mongoose.Types.ObjectId();
const review5Id = mongoose.Types.ObjectId();
const review6Id = mongoose.Types.ObjectId();
const review7Id = mongoose.Types.ObjectId();
const review8Id = mongoose.Types.ObjectId();
const review9Id = mongoose.Types.ObjectId();
const review10Id = mongoose.Types.ObjectId();
const review11Id = mongoose.Types.ObjectId();
const review12Id = mongoose.Types.ObjectId();
const review13Id = mongoose.Types.ObjectId();
const review14Id = mongoose.Types.ObjectId();
const review15Id = mongoose.Types.ObjectId();
const review16Id = mongoose.Types.ObjectId();
const review17Id = mongoose.Types.ObjectId();
const review18Id = mongoose.Types.ObjectId();
const review19Id = mongoose.Types.ObjectId();
const review20Id = mongoose.Types.ObjectId();
const review21Id = mongoose.Types.ObjectId();
const review22Id = mongoose.Types.ObjectId();
const review23Id = mongoose.Types.ObjectId();
const review24Id = mongoose.Types.ObjectId();
const review25Id = mongoose.Types.ObjectId();
const review26Id = mongoose.Types.ObjectId();
const review27Id = mongoose.Types.ObjectId();
const review28Id = mongoose.Types.ObjectId();

const data = {
  users: [
    {
      _id: user1Id,
      avatar: "/images/user/admin.jpg",
      email: "abiko@gmail.com",
      username: "abiko",
      products: [],
      password: "abiko",
      role: "admin",
    },
    {
      _id: user2Id,
      avatar: "/images/user/test.jpg",
      email: "test@gmail.com",
      username: "Test",
      password: "test",
    },
    {
      _id: user3Id,
      avatar: "/images/user/pe-ko.jpg",
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
      reviews: [
        review1Id,
        review2Id,
        review3Id,
        review4Id,
        review5Id,
        review6Id,
        review7Id,
        review15Id,
        review16Id,
        review17Id,
        review18Id,
        review19Id,
        review20Id,
        review21Id,
      ],
      introduce: "first product",
      imagePasses: [
        "/images/products/product1_1.jpg",
        "/images/products/product1_2.jpg",
      ],
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
      reviews: [
        review8Id,
        review9Id,
        review10Id,
        review22Id,
        review23Id,
        review24Id,
      ],
      introduce: "I will become a programer",
      imagePasses: ["/images/products/product2.jpg"],
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
      reviews: [review11Id, review25Id],
      introduce: "I am American",
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
      reviews: [review12Id, review26Id],
      introduce: "show me my portfolio",
      imagePasses: ["/images/products/product4.jpg"],
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
      reviews: [review13Id, review27Id],
      introduce: "I am Japanese",
      imagePasses: [
        "/images/products/product5-1.jpg",
        "/images/products/product5-2.jpg",
        "/images/products/product5-3.jpg",
      ],
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
      reviews: [review14Id, review28Id],
      introduce: "fake Db populate Test",
      imagePasses: ["/images/products/product7.jpg"],
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
  reviews: [
    {
      _id: review1Id,
      title: "sample-review-title1",
      content: "sample-review-content1",
      stars: 5,
      user: user1Id,
      product: product1Id,
      createdAt: product1CreatedAt,
    },
    {
      _id: review2Id,
      title: "sample-review-title2",
      content: "sample-review-content2",
      stars: 4,
      user: user2Id,
      product: product1Id,
      createdAt: product2CreatedAt,
    },
    {
      _id: review3Id,
      title: "sample-review-title3",
      content: "sample-review-content3",
      stars: 1,
      user: user3Id,
      product: product1Id,
      createdAt: product3CreatedAt,
    },
    {
      _id: review4Id,
      title: "sample-review-title4",
      content: "sample-review-content4",
      stars: 4,
      user: user1Id,
      product: product1Id,
      createdAt: product4CreatedAt,
    },
    {
      _id: review5Id,
      title: "sample-review-title5",
      content: "sample-review-content5",
      stars: 2,
      user: user2Id,
      product: product1Id,
      createdAt: product5CreatedAt,
    },
    {
      _id: review6Id,
      title: "sample-review-title6",
      content: "sample-review-content6",
      stars: 1,
      user: user3Id,
      product: product1Id,
      createdAt: product6CreatedAt,
    },
    {
      _id: review7Id,
      title: "sample-review-title7",
      content: "sample-review-content7",
      stars: 4,
      user: user1Id,
      product: product1Id,
      createdAt: product7CreatedAt,
    },
    {
      _id: review8Id,
      title: "sample-review-title8",
      content: "sample-review-content8",
      stars: 3,
      user: user1Id,
      product: product2Id,
      createdAt: product1CreatedAt,
    },
    {
      _id: review9Id,
      title: "sample-review-title9",
      content: "sample-review-content9",
      stars: 5,
      user: user2Id,
      product: product2Id,
      createdAt: product2CreatedAt,
    },
    {
      _id: review10Id,
      title: "sample-review-title10",
      content: "sample-review-content10",
      stars: 2,
      user: user3Id,
      product: product2Id,
      createdAt: product3CreatedAt,
    },
    {
      _id: review11Id,
      title: "sample-review-title11",
      content: "sample-review-content12",
      stars: 2,
      user: user1Id,
      product: product3Id,
      createdAt: product4CreatedAt,
    },
    {
      _id: review12Id,
      title: "sample-review-title13",
      content: "sample-review-content13",
      stars: 4,
      user: user2Id,
      product: product4Id,
      createdAt: product5CreatedAt,
    },
    {
      _id: review13Id,
      title: "sample-review-title14",
      content: "sample-review-content6",
      stars: 1,
      user: user3Id,
      product: product5Id,
      createdAt: product6CreatedAt,
    },
    {
      _id: review14Id,
      title: "sample-review-title19",
      content: "sample-review-content70",
      stars: 3,
      user: user1Id,
      product: product7Id,
      createdAt: product7CreatedAt,
    },
    {
      _id: review15Id,
      title: "sample-review-title1s",
      content: "sample-review-content1s",
      stars: 5,
      user: user1Id,
      product: product1Id,
      createdAt: product1CreatedAt,
    },
    {
      _id: review16Id,
      title: "sample-review-title2f",
      content: "sample-review-content2f",
      stars: 4,
      user: user2Id,
      product: product1Id,
      createdAt: product2CreatedAt,
    },
    {
      _id: review17Id,
      title: "sample-review-title3aw",
      content: "sample-review-content3ge",
      stars: 1,
      user: user3Id,
      product: product1Id,
      createdAt: product3CreatedAt,
    },
    {
      _id: review18Id,
      title: "sample-review-title4age",
      content: "sample-review-content4geaw",
      stars: 4,
      user: user1Id,
      product: product1Id,
      createdAt: product4CreatedAt,
    },
    {
      _id: review19Id,
      title: "sample-review-title5aw",
      content: "sample-review-content5gjt",
      stars: 2,
      user: user2Id,
      product: product1Id,
      createdAt: product5CreatedAt,
    },
    {
      _id: review20Id,
      title: "sample-review-title6yky",
      content: "sample-review-content6kul",
      stars: 1,
      user: user3Id,
      product: product1Id,
      createdAt: product6CreatedAt,
    },
    {
      _id: review21Id,
      title: "sample-review-title7xx",
      content: "sample-review-content7fda",
      stars: 4,
      user: user1Id,
      product: product1Id,
      createdAt: product7CreatedAt,
    },
    {
      _id: review22Id,
      title: "sample-review-title8dfg",
      content: "sample-review-content8ad",
      stars: 3,
      user: user1Id,
      product: product2Id,
      createdAt: product1CreatedAt,
    },
    {
      _id: review23Id,
      title: "sample-review-title9dag",
      content: "sample-review-content9ds",
      stars: 5,
      user: user2Id,
      product: product2Id,
      createdAt: product2CreatedAt,
    },
    {
      _id: review24Id,
      title: "sample-review-title10dh",
      content: "sample-review-content10ff",
      stars: 2,
      user: user3Id,
      product: product2Id,
      createdAt: product3CreatedAt,
    },
    {
      _id: review25Id,
      title: "sample-review-title11kk",
      content: "sample-review-content12rr",
      stars: 2,
      user: user1Id,
      product: product3Id,
      createdAt: product4CreatedAt,
    },
    {
      _id: review26Id,
      title: "sample-review-title13ii",
      content: "sample-review-content13tt",
      stars: 4,
      user: user2Id,
      product: product4Id,
      createdAt: product5CreatedAt,
    },
    {
      _id: review27Id,
      title: "sample-review-title14pp",
      content: "sample-review-content6pp",
      stars: 1,
      user: user3Id,
      product: product5Id,
      createdAt: product6CreatedAt,
    },
    {
      _id: review28Id,
      title: "sample-review-title19aa",
      content: "sample-review-content70aa",
      stars: 3,
      user: user1Id,
      product: product7Id,
      createdAt: product7CreatedAt,
    },
  ],
};

module.exports = data;
