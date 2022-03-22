const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./controller/userRouter')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.send('htllo')
})

app.use('/user', userRouter)

app.listen(3000, () => {
    console.log(`3000端口已启动`)
})