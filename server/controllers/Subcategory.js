const Category = require("../models/Category");
const SubCategory = require("../models/Subcategory");

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
//create a new category for given category
exports.createSubCategory = async (req, res) => {
    try {

        //extract necessary info from req ki body
        const { categoryId, title, description } = req.body;

        //validation
        if(!categoryId || !title || !description) {
            return res.status(404).json({
                success: false,
                message: "All field are required"
            })
        }

        //create subCategory
        const SubCategoryDetails = await SubCategory.create({
            title: title,
            description: description,
        })

        //update corresponding category

        const updateCategory = await Category.findByIdAndUpdate(
            {_id: categoryId },
            {$push: {subCategory: SubCategoryDetails._id}},
            {new: true}
        ).populate("subCategory")

        //return the updated res
        return res.status(200).json({
            success: true,
            data:updateCategory
        })

    } catch(error) {
        console.log("Error while creating new sub-Category:", error)
        return res.status(500).json({
            success: false,
            message:error.message,
        })
    }
}

//get all sub categories
exports.showAllSubCategories = async (req, res) => {
    try{

        const allSubCategories = await SubCategory.find()
        .populate({
            path:"products"
        }).exec();

        return res.status(200).json({
            success: true,
            data: allSubCategories,
        })
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.deleteSubCategory = async (req, res) => {
    try {

        const { subCategoryId, categoryId } = req.body

        //first delete that subcategory from category 
        await Category.findByIdAndUpdate(
            {_id: categoryId},
            {
                $pull: {
                    subCategory: subCategoryId,
                },
            }
        )

        //delete subcategory
        const subCategory = await SubCategory.findByIdAndDelete({_id: subCategoryId});

        if(!subCategory) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found"
            })
        }


        //find updted categoryand return it
        const updateCategory = await Category.findById(categoryId).populate(
            "subCategory"
        )

        //return res
        return res.json({
            success: true,
            message:"SubCategory deleted successfully",
            data: updateCategory,
        })
    }
    catch(error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Error while deleting the subCategory"
        })
    }
}


//subcategory page details
exports.subCategoryPageDetails = async (req, res) => {
    try{

        const { subCategoryId} = req.body;

        //get product from specified subcategory
        const selectedSubCategory = await SubCategory.findById(subCategoryId)
            .populate({
                path: "products",
                //match: {status: "Placed"},
                //populate: "ratingAndReviews",
            })
            .exec()
            
        console.log("SELECTED SUBCATEGORY", selectedSubCategory);

        //handle case when category is not found

        if(!selectedSubCategory) {
            console.log("SubCategory not found")
            return res.status(404).json({
                success: false,
                message: "SubCategory not found"
            })
        }

        //handle case when no product in subCategory

        if(selectedSubCategory.products.length === 0 ){
            console.log("No products found for selectyed SubCategory");
            return res.status(404).json({
                success: false,
                message: "No Products found in selected SubCategory"
            })
        }
        // Get product for other categories
        const subCategoriesExceptSelected = await SubCategory.find({
            _id: { $ne: subCategoryId},
      })
        let differentSubCategory = await SubCategory.findOne(
            subCategoriesExceptSelected[getRandomInt(subCategoriesExceptSelected.length)]
            ._id
      )
        .populate({
            path: "products",
            //match: { status: "Placed" },
        })
        .exec()
        console.log()
        // Get top-selling s across all categories
        const allSubCategories = await SubCategory.find()
            .populate({
            path: "products",
            //match: { status: "Placed" },
        })
        .exec()
        const allProducts = allSubCategories.flatMap((subCategory) => subCategory.products)
        const mostSellingproducts = allProducts
            .sort((a, b) => b.sold - a.sold)
            .slice(0, 10)
  
        res.status(200).json({
            success: true,
            data: {
                selectedSubCategory,
                differentSubCategory,
                mostSellingproducts,
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