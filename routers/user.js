const express = require('express')
const routerUser = express.Router()
const ctrUser = require('../controller/user')

routerUser.post('/register', ctrUser.register)
routerUser.post('/login', ctrUser.login)
routerUser.get('/logout', ctrUser.logout)


module.exports = routerUser