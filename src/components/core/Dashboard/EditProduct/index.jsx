

import { useDispatch, useSelector } from "react-redux"
import {
    fetchProductDetails
} from "../../../../services/operations/productDetailsAPI"
import { setProduct, setEditProduct} from "../../../../slices/productSlice"
import RenderSteps from "../AddProduct/RenderSteps"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

export default function EditProduct() {
    const dispatch = useDispatch()
    const { productId } = useParams()
    const { product } = useSelector((state) => state.product)
    const [ loading, setLoading ] = useState(false)
    const { token } = useSelector((state) => state.auth)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            const result = await fetchProductDetails(productId)
            console.log(result)
            if (result?.data?.productDetails) {
                dispatch(setEditProduct(true))
                dispatch(setProduct(result?.data?.productDetails))
            }
            setLoading(false)
        })()
    },[])

    if (loading) {
        return (
          <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }

    return (
        <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
            Edit Product
        </h1>
        <div className="mx-auto max-w-[600px]">
            {product ? (
            <RenderSteps />
            ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Product not found
            </p>
            )}
        </div>
        </div>
    )     
}