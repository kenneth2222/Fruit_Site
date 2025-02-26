const userModel = require('../model/userModel')
const adminModel = require('../model/adminModel');
const productModel = require('../model/productModel');
const sendMail = require('../helper/email');
const secret_key = process.env.secret_key;
const jwt = require('jsonwebtoken');
const signUp = require('../helper/signup');
const bcrypt = require('bcryptjs');

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