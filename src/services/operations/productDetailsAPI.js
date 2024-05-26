import { toast } from "react-hot-toast";

import { apiConnector } from "../apiConnector";
import { productEndpoints } from "../apis";

const {
    GET_ALL_PRODUCT_API,
    PRODUCT_DETAILS_API,
    EDIT_PRODUCT_API,
    PRODUCT_CATEGORIES_API,
    CREATE_PRODUCT_API,
    GET_ALL_SELLER_PRODUCTS_API,
    DELETE_PRODUCT_API,
    CREATE_RATING_API
} = productEndpoints

export const getAllProducts = async () => {
    const toastId = toast.loading("Loading...")
    let result = []
    try{

        const response = await apiConnector("GET", GET_ALL_PRODUCT_API)
        if(!response?.data?.success) {
            throw new Error("Could not fetch Product Details")
        }
        result = response?.data?.data

    }
    catch(error) {
        console.log("GET_ALL_PRODUCT_API ERROR....", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchProductDetails = async(productId) => {
    const toastId = toast.loading("Loading...")
    let result = null
    try{

        const response = await apiConnector("POST", PRODUCT_DETAILS_API, {
            productId,
        })
        console.log("PRODUCT_DETAILS_API RESPONSE ",response)
        if(!response?.data?.success){
            throw new Error(response.data.message)
        }
        result = response.data

    } catch(error) {
        console.log("PRODUCT DETAILS API ERROR....")
        result = error.response.data
    }
    toast.dismiss(toastId)
    return result 
}

//fetching available product category
export const fetchProductCategories = async () => {
    let result = []
    try {

        const response = await apiConnector("POST", PRODUCT_CATEGORIES_API)
        console.log("PRODUCT_CATEGORIES_API RESPONSE....", response)
        if(!response?.data?.success) {
            throw new Error("Could not fetch product categories")
        }
        result = response?.data?.data

    } catch(error) {
        console.log("PRODUCT_CATEGORY_API ERROR...", error)
        toast.error(error.message)
    }
    return result
}

//add product details 
export const addProductDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("POST", CREATE_PRODUCT_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_PRODUCT_API RESPONSE", response)
        if(!response?.data?.success) {
            throw new Error("Could not create product")
        }
        toast.success("Product details added successfully")
        result = response?.data?.data

    } catch(error) {
        console.log("CREATE_PRODUCT_API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
    
}

//edit product details 
export const editProductDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("POST", EDIT_PRODUCT_API,data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("EDIT PRODUCT API RESPONSE",response)
        if(!response?.data?.success) {
            throw new Error("Could not update product details")
        }
        toast.success("product details updated successfully")
        result = response?.data?.data

    } catch(error) {
        console.log("EDIT PRODUCT DETAILS API ERROR", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

//fetch all products under a specific seller 
export const fetchSellerProducts = async (token) => {
    let result = []
    const toastId = toast.loading("Loading...")
    try{

        const response = await apiConnector("GET",GET_ALL_SELLER_PRODUCTS_API,null,{
            Authorization: `Bearer ${token}`,
        })
        console.log("SELLER_PRODUCTS_API RESPONSE",response)
        if(!response?.data?.success) {
            throw new Error("Could not fetch seller products")
        }
        result = response?.data?.data

    } catch(error) {
        console.log("SELLER_PRODUCTS_API ERROR....",error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// delete a product
export const deleteProduct = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("DELETE", DELETE_PRODUCT_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE PRODUCT API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Delete Product")
      }
      toast.success("Product Deleted")
    } catch (error) {
      console.log("DELETE PRODUCT API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
  }

  // create a rating for product
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...")
    let success = false
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("CREATE RATING API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating")
      }
      toast.success("Rating Created")
      success = true
    } catch (error) {
      success = false
      console.log("CREATE RATING API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return success
  }