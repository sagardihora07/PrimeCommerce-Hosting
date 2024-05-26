const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Product = require("../models/Product");
const Category = require("../models/Category");
const SubCategory = require("../models/Subcategory")

//function to create new product
exports.createProduct = async (req, res) => {
    try {
        //get user Id from request object
        const userId = req.user.id;

        //get All required field from request body
        let {
            productName,
            productDescription,
            price,
            stockQuantity,
            subCategory,
            status,
            warranty
        } = req.body;

        //get thumbnail from request file
        const thumbnail = req.files.thumbnailImage
        console.log(thumbnail);

        //chaeck if any required value missing 
        if(
            !productName ||
            !productDescription ||
            !price ||
            !thumbnail ||
            !subCategory ||
            !stockQuantity ||
            !warranty
        ) {
            return res.status(400).json({
                success: false,
                message: "All Fields are required"
            });
        }

        if(!status || status === undefined) {
            status = "Draft"
        }

        //check user is seller
        const sellerDetails = await User.findById(userId, {
            accountType: "Seller"
        })

        if(!sellerDetails) {
            return res.status(404).json({
                success: false,
                message: "Seller Details not Found"
            })
        }

        //check for category details 
        const subCategoryDetails = await SubCategory.findById(subCategory)
        if(!subCategoryDetails) {
            return res.status(404).json({
                success: false,
                message: " SubCategory Details not Found"
            })
        }

        //upload the thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        )

        const newProduct = await Product.create({
            productName,
            productDescription,
            seller: sellerDetails._id,
            price,
            stockQuantity,
            subCategory: subCategoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            warranty,
        })

        //add new product to user schema of seller
        await User.findByIdAndUpdate(
            {
                _id: sellerDetails._id,
            },
            {
                $push: {
                    products: newProduct._id,
                },
            },
            { new: true}
        )

        //add new product to the category
        const categoryDetails2 = await SubCategory.findByIdAndUpdate(
            {_id: subCategory},
            {
                $push: {
                    products: newProduct._id,
                },
            },
            {new: true}
        )
        console.log("upadted category details", categoryDetails2)

        //return the new product and success message
        return res.status(200).json({
            success: true,
            data: newProduct,
            message: "Product Created Successfully",
        })

    } 
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        })
    }
}

//edit product details
exports.editProduct = async (req, res) => {
    try{
        
        const { productId } = req.body
        const updates = req.body
        const product = await Product.findById(productId)

        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Can't get product ID",
                error: error.message
            })
        }

        //if thumbnail Image is found, update it
        if(req.files) {
            console.log("thumbnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            product.thumbnail = thumbnailImage.secure_url
        }

        //update only field that are present in req body
        for( const key in updates) {
            if(updates.hasOwnProperty(key)) {
                product[key] = updates[key]
            }
        }

        await product.save()

        const updatedProduct = await Product.findOne({
            _id: productId,
        })
            .populate({
                path: "seller",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate({
                path: "category",
                populate: {
                    path: "subCategory"
                }
            }).exec()
            
        return res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        })
        

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Error while updating product details",
            error: error.message,
        })
    }
}

//get products list 
exports.getAllProducts = async (req, res) => {
    try{

        const allProducts = await Product.find(
            {status: "Placed"},
            {
                productName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                buyerOdered: true,
                stockQuantity: true
            }
        )
            .populate("seller")
            .exec()

        return res.status(200).json({
            success: true,
            data: allProducts,
        })
        
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message: "Can't get all products"
        })
    }
}

//get single product details 
exports.getProductDetails = async (req, res) => {
    try{

        const { productId } = req.body
        const productDetails = await Product.findOne({
            _id: productId,
        })
        .populate({
            path:"seller",
                populate: {
                    path: "additionalDetails",
                },
        })
        .populate({
            path: "category",
                populate: {
                    path: "subCategory"
                }
        })
        .populate("ratingAndReviews")
        .exec()

        if(!productDetails) {
            return res.status(404).json({
                success: false,
                message: `could not find product with id: ${productId}`,
            })
        } 
        
        return res.status(200).json({
            success: true,
            message: "product detail fetched successfully",
            data: {
                productDetails,
            },
        })

    } catch( error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can't get single product details",
        })
    }
}

//get a list of product that are created by specific seller
exports.getSellerProducts = async (req, res) => {
    try{

        //get seller id from authenticated user 
        const sellerId = req.user.id;

        //find all product that created by specific seller
        const sellerProducts = await Product.find({
            seller: sellerId,
        }).sort({createdAt: -1})

        //return the seller products
        return res.status(200).json({
            success:true,
            data: sellerProducts,
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to get seller products",
            error: error.message,
        })
    }
}

//delete the product
exports.deleteProducts = async (req, res) => {
    try{

        const { productId } = req.body

        //find the product 
        const product = await Product.findById(productId)
        if(!product) {
            return res.status(404).json({
                success:true,
                message: "Product not found"
            })
        }

        //unenroll buyer from the product
        const buyersOdered = product.buyersOdered;
        for(const buyerId of buyersOdered) {
            await User.findByIdAndUpdate(buyerId, {
                $pull :{ products: productId}
            })
        }

        //delete the product 
        await Product.findByIdAndDelete(productId);

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })

    } catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can't delete product",
            error: error.message

        })
    }
}