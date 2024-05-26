const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({

  //username: { type: String, required: true, trim: true },  

  email: { type: String, required: true, trim: true },

  password: { type: String, required: true },

  firstName: { type: String, trim: true },

  lastName: { type: String, trim: true },

  address: { type: String,required: true , trim: true },

  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },

  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  approved: {type: Boolean, default: true,},

  accountType: {type: String,enum: ["Admin","Buyer","Seller"],required: true},

  token: {type: String},

  resetPasswordExpires: {type: Date},

  image: {type: String},

  
},{timestamps: true});

module.exports = mongoose.model("User",userSchema);