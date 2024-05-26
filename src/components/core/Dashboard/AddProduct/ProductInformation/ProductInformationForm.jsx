import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addProductDetails,
  editProductDetails,
} from "../../../../../services/operations/productDetailsAPI"
import { showAllSubCategories } from "../../../../../services/apis"
import { setProduct, setStep } from "../../../../../slices/productSlice"
import { ORDER_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../comman/IconBtn"
import Upload from "../Upload"
import { apiConnector } from "../../../../../services/apiConnector"

export default function ProductInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { product, editProduct } = useSelector((state) => state.product)
  const [loading, setLoading] = useState(false)
  const [productSubCategories, setProductSubCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      try{
        const res = await apiConnector("POST",showAllSubCategories.SHOWALLSUBCATEGORIES_API)
        const subCategories = res?.data?.data
        if (subCategories.length > 0) {
          // console.log("categories", categories)
          setProductSubCategories(subCategories)
        }
      } catch(error) {
        console.log("Could not fetch sub categories", error)
      }

      
      setLoading(false)
    }
    // if form is in edit mode
    if (editProduct) {
      // console.log("data populated", editProduct)
      setValue("productTitle", product.productName)
      setValue("productShortDesc", product.productDescription)
      setValue("productPrice", product.price)
      setValue("productSubCategory", product.subCategory)
      setValue("productImage", product.thumbnail)
      setValue("productWarranty", product.warranty)
      setValue("productStockQuantity", product.stockQuantity)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.productTitle !== product.productName ||
      currentValues.productShortDesc !== product.productDescription ||
      currentValues.productPrice !== product.price ||
      currentValues.productSubCategory._id !== product.subCategory._id ||
      currentValues.productImage !== product.thumbnail ||
      currentValues.productWarranty !== product.warranty ||
      currentValues.productStockQuantity !== product.stockQuantity
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editProduct) {
      
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("productId", product._id)
        if (currentValues.productTitle !== product.productName) {
          formData.append("productName", data.productTitle)
        }
        if (currentValues.productShortDesc !== product.productDescription) {
          formData.append("productDescription", data.productShortDesc)
        }
        if (currentValues.productPrice !== product.price) {
          formData.append("price", data.productPrice)
        }
        if (currentValues.productSubCategory._id !== product.subCategory._id) {
          formData.append("subCategory", data.productSubCategory)
        }
        if (currentValues.productImage !== product.thumbnail) {
          formData.append("thumbnailImage", data.productImage)
        }
        if (currentValues.productWarranty !== product.warranty) {
          formData.append("warranty", data.productWarranty)
        }
        if (currentValues.productStockQuantity !== product.stockQuantity) {
          formData.append("stockQuantity",data.productStockQuantity)
        }

        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editProductDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setProduct(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("productName", data.productTitle)
    formData.append("productDescription", data.productShortDesc)
    formData.append("price", data.productPrice)
    formData.append("subCategory", data.productSubCategory)
    formData.append("status", ORDER_STATUS.DRAFT)
    formData.append("thumbnailImage", data.productImage)
    formData.append("warranty", data.productWarranty)
    formData.append("stockQuantity", data.productStockQuantity)

    setLoading(true)
    const result = await addProductDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setProduct(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-400 bg-gradient-to-br from-richblue-900 via-richblue-400 to-richblack-700 p-6"
    >
      {/* Product Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productTitle">
          Product Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="productTitle"
          placeholder="Enter Product Title"
          {...register("productTitle", { required: true })}
          className="form-style w-full"
        />
        {errors.productTitle && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product title is required
          </span>
        )}
      </div>
      {/* Product Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="produtShortDesc">
          Product Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="produtShortDesc"
          placeholder="Enter Description"
          {...register("productShortDesc", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.produtShortDesc && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Description is required
          </span>
        )}
      </div>
      {/* Product Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productPrice">
          Product Price <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="productPrice"
            placeholder="Enter Product Price"
            {...register("productPrice", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
               },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.productPrice && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Price is required
          </span>
        )}
      </div>
      {/* Product Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productSubCategory">
          Product Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("productSubCategory", { required: true })}
          defaultValue=""
          id="productSubCategory"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            productSubCategories?.map((subCategory, indx) => (
              <option key={indx} value={subCategory?._id}>
                {subCategory?.title}
              </option>
            ))}
        </select>
        {errors.productSubCategory && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product Category is required
          </span>
        )}
      </div>
      {/* Product Thumbnail Image */}
      <Upload
        name="productImage"
        label="Product Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editProduct ? product?.thumbnail : null}
      />
     
      {/* product warranty */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productWarranty">
          Product Warranty <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="productWarranty"
          placeholder="Enter Product warranty"
          {...register("productWarranty", { required: true })}
          className="form-style w-full"
        />
        {errors.productWarranty && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product warranty is required
          </span>
        )}
      </div>     
        {/* product stockQuantity */}
        <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="productStockQuantity">
          Product StockQuantity <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="productStockQuantity"
          placeholder="Enter Product StockQuantity"
          {...register("productStockQuantity", { required: true })}
          className="form-style w-full"
        />
        {errors.productStockQuantity && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Product StockQuantity is required
          </span>
        )}
      </div> 

      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editProduct && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editProduct ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
