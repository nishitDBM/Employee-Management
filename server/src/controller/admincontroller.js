const adminmodel = require('../model/adminmodel')

const addAdmin = async (req,res) =>{
    const data = req.body

    const {name,userId ,position} = data

    if(!name) return res.status(400).send({status:false,msg:"name is required"})

    if(!userId) return res.status(400).send({status:false,msg:"userId is required"})

    if(!position) return res.status(400).send({status:false,msg:"position is required"})

    const create = await adminmodel.create(data)
    return res.status(201).send({status:true,msg:"data created successfully",data:create})
 }

 const getAdmin = async (req,res) =>{
   try {
    
  
    const userId = req.params.userId
    
    const getuser = await adminmodel.findOne({_id:userId}) 

    if(!getuser){
       return res.status(400).send({status:false,msg:'user not found',data:getuser})
    }
    return res.status(200).send({status:true,msg:'details are get' , data:getuser})

} catch (error) {
    return res.status(500).send({status:false,msg:error.msg})
}
 }


 const updateAddmin = async (req,res) =>{
   try {

    const data = req.body
    const userIds = req.params.userId

    let {name,userId,position} = data

    let updateUser =  await adminmodel.findOneAndUpdate({_id:userIds},{$set:{name,position,userId}},{new:true})
    if(!updateUser){
        return res.status(404).send({status:false,msg:'userid does not exist', data:updateUser})
    }
    return res.status(400).send({status:false,msg:"data updated successfully",data:updateUser})
    
   } catch (error) {
    return res.status(500).send({status:false,msg:error.msg})
   }
 }

 const deleteAdmin = async (req,res) =>{
    try {
        
     const userId = req.params.userId

     let deleteUser = await adminmodel.findOneAndUpdate({_id:userId},{$set:{isDeleted:true}},{new:true})
     if(deleteUser){
        return res.status(404).send({status:false,msg:"use does not exist"})
     }

    return res.status(400).send({status:false,msg:"data deleted successfully",data:deleteUser})


    } catch (error) {
       return res.status(400).send({status:false,msg:error.msg}) 
    }
 }

 module.exports = {addAdmin,getAdmin,updateAddmin,deleteAdmin}