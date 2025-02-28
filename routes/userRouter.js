const userRouter = require ('express').Router()
const {checkRole,adminRole }= require('../middleware/authorization')
const {createUser, verifyMail, createAdmin, userLogin, changePassword,forgotPassword,resetPassword} = require ('../controller/userController');

userRouter.get('/mail/:id/:token', verifyMail)
// userRouter.post('/user', adminRole, createUser)
userRouter.post('/user', createUser)
userRouter.post('/admin', createAdmin)
userRouter.post('/login', userLogin)
userRouter.post('/change/:id',changePassword)
userRouter.post('/forget',forgotPassword)
userRouter.post('/reset-password/:id/:token', resetPassword)


module.exports = userRouter

