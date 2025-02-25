
const userModel = require('../model/userModel')

const sendMail = require('../helper/email');
const jwt = require('jsonwebtoken');
const signUp = require('../helper/signup');
const bcrypt = require('bcryptjs');

exports.createuser = async (req, res)=>{
    try {
        
        const {firstName, lastname, password, country, address,town,postcode,phone,email } =req.body

        if(!firstName || !lastname || !country || !email || !phone || !address ||!town || !postcode || !phone){
            return res.status(400).json({
                message: "All fields are required"
            })
        }

        const checkUser = await userModel.findOne({email: email.toLowerCase()})
        if(checkUser){
            return res.status(400).json({
                message: "user with this email Exists"
            })
        }
        
      
        const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));



        const data = {
            firstName, lastname, password:hash, country, address,town,postcode,phone,email:email.toLowerCase()
        }
    

        const newData = await userModel.create(data);

        //The word "secret_key" is self-defined, actually hidden in the .env file
        const token = await jwt.sign({id:newData._id}, process.env.secret, {expiresIn: '30m'})
        // console.log(token)
        const link = `${req.protocol}://${req.get('host')}/mail/${newData._id}/${token}`
        //console.log(link)
        const subject = "Welcome" + " " + fullName;
        const text = `Welcome ${newData.fullName}, Kindly use this link to verify your email ${link}`;
        await sendMail({ subject: subject, email: newData.email, html:signUp(link, newData.fullName) })
            return res.status(201).json({
            message: "New Student Created Successfully",
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
        const {fullName, password, email, phoneNumber, } =req.body



        const hash = await bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Store hash in your password DB.
        const data = {
            fullName,
            password: hash,
            email: email.toLowerCase(), 
            phoneNumber
        }
        
        const newData = await userModel.create(data);

        if(newData.isAdmin == true){
            return res.status(400).json({message: "Already An Admin"})
           }

           await newData.updateOne({ isAdmin: true });

        //The word "secret_key" is self-defined, actually hidden in the .env file
        const token = await jwt.sign({id:newData._id}, process.env.secret, {expiresIn: '15mins'})
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

        if (await userModel.findOne({ email: email.toLowerCase() })) {
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

        console.log(user);

        // const checkuser = await schoolModel.findById( id )
        if(await userModel.findById(id)){
            user = await userModel.findById(id);
            userRole = 'Admin';
        } else if(await userModel.findById(id)){
            user = await userModel.findById(id);
            userRole = 'user';
        }

       if(user.isVerified == true){
        return res.status(400).json({message: "Email already been verified"})
       }

       //With this method, The verification status might get updated even if the token is invalid or expired, leading to security risks.
    //  await jwt.verify(token, secret_key, (error)=>{
    //     if(error){
    //         return res.status(404).json({
    //             message: "Email Link Has Expired"
    //         })   
    //     }
    //  } )

     try {
        await jwt.verify(token, secret_key);
    } catch (error) {
        return res.status(404).json({
            message: "Email Link Has Expired"
        });
    }

    if(userRole == 'Admin' && user.isAdmin == true){
        await user.updateOne({ isAdmin: true });
        await user.updateOne({ isVerified: true });
       }

    //  await user.updateOne({ isVerified: true });
        // const verifyingMail = await user.findByIdAndUpdate(id, {isVerified:true})
        res.status(200).json({
            message: `${userRole} email verified successfully as an Admin`
        })
    }catch(error){
        console.error(error.message);
        res.status(500).json({
            message: "Internal Server Error: " + error.message
        });
    }
}

