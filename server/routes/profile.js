const express = require("express")
const router = express.Router()
const { auth, isSeller } = require("../middlewares/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,
  getEnrolledProducts,
  sellerDashboard,
} = require("../controllers/profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
// Delet User Account
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)
// Get Enrolled Products
router.get("/getEnrolledProducts", auth, getEnrolledProducts)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.get("/sellerDashboard", auth, isSeller, sellerDashboard)

module.exports = router
