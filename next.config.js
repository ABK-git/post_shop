// module.exports = {
//   typescript: {
//     ignoreBuildErrors: true
//   }
// };

//localか本番環境か否か(localでtrue)
const dev = process.env.NODE_ENV !== "production";

module.exports = {
  env: {
    BASE_URL: dev
      ? "http://localhost:3000/graphql"
      //: "https://post-shop1.herokuapp.com/graphql",
      : process.env.VERCEL_URL+"/graphql"
  },
};
