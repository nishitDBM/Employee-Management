const express = require("express")
const router = express.Router()
const  {register,login} = require('../controller/usercontroller')
const {addAdmin,getAdmin,updateAddmin,deleteAdmin} = require('../controller/admincontroller')
const {perfomAdd,performGet} = require('../controller/perfomanceSchema')
 

// user
router.post('/userRegister',register)
router.post('/userLogin',login)

// admin
router.post('/adminUser',addAdmin)
router.get('/getAdmin',getAdmin)
router.put('./updateAdmin',updateAddmin)
router.delete('./delete',deleteAdmin)

//perform
router.post('addper',perfomAdd)
module.exports =router