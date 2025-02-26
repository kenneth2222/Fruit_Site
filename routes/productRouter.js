const userModel = require('../model/userModel')
const adminModel = require('../model/adminModel');
const productModel = require('../model/productModel');
const sendMail = require('../helper/email');
const secret_key = process.env.secret_key;
const jwt = require('jsonwebtoken');
const signUp = require('../helper/signup');
const bcrypt = require('bcryptjs');


      