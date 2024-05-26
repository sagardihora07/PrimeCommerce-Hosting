// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'
// import { useParams } from 'react-router-dom'
// import { apiConnector } from '../services/apiConnector'
// import { categories } from '../services/apis'
// import { getCategoryPageData } from '../services/operations/pageAndComponntDatas'

// const Category = () => {

//     const { loading } = useSelector((state) => state.profile)
//     const { categoryName } = useParams()
//     const [active, setActive] = useState(1)
//     const [categoryPageData, setCategoryPageData] = useState(null)
//     const [categoryId, setCategoryId] = useState("")
//     //fetch all categories
//     useEffect(() => {
//         ;(async () => {
//             try{

//                 const res = await apiConnector("POST", categories.CATEGORIES_API)
//                 console.log(res)
//                 const category_id = res?.data?.data?.filter(
//                     (ct) => ct.categoryName.split(" ").join("-").toLowerCase() === categoryName
//                 )[0]._id
//                 setCategoryId(category_id)

//             } catch(error) {
//                 console.log("Could not fetch categories", error)
//             }
//         })()
//     },[categoryName])

//     useEffect(() => {
//         if (categoryId) {
//           ;(async () => {
//             try {
//               const res = await getCategoryPageData(categoryId)
//               setCategoryPageData(res)
//               console.log(res)
//             } catch (error) {
//               console.log(error)
//             }
//           })()
//         }
//       }, [categoryId])

//   return (
//     <div className='text-white'>Category</div>
//   )
// }

// export default Category