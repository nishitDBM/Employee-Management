const perfomancemodel= require('../model/perfomancemodel')

const perfomAdd = async  (re,res) =>{
    try {

  const data = req.body
  const {performId,content} = data
  
  if(!performId)  return res.status(400).send({status:false,msg:"performid is required"})

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

    let performUser = await perfomancemodel({_id:userId,})
    return res.status(200).send({status:true,msg:"employee data get successfully",data:performUser})
        
    } catch (error) {
        return res.status(500).send({status:false,msg:error.msg})
    }
}

module.export = {perfomAdd,performGet}