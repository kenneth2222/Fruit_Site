
const userModel = require('../model/userModel')
const adminModel = require('../model/adminModel');
const sendMail = require('../helper/email');
const secret_key = process.env.secret_key;
const jwt = require('jsonwebtoken');
const signUp = require('../helper/signup');
const bcrypt = require('bcryptjs');

exports.createUser = async (req, res)=>{
    try {
        
        const {firstname, lastname, password, country, address, town, postcode, phone, email } =req.body

        if(!firstname || !lastname || !country || !email || !phone || !address ||!town || !postcode || !phone){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const checkUser = await userModel.findOne({email: email.toLowerCase()})
        if(checkUser){
            return res.status(400).json({
                message: "User with this email already exists"
            })
        }
        
      
        const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));


        const data = {
            firstname, 
            lastname, 
            password: hash, 
            country, 
            address,
            town,
            postcode,
            phone,
            email:email.toLowerCase()
        }
    

        const newData = await userModel.create(data);

        //The word "secret_key" is self-defined, actually hidden in the .env file
        const token = await jwt.sign({id:newData._id}, secret_key, {expiresIn: '30m'})
        // console.log(token)
        const link = `${req.protocol}://${req.get('host')}/mail/${newData._id}/${token}`
        //console.log(link)
        const subject = "Welcome" + " " + firstname;
        const text = `Welcome ${newData.firstname}, Kindly use this link to verify your email ${link}`;
        await sendMail({ subject: subject, email: newData.email, html:signUp(link, newData.firstname) })
            return res.status(201).json({
            message: "New User Created Successfully",
            data: newData
        })

    } catch(error) {
     res.status(500).json({
        message: error.message
     })   
    }
}



exports.createAdmin = async (req, res)=>{
    try {
        // console.log(req);
        const {fullname, password, email, phoneNumber } =req.body

        if(!fullname || !password || !email || !phoneNumber){   
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const checkEmail = await adminModel.findOne({email:email.toLowerCase()})
        if(checkEmail){
            return res.status(400).json({
                message: "Email already exist"
            })
        }


        const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Store hash in your password DB.
        const data = {
            fullname,
            password: hash,
            email: email.toLowerCase(), 
            phoneNumber
        }
        
        const newData = await adminModel.create(data);

        if(newData.isAdmin == true){
            return res.status(400).json({message: "Already An Admin"})
           }

           await newData.updateOne({ isAdmin: true });
        //    await newData.updateOne({ isVerified: true });

        const token = await jwt.sign({id:newData._id}, secret_key, {expiresIn: '24hrs'})

        // try{
        //     const token = await jwt.sign({id:newData._id}, secret_key, {expiresIn: '30m'})
          
        //     if(!token){
        //         const delData = await newData.findByIdAndDelete(newData._id)
        //         return res.status(400).json({message: "Deleted",
        //             data: delData
        //         })
        //        }
        // }
        // catch(error){
        //     res.status(500).json({
        //         message: error.message
        //      })   
        // }
        //The word "secret_key" is self-defined, actually hidden in the .env file
       


     return res.status(201).json({
            message: "New Admin Created Successfully",
            data: newData
        })

    } catch(error) {
     res.status(500).json({
        message: error.message
     })   
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, passWord } = req.body;
        let user;
        let userRole;

        if (await adminModel.findOne({ email: email.toLowerCase() })) {
            user = await adminModel.findOne({ email: email.toLowerCase() });
            userRole = 'Admin';
      
        } else if (await userModel.findOne({ email: email.toLowerCase() })) {
            user = await userModel.findOne({ email: email.toLowerCase() });
            userRole = 'user';
        }

        
        if (!user) {
            return res.status(404).json({
                message: "Email not found"
            });
        }

        // Check if password is correct
        const passwordCorrect = await bcrypt.compare(passWord, user.password);
        if (!passwordCorrect) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }

        
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Email not Verified"
            });
        }

        const token = await jwt.sign({ id: user._id }, secret_key, { expiresIn: '24h' });

        
        const { password, ...userData } = user._doc;

        return res.status(200).json({
            message: `Login Successful as ${userRole}`,
            data: userData,
            token
        });

    } catch (error) {
        res.status(500).json({
            message: "Unable to Login: " + error.message
        });
    }
};
exports.verifyMail = async (req, res) => {
    try{

        const { id, token } = req.params;
        let user;
        let userRole;

        // const checkuser = await schoolModel.findById( id )
        if(await adminModel.findById(id)){
            user = await adminModel.findById(id);
            userRole = 'Admin';
        } else if(await userModel.findById(id)){
            user = await userModel.findById(id);
            userRole = 'User';
        }

       if(user.isVerified == true){
        return res.status(400).json({message: "Email already been verified"})
       }

       

     try {
        await jwt.verify(token, secret_key);
    } catch (error) {
        return res.status(404).json({
            message: "Email Link Has Expired"
        });
    }

    if(userRole == 'Admin' && user.isAdmin == true){
        await user.updateOne({ isVerified: true });
       }
       else if(userRole == 'User' && user.isAdmin == false){
        await user.updateOne({ isVerified: true });
       }

    
        res.status(200).json({
            message: `Email verified successfully as ${userRole}`
        })
    }catch(error){
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error: " + error.message
        });
    }
}
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const {id} = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // Compare old password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Hash new password and update
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
}
};

exports.forgotPassword = async (req, res) => {
    try {
        // const{id} = req.params
        const { email,newPassword } = req.body;
        const user = await userModel.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(404).json({ message: "Email not found" });
        }

        // Create reset token
        const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: "25m" });

        // Send reset link via email
        const link = `${req.protocol}://${req.get("host")}/reset-password/${user._id}/${token}`;
        const text = `Hello ${user.firstname},kindly use this link to reset your password ${link}`
        await sendMail({
            subject: "Password Reset Request"+" "+ user.firstname,
            email: user.email,
            text
            //  html:signup(link, school.fullName) 
        });
        res.status(200).json({ message: "Password reset link sent to email" });
        
        
        // Hash new password and update
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await school.save();
       return res.status(200).json({ message: "Password changed successfully" });

       
    } catch (error) {
        res.status(500).json({ message: error.message });
}
};
exports.resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        
        const checkuser = await userModel.findById( id )
    
        if (!checkuser) {
            return res.status(404).json({ message: "Invalid or expired token" });
        }
// Verify token
        await jwt.verify(req.params.token, secret_key, (error)=>{
            
            if(error){
                return res.status(404).json({
                    message: "Email Link Has Expired"
                })   
            }
         } )

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        checkuser.password = await bcrypt.hash(newPassword, salt);
        await checkuser.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
}
};

exports.getALLUser = async (req,res)=>{
    try {
        const checkerUser = await userModel.find()
        if(!checkerUser){
            return res.status(404).json({massage:'users not found'})
    }
    res.status(200).json({message:'users successfully found',
        data: checkerUser
    })
        
    } catch (error) {
        res.status(500).json({message:eroor.message})
        
    }
} 
exports.getOneUser = async (req,res)=>{
     try {
        const {id} = req.params
        const findUser = await userModel.findById(id)
        if(!findUser){
            return res.status(404).json({message:'user is not found '})
        }
        res.status(200).json({massage:"user found ",
            data:findUser
        })
     } catch (error) {
        res,status(500).json({massage:error.message})
        
     }
}
exports.updateUser = async (req,res)=>{
    try {
        const {id} = req.params
        const updateUser = await userModel.findByIdAndUpdate(id)
        if(!updateUser){
            return res.status(404).json({message:'user not found in the database try again'})
        }
        res.status(200).json({massage:"user found in the database and updated succesfully",
            data:updateUser
        })
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
exports.delete = async (req,res)=>{
    try {
        const {id} = req.params
        const deleteUser = await userModel.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(404).json({message:'user not found in the database try again'})
        }
        res.status(200).json({massage:"user found in the database and deleted succesfully",
            data:deleteUser
        })
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

