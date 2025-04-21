require("dotenv").config();
const serverless = require("serverless-http");
const connectToDatabase = require("./connectToDatabase");
const app = require("./app");

connectToDatabase()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });

module.exports = serverless(app);
