const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");

//localか本番環境か否か(localでtrue)
const dev = process.env.NODE_ENV !== "production";

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com","localhost"],
  },
  env: {
    BASE_URL: dev
      ? "http://localhost:3000/graphql"
      : "https://post-shop1.herokuapp.com/graphql",
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
