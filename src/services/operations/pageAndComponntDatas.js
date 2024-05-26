import { toast } from "react-hot-toast"

import { apiConnector } from "../apiConnector"
import { subCategoryData } from "../apis"



export const getSubCategoryPageData = async (subCategoryId) => {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "POST",
      subCategoryData.SUBCATEGORIES_DATA_API,
      {
        subCategoryId: subCategoryId,
      }
    )
    if (!response?.data?.success) {
      throw new Error("Could Not Fetch Sub Catagory page data.")
    }
    result = response?.data
  } catch (error) {
    console.log("SUBCATEGORY PAGE DATA_API API ERROR............", error)
    toast.error(error.message)
    result = error.response?.data
  }
  toast.dismiss(toastId)
  return result
}








//import { subCategoryData } from "../apis"

// export const getsubCategoryPageData = async (subCategoryId) => {
//   const toastId = toast.loading("Loading...")
//   let result = []
//   try {
//     const response = await apiConnector(
//       "POST",
//       subCategoryData.subCategoryId,
//       {
//         subCategoryId: subCategoryId,
//       }
//     )
//     if (!response?.data?.success) {
//       throw new Error("Could Not Fetch SubCatagory page data.")
//     }
//     result = response?.data
//   } catch (error) {
//     console.log("SUBCATEGORY_PAGE_DATA API ERROR............", error)
//     toast.error(error.message)
//     result = error.response?.data
//   }
//   toast.dismiss(toastId)
//   return result
// }
