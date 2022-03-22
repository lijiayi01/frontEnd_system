const express = require('express')
const userRouter = express.Router()
const UserServices = require('../service/User')

userRouter.get('/getAll', (req, res, next)=>{
    res.json({
        name: 'ja'
    })
})


userRouter.get('/all', UserServices.getAll)
userRouter.post('/add',  UserServices.add)
userRouter.post('/update',  UserServices.update)
userRouter.post('/delete',  UserServices.delete)
module.exports = userRouter