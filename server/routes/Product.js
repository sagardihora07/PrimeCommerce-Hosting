const express = require("express");
const router = express.Router();


//product controller import
const {
    createProduct,
    editProduct,
    getAllProducts,
    getProductDetails,
    getSellerProducts,
    deleteProducts
} = require("../controllers/Product")

//rating controllers
const {
    createRating,
    getAverageRating,
    getAllRatingReview,
} = require("../controllers/RatingandReview")

//categories controllers
const {
    showAllCategories,
    createCategory,
    categoryPageDetails
} = require("../controllers/Category");

//subcategory controllers
const {
    createSubCategory,
    deleteSubCategory,
    subCategoryPageDetails,
    showAllSubCategories
} = require("../controllers/Subcategory");

//importing middleware 
const { auth, isSeller, isBuyer, isAdmin } = require("../middlewares/auth");




//procuct can only created by seller
router.post("/createProduct", auth, isSeller, createProduct)
//edit Product route
router.post("/editProduct", auth, isSeller, editProduct)
//get all product from specified Seller
router.get("/getSellerProducts", auth, isSeller, getSellerProducts)
//get all registred Products
router.get("/getAllProducts", getAllProducts)
//get detail of specific product
router.post("/getProductDetails", getProductDetails)
//delete product
router.delete("/deleteProduct", deleteProducts)

//category only admin can create
router.post("/createCategory",auth, isAdmin, createCategory)
router.post("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)


//SubCategory only admin can create
router.post("/showAllSubCategories",showAllSubCategories)
router.post("/createSubCategory" , auth , isAdmin, createSubCategory);
router.post("/deleteSubCategory", deleteSubCategory, isAdmin);
router.post("/getSubCategoryPageDetails", subCategoryPageDetails);

//rating and review route
router.post("/createRating", auth, isBuyer, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingReview)

module.exports = router
