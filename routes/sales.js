const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Sale = require("../models/Sale");

// @route GET /api/sales/:product_id
router.get("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;
    const sales = await Sale.find({ product_id });
    return res.send(sales);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/sales/:sale_id
router.get("/:sale_id", async (req, res) => {
  try {
    const { sale_id } = req.params;
    const sale = await Sale.findById(sale_id);
    return res.send(sale);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/sales/:product_id
router.post("/:product_id", async (req, res) => {
  try {
    const { product_id } = req.params;

    const sale_build = new Sale({
      product: product_id,
    });

    await sale_build.save();

    return res.send(sale_build);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route DELETE /api/sales/:sale_id
router.delete("/:sale_id", async (req, res) => {
  try {
    const { sale_id } = req.params;

    await Sale.remove({ _id: sale_id });

    return res.send("Sale deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
