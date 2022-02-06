const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    
  name: {
    type: String,
  },

  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("companies", CompanySchema);
