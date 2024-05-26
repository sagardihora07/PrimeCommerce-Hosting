const mongoose = require("mongoose")


const productSchema = new mongoose.Schema({
  
    productName: { type: String, required: true, trim: true },

    productDescription: { type: String,requied: true, trim: true },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    thumbnail: {
      type: String,   
    },
    
    price: { type: Number, required: true },

    stockQuantity: { type: Number, required: true },

    buyersOdered: [
      {
        type: mongoose.Schema.Types.ObjectId,
      
        ref: "User",
      }
    ],

    // Many-to-Many with Category
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], 
    
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],

    // Many-to-Many with Brand
    brands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Brand' }], 

    // One-to-Many with Review
    ratingAndReviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'RatingAndReview' }],  

    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
    warranty: {
      type: String,
    }

    
  },{timestamps: true}
);

module.exports = mongoose.model("Product", productSchema);