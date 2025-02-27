const userModel = require('../model/userModel')
// const adminModel = require('../model/adminModel');
const productModel = require('../model/productModel');
// const sendMail = require('../helper/email');
// const secret_key = process.env.secret_key;
// const jwt = require('jsonwebtoken');
// const signUp = require('../helper/signup');
// const bcrypt = require('bcryptjs');
const cloudinary = require('../helper/cloudinary')
const fs = require('fs');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find()
        res.status(200).json({
            message: "All Products In Database",
            data: products
        })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
};


// exports.createProduct = async (req, res, next) => {
//     const {
//         name,
//         description,
//         price,
//         category,
//         stockQuantity,
//         shortDescription,
//         fullDescription,
//         sku,
//         tags,
//         rating
//     } = req.body;

    
//     if (!name || !description || !price || !category || !stockQuantity || 
//         !shortDescription || !fullDescription || !sku || !tags || !rating) {
//         return res.status(400).json({
//             message: "Please provide all required fields" 
//         });
//     }

   
//     if (!req.file || req.file.length === 0) {
//         return res.status(400).json({ 
//             message: "Please upload at least one image" 
//         });
//     }

    
//     // const uploadPromises = req.files.map(async (file) => {
//     //     try {
//     //         const result = await cloudinary.uploader.upload(file.path, {
//     //             folder: "Image Folder",
//     //             use_filename: true
//     //         });
//     //         return result.secure_url; // Return the URL directly
//     //     } catch (err) {
//     //         throw new Error("This is a wrong image: " + err.message);
//     //     }
//     // });


//     const uploadPromises = await cloudinary.uploader.upload(req.file.path, (err)=>{
//         if(err){
//             return res.status(400).json({
//                 message: "This is a wrong image" + err.message

//             })
//         }
//     })

//     // Wait for all the promises to resolve and get the image URLs
//     // const imageUrls = await Promise.all(uploadPromises);



//     // const imageUrl = await uploadImageToCloudinary(req.file.path);

    
//     req.files.forEach((file) => {
//         fs.unlink(file.path, (err) => {
//             if (err) {
//                 console.error(`Error deleting file: ${file.path}`);
//             }
//         });
//     });

    
//     const product = new productModel({
//         name,
//         description,
//         price,
//         category,
//         stockQuantity,
//         shortDescription,
//         fullDescription,
//         sku,
//         tags: tags ? tags.split(',') : [], // Convert tags to array if needed,
//         rating,
//         images: imageUrls
//     });

//     const createdProduct = await product.save();

//     res.status(201).json({
//         status: "Product created successfully",
//         data: { product: createdProduct } // Return the created product in an object
//     });
// };

exports.createProduct = async (req, res, next) => {
    const {
        name,
        description,
        price,
        category,
        stockQuantity,
        shortDescription,
        fullDescription,
        sku,
        tags,
        rating
    } = req.body;

    // Validate Required Fields
    if (!name || !description || !price || !category || !stockQuantity ||
        !shortDescription || !fullDescription || !sku || !tags || !rating) {
        return res.status(400).json({
            message: "Please provide all required fields"
        });
    }

    // Validate Single Image Upload
    if (!req.file) {
        return res.status(400).json({
            message: "Please upload an image"
        });
    }

    try {
        // Upload Single Image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "Image Folder",
            use_filename: true
        });

        // Delete Image from Server After Upload
        fs.unlink(req.file.path, (err) => {
            if (err) {
                console.error(`Error deleting file: ${req.file.path}`);
            }
        });

        // Create Product with Single Image
        const product = new productModel({
            name,
            description,
            price,
            category,
            stockQuantity,
            shortDescription,
            fullDescription,
            sku,
            tags: tags ? tags.split(',') : [], // Convert tags to array if needed
            rating,
            image: result.secure_url// Store the image URL in an array
        });

        const createdProduct = await product.save();

        res.status(201).json({
            status: "Product created successfully",
            data: { product: createdProduct }
        });

    } catch (err) {
        res.status(500).json({
            message: "Error uploading image or creating product: " + err.message
        });
    }
};