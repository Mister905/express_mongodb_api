const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const app = express();
app.use(express.json());

mongoose
  .connect(keys.mongo_connection_string, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log("Error on start: " + err.stack));

// ROUTES

const company = require("./routes/company");
app.use("/api/company", company);

const customer = require("./routes/customer");
app.use("/api/customer", customer);

const product = require("./routes/product");
app.use("/api/product", product);

const sale = require("./routes/sale");
app.use("/api/sale", sale);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
