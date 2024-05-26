import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'
import { Link, useLocation,matchPath } from 'react-router-dom';
import { CgChevronDoubleRight } from "react-icons/cg";
import { ImPointRight } from "react-icons/im";
const CategorySection = () => {

    const [subLinks, setSublinks] = useState([])
    const location = useLocation()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        ;(async () => {
          setLoading(true)
          try{
            const res = await apiConnector("POST", categories.CATEGORIES_API)
            setSublinks(res.data.data)
            // console.log("navbar res",res)
          }
          catch(error) {
            console.log("Could not fetch Categories.",error)
          }
          setLoading(false)
        })()
      },[])
  
      
      const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
      }

      return (
        <div className="">
            <div className='text-center mb-10'>
            <h1 class="text-3xl font-semibold tracking-tighter text-blue-300 lg:text-3xl text-balance bg-gradient-to-b from-[#a204a4] via-[#ec05bec8] to-[#2f3b5c] text-transparent bg-clip-text">
                Uncover Treasures Across Our Collections
            </h1>
            <p class="w-1/2 mx-auto mt-4 text-base font-medium text-gray-300 text-balance">
                Discover stylish apparel, innovative gadgets, and more. Shop now and find your perfect fit!
            </p>
            </div>
            <div className=""> {/* Grid layout for categories */}
                { subLinks.length ? (
                    <>
                    {subLinks
                        ?.filter(
                        (subLink) => subLink?.subCategory?.length > 0
                        )
                        ?.map((subLink, i) => (
                        <div className="flex flex-col mb-6 gap-2 items-center" key={i}> {/* Grid layout for categories and subcategories */}
                            <div className="text-richblack-200 flex items-center gap-2 text-2xl font-semibold mb-5 underline cursor-pointer "><ImPointRight />{subLink.categoryName}</div> {/* Updated text color and added margin-bottom */}
                            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 gap-x-6 md:w-[1050px]"> {/* Grid for subcategories */}
                                {
                                subLink.subCategory.map((link, j) => (
                                    <div className="mb-2 " key={j}> {/* Added margin-bottom */}
                                        <Link
                                        to={`/category/${subLink.categoryName}/${link.title
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                        className="text-indigo-100 hover:text-blue-200 transition-colors duration-300 ease-in-out block" 
                                        >
                                        <div className='flex items-center text-l'>
                                         <CgChevronDoubleRight />{link.title}  
                                        </div>
                                         
                                        </Link>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                        ))}
                    </>
                ) : (
                    <p className="text-center">No Products Found</p>
                )}
            </div>
        </div>
    )
    
    
    
}

export default CategorySection