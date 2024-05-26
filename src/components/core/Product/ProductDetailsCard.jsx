import React, { useEffect, useState } from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

// const CourseIncludes = [
//   "8 hours on-demand video",
//   "Full Lifetime access",
//   "Access on Mobile and TV",
//   "Certificate of completion",
// ]

function ProductDetailsCard({ product, setConfirmationModal, handleBuyProduct }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  

  // const {
  //   thumbnail: ThumbnailImage,
  //   price: CurrentPrice,
  //   _id: productId,
  // } = product

  

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.SELLER) {
      toast.error("You are an seller. You can't buy a product.")
      return
    }
    if (token) {
      dispatch(addToCart(product))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }


  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        <img
          src={product?.thumbnail}
          alt={product?.productName}
          className="min-h-[180px] overflow-hidden lg:rounded-2xl object-contain"
        />

        <div className="px-4">
          <div className="space-x-3 pb-4 text-3xl font-semibold">
            Rs. {product?.price}
          </div>
          <div className="flex flex-col gap-4">
            <button
              className="yellowButton"
              onClick={
                user && product?.buyersOdered.includes(user?._id)
                  ? () => navigate("/dashboard/enrolled-products")
                  : handleBuyProduct
              }
            >
              {user && product?.buyersOdered.includes(user?._id)
                ? "Go To Products"
                : "Buy Now"}
            </button>
            {(!user || !product?.buyersOdered.includes(user?._id)) && (
              <button onClick={handleAddToCart} className="blackButton">
                Add to Cart
              </button>
            )}
          </div>
          <div>
            <p className="pb-3 pt-6 text-center text-sm text-richblack-25">
            7 Days Service Center Replacement
            </p>
          </div>

          
          <div className="text-center">
            <button
              className="mx-auto flex items-center gap-2 py-6 text-blue-100 "
              onClick={handleShare}
            >
              <FaShareSquare size={15} /> Share
            </button>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default ProductDetailsCard

        
       