import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiConnector'
//import { categories } from '../services/apis'
import { showAllSubCategories } from '../services/apis'
import { getSubCategoryPageData } from '../services/operations/pageAndComponntDatas'
import Error from './Error'
import Product_card from '../components/core/subCategory/Product_card'

const SubCategoryProduct = () => {

    const { loading } = useSelector((state) => state.auth)
    const {title} = useParams()
    const {categoryName} = useParams()
    const [active, setActive] = useState(1)
    const [subCategoryPageData, setSubCategoryPageData] = useState(null)
    const [subCategoryId, setSubCategoryId] = useState("")

    //fetch all subcategories
    useEffect(() => {
        ;(async () => {
            try{
                const res = await apiConnector("POST",showAllSubCategories.SHOWALLSUBCATEGORIES_API)
                const subCategory_id = res?.data?.data.filter(
                    (sct) => sct.title.split(" ").join("-").toLowerCase() === title.toLowerCase()
                )[0]._id
                setSubCategoryId(subCategory_id)
            } catch(error) {
                console.log("Could not fetch sub categories", error)
            }
        })()
    },[title])

    
    useEffect(() => {
        if(subCategoryId) {
            ;(async () => {
                try{
                    const res = await getSubCategoryPageData(subCategoryId)
                    setSubCategoryPageData(res)
                } catch (error) {
                    console.log(error)
                }
            })()
        }
    },[subCategoryId])

    if (loading || !subCategoryPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
    if (!loading && !subCategoryPageData.success) {
        return <Error />
    }
    console.log("hellow",subCategoryPageData)
    var products = subCategoryPageData?.data?.selectedSubCategory?.products

    return (
        <>
          {/* Hero Section */}
          <div className="box-content bg-gradient-to-br from-richblue-900 via-richblue-400 to-richblack-700 px-4 transition duration-500 ease-in-out">
            <div className="mx-auto flex min-h-[180px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
             
              <p className="text-3xl text-richblack-5">
                {subCategoryPageData?.data?.selectedSubCategory?.title}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {subCategoryPageData?.data?.selectedSubCategory?.description}
              </p>
            </div>
          </div>

          {/*product section */}
          <div  className=' w-full h-full min-h-[700px] bg-gradient-to-br from-richblack-800 via-blue-700 to-richblack-800 transition duration-500 ease-in-out'>
            <div className="grid mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {products?.map((product, i) =>(
                    <Product_card product={product} Height={"h-[180px]"}/>
                ))}
            </div>
          </div>
        </>
    )
}

export default SubCategoryProduct