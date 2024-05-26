import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ConfirmationModal from '../components/comman/ConfirmationModal'
import { fetchProductDetails } from '../services/operations/productDetailsAPI'
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { TbTrendingUp } from "react-icons/tb"
import RatingStars from '../components/comman/RatingStars'
import { formatDate } from '../utils/formatDate'
import { BuyCourse } from "../services/operations/buyerFeaturesAPI"
import GetAvgRating from '../utils/avgRating'
import Error from './Error'
import ProductDetailsCard from '../components/core/Product/ProductDetailsCard'
import { addToCart } from '../slices/cartSlice'
import toast from 'react-hot-toast'
import { ACCOUNT_TYPE } from '../utils/constants'
import {
  setEntireProductData,
} from "../slices/viewProductSlice"
import ProductReviewModal from '../components/core/Product/ProductReviewModal'
import IconBtn from "../components/comman/IconBtn"

export default function ProductDetails(){

    const {user} = useSelector((state) => state.profile)
    const { token } = useSelector((state) => state.auth)
    const { loading } = useSelector((state) => state.profile)
    const { paymentLoading } = useSelector((state) => state.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [reviewModal, setReviewModal] = useState(false)


    //getting productId from params
    const { productId } = useParams()

    //declare state to save product state
    const [response, setResponse] = useState(null)
    const [confirmationModal, setConfirmationModal] = useState(null)

    useEffect(() => {
      ;(async () => {
        try{
          const productData = await fetchProductDetails(productId);
          dispatch(setEntireProductData(productData?.data?.productDetails));
        } catch(error) {
          console.log(error);
          console.log("Can't get product entire data")
        }
      })()
    },[])

    useEffect(() => {
        ;(async () => {
            try{
                const res = await fetchProductDetails(productId)
                setResponse(res)
            } catch(error) {
                console.log("Could not fetch product details")
            }
        })()
    },[productId])
    console.log(response)

    const [avgReviewCount, setAvgReviewCount] = useState(0)
    useEffect(() => {
        const count = GetAvgRating(response?.data?.productDetails?.ratingAndReviews)
        setAvgReviewCount(count)
    }, [response])
    

    const [isActive, setIsActive] = useState(Array(0))
    const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
        )
    }

    if (loading || !response) {
        return (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
        </div>
        )
     }
    if (!response.success) {
        return <Error />
    }

    const {
        _id: product_id,
        productName,
        productDescription,
        price,
        warranty,
        thumbnail,
        stockQuantity,
        ratingAndReviews,
        buyersOdered,
        createdAt
    } = response?.data?.productDetails

    const handleAddToCart = () => {
      if (user && user?.accountType === ACCOUNT_TYPE.SELLER) {
        toast.error("You are an seller. You can't buy a product.")
        return
      }
      if (token) {
        dispatch(addToCart(response?.data?.productDetails))
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

    const handleBuyProduct  = () => {
        if(token) {
            BuyCourse(token, [productId], user, navigate, dispatch)
            return
        }
        setConfirmationModal({
            text1: "You are not logged in!",
            text2: "Please login to Purchase Product.",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null),
        })
    }

    if (paymentLoading) {
        // console.log("payment loading")
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

      return (
        <>
          <div className="relative w-full h-full md:h-[800px] bg-richblack-800">
            {/* Hero Section */}
            <div className="mx-auto box-content px-4 lg:w-[1000px] 2xl:relative">
              <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-2 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
               
                  <div className="relative block max-h-[30rem] lg:hidden">
                    <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
                    <img
                      src={thumbnail}
                      alt="course thumbnail"
                      className="aspect-auto  mt-[10px] w-[350px] h-[400px] object-cover"
                    />
                  </div>
                  <div className="z-30 my-1 flex flex-col justify-center gap-3 py-5 text-md text-richblack-5">
                    <div className='flex flex-col gap-4'>
                      <p className="text-2xl font-bold text-richblack-5 sm:text-[42px]">
                        {productName}
                      </p>
                      <p className="space-x-3  text-3xl font-semibold text-richblack-5">
                         Rs. {price}
                      </p>
                    </div>
                    <p className="text-richblack-200">{productDescription}</p>
                    <div className="text-md flex flex-wrap items-center gap-2">
                      <span className="text-yellow-25">{avgReviewCount}</span>
                      <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                      <span>{`(${ratingAndReviews.length} reviews)`}</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='text-green-500 text-2xl'><TbTrendingUp /></div>
                      <span>{`${buyersOdered.length}+ People ordered this product`}</span>
                    </div>
           
                      <p>Stock quantity: {stockQuantity}</p>
                      <p>{warranty} from the Date of Purchase</p>
                  
                   
                    <div className="flex flex-wrap text-l">
                      <p className="flex items-center">
                        <BiInfoCircle /> Created at {formatDate(createdAt)}
                      </p>
                    </div>
                  </div>
                
                <div className="flex flex-col items-center  gap-5 border-y border-y-richblack-500 py-4 lg:hidden">
                <div className="flex flex-col gap-4">
                  <button
                    className="yellowButton"
                    onClick={
                      user && response?.data?.productDetails?.buyersOdered.includes(user?._id)
                        ? () => navigate("/dashboard/enrolled-products")
                        : handleBuyProduct
                    }
                  >
                    {user && response?.data?.productDetails?.buyersOdered.includes(user?._id)
                      ? "Go To Products"
                      : "Buy Now"}
                  </button>
                  {(!user || !response?.data?.productDetails?.buyersOdered.includes(user?._id)) && (
                    <button onClick={handleAddToCart} className="blackButton">
                      Add to Cart
                    </button>
                  )}
                </div>
                  <div className=''>
                    {(response?.data?.productDetails?.buyersOdered.includes(user?._id)) &&(
                    <IconBtn
                      text="Add Review"
                      customClasses="h-[40px] "
                      onclick={() => setReviewModal(true)}
                    />
                  )}
                  </div>
                </div>
              </div>
              {/* Product Card */}
              <div className="right-[1rem] flex-col top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
                <ProductDetailsCard
                product={response?.data?.productDetails}
                setConfirmationModal={setConfirmationModal}
                handleBuyCourse={handleBuyProduct}
                />
                <div className='flex items-center justify-center mt-[30px]'>
                {(response?.data?.productDetails?.buyersOdered.includes(user?._id)) &&(
                  <IconBtn
                    text="Add Review"
                    customClasses="h-[40px] "
                    onclick={() => setReviewModal(true)}
                  />
                )}
                </div>
              </div>
          </div>
          </div>
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
          {reviewModal && <ProductReviewModal setReviewModal={setReviewModal} />}
        </>
      );
      
}

