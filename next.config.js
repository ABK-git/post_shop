const withPlugins = require("next-compose-plugins");
const withImages = require("next-images");
const cloudinary = require("./cloudinary");

require("dotenv").config();
//localか本番環境か否か(localでtrue)
const dev = process.env.NODE_ENV !== "production";

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "localhost"],
  },
  env: {
    BASE_URL: dev
      ? "http://localhost:3000/graphql"
      : "https://post-shop1.herokuapp.com/graphql",
    UPLOAD_IMAGE_URL: dev
      ? cloudinary.CLOUDINARY_UPLOAD_IMAGE_URL
      : process.env.CLOUDINARY_UPLOAD_IMAGE_URL,
    UPLOAD_PRESET: dev
      ? cloudinary.CLOUDINARY_UPLOAD_PRESET
      : process.env.CLOUDINARY_UPLOAD_PRESET,
  },
};

module.exports = withPlugins([[withImages]], nextConfig);
