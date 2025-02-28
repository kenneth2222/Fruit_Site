const express = require('express');
require("dotenv").config();
const DATABASE_URL = process.env.DATABASE_URL;
const mongoose = require ('mongoose');
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter');
const cors = require("cors");

// const multer = require ('multer')


const app = express()
app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json())
app.use(userRouter)
app.use(productRouter)
app.use((err,req,res,next)=>{
if (err)
    return res.status(400).json({message:err.message})

next()
}
)


mongoose.connect(DATABASE_URL).then(()=>{

    console.log("Database Connected Succesfully")
    
    app.listen(PORT,()=>{
        console.log(`Server is listening to PORT:${PORT}`)
    })
}).catch((err)=>{
 console.log("unable to connect to db because"+err)
})
const PORT = 2020 



   
