import React, { useEffect, useState } from 'react'
import { getUserEnrolledProducts } from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const EnrolledProducts = () => {
    const { token }  = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const [EnrolledProducts, setEnrolledProducts] = useState(null)

    useEffect(() => {
        ;(async () => {
            try{
                const res = await getUserEnrolledProducts(token)
                const filterPublishProduct = res.filter((ele) => ele.status !== "Draft")
                setEnrolledProducts(filterPublishProduct)
            } catch(error) {
                console.log("Could not fetch enrolled products")
            }
        })()
    },[])

    console.log(EnrolledProducts);

    return (
        <>
          <div className="text-3xl text-richblack-50">Your Products</div>
          {!EnrolledProducts ? (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
              <div className="spinner"></div>
            </div>
          ) : !EnrolledProducts.length ? (
            <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
              You have not odered any product yet.
              {/* TODO: Modify this Empty State */}
            </p>
          ) : (
            <div className="my-8 text-richblack-5">
              {/* Headings */}
              <div className="flex rounded-t-lg bg-richblack-500 ">
                <p className="w-[45%] px-5 py-3">Product Name</p>
                <p className="w-1/4 px-2 py-3">Description</p>
              </div>
              {/* product Names */}
              {EnrolledProducts.map((product, i, arr) => (
                <div
                  className={`flex items-center border border-richblack-700 ${
                    i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                  }`}
                  key={i}
                >
                  <div
                    className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                    onClick={() => {
                      navigate(
                        `/products/${product?._id}`
                      )
                    }}
                  >
                    <img
                      src={product.thumbnail}
                      alt="course_img"
                      className="h-14 w-14 rounded-lg object-cover"
                    />
                    <div className="flex max-w-xs flex-col gap-2">
                      <p className="font-semibold">{product.productName}</p>
                      
                    </div>
                  </div>
                  <p className="text-sm text-richblack-300">
                        {product.productDescription.length > 30
                          ? `${product.productDescription.slice(0, 30)}...`
                          : product.productDescription}
                      </p>
                  
                </div>
              ))}
            </div>
          )}
        </>
      )
}

export default EnrolledProducts