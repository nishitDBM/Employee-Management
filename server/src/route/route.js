const express = require("express")
const router = express.Router()
const  user = require('../controller/usercontroller')
const {addAdmin,getAdmin,updateAddmin,deleteAdmin} = require('../controller/admincontroller')
const {perfomAdd,performGet} = require('../controller/perfomanceSchema')
const { authenticate } = require('../middleware/auth')
 

// user
router.post('/userRegister',user.register)
router.post('/userLogin',user.login)

// admin
router.post('/adminUser',addAdmin,authenticate)
router.get('/getAdmin/:userId',getAdmin,authenticate)
router.put('/updateAdmin',updateAddmin)
router.delete('/delete',deleteAdmin)

//perform
router.post('/addper',perfomAdd)
module.exports =router