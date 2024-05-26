// Import the required modules
const express = require("express")
const router = express.Router()
const {
  capturePayment,
  // verifySignature,
  verifyPayment,
  sendPaymentSuccessEmail,
} = require("../controllers/payments")
const { auth, isSeller, isBuyer, isAdmin } = require("../middlewares/auth")
router.post("/capturePayment", auth, isBuyer, capturePayment)
router.post("/verifyPayment", auth, isBuyer, verifyPayment)
router.post(
  "/sendPaymentSuccessEmail",
  auth,
  isBuyer,
  sendPaymentSuccessEmail
)
// router.post("/verifySignature", verifySignature)

module.exports = router
