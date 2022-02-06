const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("sales", SaleSchema);
