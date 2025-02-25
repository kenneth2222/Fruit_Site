const userRouter = require ('express').Router()

const {createUser, verifyMail, createAdmin, userLogin} = require ('../controller/userController');

userRouter.get('/mail/:id/:token', verifyMail)
userRouter.post('/mail/:id/:token', createUser)
userRouter.post('/mail/:id/:token', createAdmin)
userRouter.post('/mail/:id/:token', userLogin)

module.exports = router