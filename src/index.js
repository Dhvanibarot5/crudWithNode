const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const path = require("path");
const routes = require("./route/routes");

const app = express();

require("dotenv").config();

connectDB();
app.use(express.static("public"));

const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Use routes
app.use("/", routes);

app.listen(port, () => {
  console.log(`server starts on =====> http://localhost:${port}`);
});
