const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRoutes = require("./routes/posts.routes.js");
const CORS_Middleware = require("./middlewares/cross-origin-resource-sharing.js");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoose connected ");
  })
  .catch((err) => {
    console.log(` an error occured : ${err}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(CORS_Middleware);
// ----------------------------- BOUNDARY ---------------------------------//

app.use("/api/posts", postRoutes);
module.exports = app;
