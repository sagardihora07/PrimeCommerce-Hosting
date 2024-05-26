const Category = require("../models/Category")
const Subcategory = require("../models/Subcategory");

function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCategory = async (req, res) => {
  try {
    const { categoryName } = req.body
    if (!categoryName) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" })
    }
    const CategorysDetails = await Category.create({
      categoryName: categoryName,
    })
    console.log(CategorysDetails)
    return res.status(200).json({
      success: true,
      message: "Categorys Created Successfully",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.showAllCategories = async (req, res) => {
  try {
    const allCategorys = await Category.find()
    .populate({
      path: "subCategory",
      // populate: {
      //   path: "subCategory",
      // }
    }).exec();

    
    res.status(200).json({
      success: true,
      data: allCategorys,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.categoryPageDetails = async (req, res) => {
  try{

      const { categoryId } = req.body;

      //get product from specified category
      const selectedCategory = await Category.findById(categoryId)
          .populate({
              path: "subCategory",
              //match: {status: "Placed"},
              //populate: "ratingAndReviews",
          })
          .exec()
          
      console.log("SELECTED SUBCATEGORY", selectedCategory);

      //handle case when category is not found

      if(!selectedCategory) {
          console.log("Category not found")
          return res.status(404).json({
              success: false,
              message: "Category not found"
          })
      }

      //handle case when no product in subCategory

      // if(selectedCategory.subCategory.products.length === 0 ){
      //     console.log("No products found for selectyed Category");
      //     return res.status(404).json({
      //         success: false,
      //         message: "No Products found in selected Category"
      //     })
      // }
    //   // Get product for other categories
    //   const categoriesExceptSelected = await Category.find({
    //       _id: { $ne: categoryId},
    // })
    //   let differentCategory = await Category.findOne(
    //     categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
    //       ._id
    // )
    //   .populate({
    //       path: "products",
    //      // match: { status: "Placed" },
    //   })
    //   .exec()
    //   console.log()
    //   // Get top-selling  across all categories
    //   const allCategories = await Category.find()
    //       .populate({
    //       path: "products",
    //       //match: { status: "Placed" },
    //   })
    //   .exec()
    //   const allProducts = allCategories.flatMap((category) => category.products)
    //   const mostSellingproducts = allProducts
    //       .sort((a, b) => b.sold - a.sold)
    //       .slice(0, 10)

      res.status(200).json({
          success: true,
          data: {
              selectedCategory,
              //differentCategory,
              //mostSellingproducts,
          },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
