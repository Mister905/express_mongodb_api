const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Customer = require("../models/Customer");

// @route GET /api/customers
router.get("/", async (req, res) => {
  try {
    const customers = await Customer.find();
    return res.send(customers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/customers/:customer_id
router.get("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customer = await Customer.findById(customer_id);
    return res.send(customer);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route GET /api/customers/company/:company_id
router.get("/company/:company_id", async (req, res) => {
  try {
    const { company_id } = req.params;
    const customers = await Customer.find({ company_id });
    return res.send(customers);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route POST /api/customers/:company_id
router.post(
  "/:company_id",
  [check("name", "Customer name is a required field").not().isEmpty()],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { company_id } = req.params;

      const { name } = req.body;

      const customer_build = new Customer({
        company: company_id,
        name,
      });

      await customer_build.save();

      return res.send(customer_build);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route PUT /api/customers/:customer_id
router.put(
  "/:customer_id",
  [check("name", "Customer name is a required field").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customer_id } = req.params;

    const { name } = req.body;

    try {
      let updated_customer = await Customer.findOneAndUpdate(
        { _id: customer_id },
        {
          name,
        },
        { new: true }
      );
      return res.send(updated_customer);
    } catch (error) {
      console.log(error.message);
      return res.status(500).send("Server Error");
    }
  }
);

// @route DELETE /api/customers/customer_id
router.delete("/:customer_id", async (req, res) => {
  try {
    const { customer_id } = req.params;

    await Customer.remove({ _id: customer_id });

    return res.send("Customer deleted");
  } catch (error) {
    console.log(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
