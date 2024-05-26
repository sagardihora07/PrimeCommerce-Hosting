import { combineReducers } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice"
import productReducer from "../slices/productSlice"
import profileReducer from "../slices/profileSlice"
import viewProductReducer from "../slices/viewProductSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    product: productReducer,
    cart: cartReducer,
    viewProduct: viewProductReducer
})

export default rootReducer