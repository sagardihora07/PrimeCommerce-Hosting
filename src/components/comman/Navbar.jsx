import React, { useEffect, useState } from 'react';
import Logo from "../../assets/Logo.jpg"
import { Link, useLocation,matchPath } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/apis';
import { ACCOUNT_TYPE } from "../../utils/constants"
import { NavbarLinks } from '../../data/navbar-links';
import { BsChevronDown } from "react-icons/bs"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"
import ProfileDropdown from '../core/Auth/ProfileDropdown';
import SideNavbar from '../core/HomePage/SideNavbar';


const Navbar = () => {

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
    <div
    className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
      location.pathname !== "/" ? "bg-gradient-to-br from-richblue-900 via-richblue-400 to-richblack-700" :
       "bg-gradient-to-br from-richblue-900 via-richblue-400 to-richblack-700"
    } transition-all duration-200`}
  >
    <div className="flex  w-11/12 items-center justify-between">
      {/* Logo */}
      <Link to="/">
        <div className='flex items-center'>
          <img src={Logo} alt="Logo" width={40} height={32} loading="lazy" />
          <p className='text-white ml-1 font-semibold text-lg'>PrimeCommerce</p>
        </div>
      </Link>

      {/* navigation links  */}
      <nav className="hidden md:block">
          <ul className="flex gap-x-8 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Category" ? (
                  <>
                    <div
                      className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/category/:categoryName")
                          ? "text-richblue-500"
                          : "text-richblack-25"
                      }`}
                    >
                      <p
                        className="font-medium"
                      >{link.title}</p>
                      <BsChevronDown />
                      <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-green-100 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-green-100"></div>
                        {loading ? (
                          <p className="text-center">Loading...</p>
                        ) : subLinks.length ? (
                          <>
                            {subLinks
                              ?.filter(
                                (subLink) => subLink?.subCategory?.length > 0
                              )
                              ?.map((subLink, i) => (
                                <>
                                  <div className="text-blue-400 font-semibold" >{subLink.categoryName}</div>
                                  {
                                    subLink.subCategory.map((link) => (
                                      <Link
                                        to={`/category/${subLink.categoryName}/${link.title
                                        .split(" ")
                                        .join("-")
                                        .toLowerCase()}`}
                                      className="rounded-lg bg-transparent mt-2 mb-2 pl-4 hover:bg-aqua-500"
                                      key={i}
                                      ><li>{link.title}</li></Link>
                                    ))
                                  }
                                  </>
                              ))}
                          </>
                        ) : (
                          <p className="text-center">No Products Found</p>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-green-500"
                          : "text-richblack-25"
                      }  font-medium` }
                    >
                    
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {/* Login / Signup / Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.SELLER && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-[7px] px-4 rounded-md shadow-md  transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white font-bold py-[7px] px-4 rounded-md shadow-md transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>
        <div className='md:hidden'>
            <SideNavbar />
        </div>


    </div>

    </div>
  );
};

export default Navbar;
