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

const companies = require("./routes/companies");
app.use("/api/companies", companies);

const customers = require("./routes/customers");
app.use("/api/customers", customers);

const products = require("./routes/products");
app.use("/api/products", products);

const sales = require("./routes/sales");
app.use("/api/sales", sales);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
