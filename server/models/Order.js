const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    // Many-to-One with User
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  

    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }], 

    totalPrice: { type: Number, required: true },

    status: { type: String, required: true },

  },{timestamps:true}
);

module.exports = mongoose.model("Order", orderSchema);
