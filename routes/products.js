const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Product = require("../models/Product");

// @route GET /api/products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.send(products);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/products/:product_id
router.get("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const product = await Product.findById(product_id);
    return res.send(product);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/products/company/:company_id
router.get("/company/:company_id", async (req, res) => {
  try {
    const { company_id } = req.params;
    const products = await Product.find({ company_id });
    return res.send(products);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/products/:company_id
router.post(
  "/:company_id",
  [check("name", "Product name is a required field").not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { company_id } = req.params;

      const { name } = req.body;

      const product_build = new Product({
        company: company_id,
        name,
      });

      await product_build.save();

      return res.send(product_build);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/products/:product_id
router.put(
  "/:product_id",
  [check("name", "Product name is a required field").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { product_id } = req.params;

    const { name } = req.body;

    try {
      let updated_product = await Product.findOneAndUpdate(
        { _id: product_id },
        {
          name,
        },
        { new: true }
      );
      return res.send(updated_product);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /api/products/product_id
router.delete("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;

    await Product.remove({ _id: product_id });

    return res.send("Product deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
