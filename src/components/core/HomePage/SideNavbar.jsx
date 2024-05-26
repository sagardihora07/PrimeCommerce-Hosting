import React from 'react'
import { navbarSidebarLinks } from '../../../data/navbarSidebarLinks';
import  { useEffect, useState } from 'react';
import { Link, useLocation,matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../../services/apiConnector';
import { categories } from '../../../services/apis';
import { ACCOUNT_TYPE } from "../../../utils/constants"
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropdown from '../../core/Auth/ProfileDropdown';


import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../@/components/ui/sheet"




const SideNavbar = () => {

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const location = useLocation()

  const [subLinks, setSublinks ] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try{
        const res = await apiConnector("POST", categories.CATEGORIES_API)
        setSublinks(res.data.data)
        console.log(res.data.data)
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

    <Sheet>
      <SheetTrigger><AiOutlineMenu fontSize={24} fill="#AFB2BF" /></SheetTrigger>
        <SheetContent className="bg-indigo-100">
          <SheetHeader>
            <SheetTitle>PrimeCommerce</SheetTitle>
            <nav className="flex gap-52 flex-col">
              <ul className="flex flex-col  gap-5 text-richblack-700">
                {navbarSidebarLinks.map((link, index) => (
                  <li key={index}>
                      <Link to={link?.path}>
                        <p
                          className={`${
                            matchRoute(link?.path)
                              ? "text-richblack-900"
                              : "text-richblack-200"
                          }  font-medium` }
                        >
                        
                          {link.title}
                        </p>
                      </Link>
                    
                  </li>
                ))}
              </ul>
              
                {/* Login / Signup / Dashboard */}
                <div className="gap-2 items-center flex">
                  <div className='flex gap-10'>

                    {user && user?.accountType !== ACCOUNT_TYPE.SELLER && (
                      <Link to="/dashboard/cart" className="relative">
                          <AiOutlineShoppingCart className="text-2xl text-richblack-400" /> 
                        {totalItems > 0 && (
                          <span className="absolute bottom-7 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                            {totalItems}
                          </span>
                        )}
                      </Link>
                    )}
                  
                  {token !== null && <div>
                    <ProfileDropdown />
                  </div>}

                  </div>

                  {token === null && (
                    <Link to="/login">
                      <button className=" text-black bg-richblack-25 font-bold py-[7px] px-4 rounded-md shadow-md  transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Log in
                      </button>
                    </Link>
                  )}
                  {token === null && (
                    <Link to="/signup">
                      <button className="bg-richblack-25 text-black font-bold py-[7px] px-4 rounded-md shadow-md transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Sign up
                      </button>
                    </Link>
                  )}
                </div>

            </nav>

            

          </SheetHeader>
        </SheetContent>
    </Sheet>


  </div>

  )
}

export default SideNavbar