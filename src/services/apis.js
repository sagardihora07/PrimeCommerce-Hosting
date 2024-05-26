const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_PRODUCTS_API: BASE_URL + "/profile/getEnrolledProducts",
  GET_SELLER_DATA_API: BASE_URL + "/profile/sellerDashboard",
}

//BUYER ENDPOINTS
export const buyerEndpoints = {
  PRODUCT_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  PRODUCT_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// Product ENDPOINTS
export const productEndpoints = {
  GET_ALL_PRODUCT_API: BASE_URL + "/product/getAllProducts",
  PRODUCT_DETAILS_API: BASE_URL + "/product/getProductDetails",
  EDIT_PRODUCT_API: BASE_URL + "/product/editProduct",
  PRODUCT_CATEGORIES_API: BASE_URL + "/product/showAllCategories",
  CREATE_PRODUCT_API: BASE_URL + "/product/createProduct",
  GET_ALL_SELLER_PRODUCTS_API: BASE_URL + "/product/getSellerProducts",
  DELETE_PRODUCT_API: BASE_URL + "/product/deleteProduct",
  CREATE_RATING_API: BASE_URL + "/product/createRating",
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/product/getReviews",
}

// CATALOG PAGE DATA
export const categoryData = {
  CATEGORYPAGEDATA_API: BASE_URL + "/product/getCategoryPageDetails",
}

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/product/showAllCategories",
}
//CATEGORY PAGE DATA API
export const subCategoryData = {
    SUBCATEGORIES_DATA_API: BASE_URL + "/product/getSubCategoryPageDetails",
    
}
//shpw all subcategories
export const showAllSubCategories = {
  SHOWALLSUBCATEGORIES_API: BASE_URL + "/product/showAllSubCategories"
}
// // CATALOG PAGE DATA
// export const catalogData = {
//   CATALOGPAGEDATA_API: BASE_URL + "/product/getCategoryPageDetails",
// }
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

