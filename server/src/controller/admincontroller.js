const adminmodel = require('../model/adminmodel')

const addAdmin = async (req,res) =>{
    const data = req.body

    const {name,userid ,position} = data

    if(!name) return res.status(400).send({status:false,msg:"name is required"})

    if(!userid) return res.status(400).send({status:false,msg:"userId is required"})

    if(!position) return res.status(400).send({status:false,msg:"position is required"})

    const create = await adminmodel.create(data)
    return res.status(201).send({status:true,msg:"data created successfully",data:create})
 }

 const getAdmin = async (req,res) =>{
   try {
   
    const userId = req.params.userId
    
    if (!userId) {
      return res.status(400).send({ status: false, message: "userId is required!" })
   }
    const getuser = await adminmodel.findOne({_id:userId}) 

    if(!getuser){
       return res.status(404).send({status:false,msg:'user not found',})
    }
    return res.status(200).send({status:true,msg:'details are get' , data:getuser})

} catch (error) {
    return res.status(500).send({status:false,msg:error.msg})
}
 }

 const userAll = async (req,res) =>{
   let data = req.query
   const {name,userid ,position} = data

   let get = await adminmodel.find({...data})

   if(get.length==0){
      return res.status(404).send({status:false,msg:"data not found"})
   }
   return res.status(200).send({status:true,msg:"found data successfully",data:get})
 }


 const updateAddmin = async (req,res) =>{
   try {

    const data = req.body
    const userId = req.params.userId

    let {name,userid,position} = data

    if (!name) {
      return res.status(400).send({ status: false, message: "name is required" })
   }

    if (!userId) {
      return res.status(400).send({ status: false, message: "userId is required" })
   }

   if(!position){
      return res.status(400).send({status:false,msg:"position is required"})
   }

   let exist = await adminmodel.findOne({ _id:userId})
   if (!exist) {
      return res.status(404).send({ status: false, message: `this  does not exist!` })
   }

    let updateUser =  await adminmodel.findOneAndUpdate({_id:userId},{$set:{name:name,position:position,userid:userid}},{new:true})
    return res.status(200).send({status:false,msg:"data updated successfully",data:updateUser})
    
   } catch (error) {
    return res.status(500).send({status:false,msg:error.msg})
   }
 }

 const deleteAdmin = async (req,res) =>{
    try {
        
     const userId = req.params.userId

     if (!userId) {
      return res.status(400).send({ status: false, message: "userId is required" })
   }

   let exist = await adminmodel.findOne({ _id: userId})
      if (!exist) {
         return res.status(404).send({ status: false, message: `this  does n't exist!` })
      }

     let deleteUser = await adminmodel.findOneAndUpdate({_id:userId},{$set:{isDeleted:true}},{new:true})
     return res.status(400).send({status:false,msg:"data deleted successfully",data:deleteUser})

    } catch (error) {
       return res.status(400).send({status:false,msg:error.msg}) 
    }
 }

 module.exports = {addAdmin,getAdmin,updateAddmin,deleteAdmin,userAll}