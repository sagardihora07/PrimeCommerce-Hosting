const mongoose = require("mongoose");


const subCategorySchema = new mongoose.Schema({
    
    title: { type: String, required: true },
    
    description: { type: String },
    
    // Many-to-Many with Product
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],  
    
  },{timestamps:true}
);
 
module.exports = mongoose.model("Subcategory", subCategorySchema);