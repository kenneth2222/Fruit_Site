const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },

  lastname: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  town: {
    type: String,
    required: true,
  },

  postcode: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
  
  isAdmin: {
    type: Boolean,
    default: false,
  },

  dateCreated: {
    type: Date,
    default: () => {
      const date = new Date();
      return date.toISOString();
    },
  },
});
const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
