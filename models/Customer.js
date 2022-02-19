const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },

  name: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("customers", CustomerSchema);
