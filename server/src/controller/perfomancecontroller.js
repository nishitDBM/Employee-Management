const perfomancemodel= require('../model/perfomancemodel')

const perfomAdd = async  (req,res) =>{
    try {

  const data = req.body
  const {adminId,content} = data
  
  if(!adminId)  return res.status(400).send({status:false,msg:"performid is required"})

  if(!content)  return res.status(s400).send({status:false,msg:"content is required"})

  let create = await perfomancemodel.create(data)
  return res.status(201).send({status:false,msg:"data created successfully",data:create})

  } catch (error) {
    return res.status(500).send({status:false,msg:error.msg})
  }
}

const performGet = async (req,res) =>{

    try {

    let userId = req.params.userId

    if(!userId){
      return res.status(400).status({status:false,msg:"userId is required"})
    }

    let performUser = await perfomancemodel({_id:userId,})
    return res.status(200).send({status:true,msg:"employee data get successfully",data:performUser})
        
    } catch (error) {
        return res.status(500).send({status:false,msg:error.msg})
    }
}

const getAll = async (req,res) =>{
  let data = req.query
  const {adminId,content} = data

  let get = await perfomancemodel.find({...data})

  if(get.length==0){
     return res.status(404).send({status:false,msg:"data not found"})
  }
  return res.status(200).send({status:true,msg:"found data successfully",data:get})
}

module.exports = {perfomAdd,performGet,getAll}