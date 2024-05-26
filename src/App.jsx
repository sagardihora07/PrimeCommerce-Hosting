import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/updatePassword";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Navbar from "./components/comman/Navbar";
//import Category from "./pages/Category";
import SubCategoryProduct from "./pages/SubCategoryProduct";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/core/Dashboard/AddProduct"
import { ACCOUNT_TYPE } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";
import MyProducts from "./components/core/Dashboard/MyProducts";
import EditProduct from "./components/core/Dashboard/EditProduct";
import Settings from "./components/core/Dashboard/Settings";
import ProductDetails from "./pages/ProductDetails";
import EnrolledProducts from "./components/core/Dashboard/EnrolledProducts";
import Cart from "./components/core/Dashboard/cart";
import Seller from "./components/core/Dashboard/Seller";
import PrivateRoute from "./components/comman/PrivateRoute";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.profile)

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"))
      dispatch(getUserDetails(token, navigate))
    }
  },[])

  return (
    <div className="flex min-h-screen w-screen flex-col bg-richblack-800 font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="category/:categoryName/:title" element={<SubCategoryProduct />} />
        <Route path="products/:productId" element={<ProductDetails />} />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />

          {/* Private Route - for only for logged in user */}

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
              
            }  
          >

            {/* routes for all users */}
            <Route path="dashboard/my-profile" element={<MyProfile/>} />
            <Route path="dashboard/settings" element={<Settings/>} />

            {/* Routes for Seller only */}
            {user?.accountType === ACCOUNT_TYPE.SELLER && (
              <>
              <Route path="dashboard/seller" element={<Seller />} />
                <Route path="dashboard/add-product" element={<AddProduct />} />
                <Route path="dashboard/my-products" element={<MyProducts />} />
                <Route path="dashboard/edit-product/:productId"
                       element={<EditProduct />}
                />
              </>
            )}

            {/* Route for buyer only */}
            {user?.accountType === ACCOUNT_TYPE.BUYER && (
              <>
                <Route path="dashboard/enrolled-products" element={<EnrolledProducts />}/>
                <Route path="/dashboard/cart" element={<Cart />} />
              </>
            )}

          </Route>


      </Routes>
    </div>
  );
}

export default App;
