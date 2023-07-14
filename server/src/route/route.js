const express = require("express")
const router = express.Router()

const  {register,login} = require('../controller/usercontroller')
const {addAdmin,getAdmin,updateAddmin,deleteAdmin,userAll} = require('../controller/admincontroller')
const {perfomAdd,performGet, getAll} = require('../controller/perfomancecontroller')
const {authenticate} = require('../middleware/auth')
 

// user
router.post('/userRegister',register)
router.post('/userLogin',login)

// admin
router.post('/adminUser',addAdmin,authenticate)
router.get('/getAdmin/:userId',getAdmin,authenticate)
router.put('/updateAdmin/:userId',updateAddmin,authenticate)
router.delete('/delete/:userId',deleteAdmin,authenticate)
router.get('/userAll',userAll,authenticate)

//perform
router.post('/addperform',perfomAdd)
router.get ('/perform/:userId',performGet)
router.get('/getall',getAll)

module.exports =router