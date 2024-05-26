import React, { useEffect, useState } from 'react'
import { fetchSellerProducts } from '../../../services/operations/productDetailsAPI'
import { getSellerData } from '../../../services/operations/profileAPI'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SellerChart from './SellerDashboard/SellerChart'

const Seller = () => {

    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const[sellerData, setSellerData] = useState(null)
    const [products, setProducts] = useState([])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const sellerApiData = await getSellerData(token)
            const result = await fetchSellerProducts(token)
            if(sellerApiData.length) setSellerData(sellerApiData)
            if(result) {
                setProducts(result)
            }
            setLoading(false)
        })()
    }, [])

    const totalAmount = sellerData?.reduce(
        (acc, curr) => acc + curr.totalAmountGenerated,
        0
    )
    const totalBuyers = sellerData?.reduce(
        (acc, curr) => acc + curr.totalBuyersOdered,
        0
    )

    return (
        <div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-richblack-5">
              Hi {user?.firstName} 👋
            </h1>
            <p className="font-medium text-richblack-200">
              Let's start something new
            </p>
          </div>
          {loading ? (
            <div className="spinner"></div>
          ) : products.length > 0 ? (
            <div >
              <div className="my-4 flex h-[450px] space-x-4">
                {/* Render chart / graph */}
                {totalAmount > 0 || totalBuyers > 0 ? (
                  <SellerChart products={sellerData} />
                ) : (
                  <div className="flex-1 rounded-md bg-richblack-800 p-6">
                    <p className="text-lg font-bold text-richblack-5">Visualize</p>
                    <p className="mt-4 text-xl font-medium text-richblack-50">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}
                {/* Total Statistics */}
                <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Statistics</p>
                  <div className="mt-4 space-y-4">
                    <div>
                      <p className="text-lg text-richblack-200">Total Products</p>
                      <p className="text-3xl font-semibold text-richblack-50">
                        {products.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-richblack-200">Total Buyers</p>
                      <p className="text-3xl font-semibold text-richblack-50">
                        {totalBuyers}
                      </p>
                    </div>
                    <div>
                      <p className="text-lg text-richblack-200">Total Income</p>
                      <p className="text-3xl font-semibold text-richblack-50">
                        Rs. {totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md bg-richblack-800 p-6">
                {/* Render 3 products */}
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-richblack-5">Your Products</p>
                  <Link to="/dashboard/my-products">
                    <p className="text-xs font-semibold text-aqua-300">View All</p>
                  </Link>
                </div>
                <div className="my-4 flex items-start space-x-6">
                  {products.slice(0, 3).map((product) => (
                    <div key={product._id} className="w-1/3">
                      <img
                        src={product.thumbnail}
                        alt={product.productName}
                        className="h-[201px] rounded-md object-cover lg:object-contain"
                      />
                      <div className="mt-3 w-full">
                        <p className="text-sm font-medium text-richblack-50">
                          {product.productName}
                        </p>
                        <div className="mt-1 flex items-center space-x-2">
                          <p className="text-xs font-medium text-richblack-300">
                            {product.buyersOdered.length} Buyers
                          </p>
                          <p className="text-xs font-medium text-richblack-300">
                            |
                          </p>
                          <p className="text-xs font-medium text-richblack-300">
                            Rs. {product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
              <p className="text-center text-2xl font-bold text-richblack-5">
                You have not created any Products yet
              </p>
              <Link to="/dashboard/add-product">
                <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                  Create a Products
                </p>
              </Link>
            </div>
          )}
        </div>
      )
}

export default Seller