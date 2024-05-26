const mongoose = require("mogoose");


const brandSchema = new mongoose.Schema({
   
    name: { type: String, required: true },
   
    description: { type: String },
   
    // Many-to-Many with Product
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }], 
   
  });


  module.exports = mongoose.model("Brand", brandSchema);