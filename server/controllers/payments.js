const { instance } = require("../config/razorpay")
const Product = require("../models/Product")
const crypto = require("crypto")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  productEnrollmentEmail,
} = require("../mail/templates/productEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")



// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { products } = req.body
  const userId = req.user.id
  if (products.length === 0) {
    return res.json({ success: false, message: "Please Provide product ID" })
  }

  let total_amount = 0

  for (const product_id of products) {
    let product
    try {
      // Find the product by its ID
      product = await Product.findById(product_id)

      // If the product is not found, return an error
      if (!product) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the product" })
      }


      // Add the price of the product to the total amount
      total_amount += product.price
    } catch (error) {
      console.log(error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const products = req.body?.products

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !products ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollBuyer(products, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledBuyer = await User.findById(userId)

    await mailSender(
      enrolledBuyer.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledBuyer.firstName} ${enrolledBuyer.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the products
const enrollBuyer = async (products, userId, res) => {
  if (!products || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Product ID and User ID" })
  }

  for (const productId of products) {
    try {
      // Find the product and enroll the student in it
      const enrolledProduct = await Product.findOneAndUpdate(
        { _id: productId },
        { $push: { buyersOdered: userId } },
        { new: true }
      )

      if (!enrolledProduct) {
        return res
          .status(500)
          .json({ success: false, error: "Product not found" })
      }
      console.log("Updated product: ", enrolledProduct)


      // Find the student and add the product to their list of enrolled products
      const enrolledBuyer = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            products: productId,
          },
        },
        { new: true }
      )

      console.log("Enrolled Buyer: ", enrolledBuyer)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledBuyer.email,
        `Successfully Enrolled into ${enrolledProduct.productName}`,
        productEnrollmentEmail(
          enrolledProduct.productName,
          `${enrolledBuyer.firstName} ${enrolledBuyer.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log(error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}