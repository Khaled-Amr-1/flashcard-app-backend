require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error));

// Export the app as a serverless function for Vercel
const serverless = require("serverless-http");
module.exports = serverless(app);
