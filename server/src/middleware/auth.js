const jwt = require('jsonwebtoken')

const authenticate = async (req,res,next) =>{
    try {
        let bearertoken = req.headers.authorization

        if(!bearertoken)
        return res
        .status(401)
        .send({ status: false, message: "Token is required" });

        let token = bearertoken.split(" ")[1]

        jwt.verify(token,'secretkey',function(error,decodedToken){
            if(error){
                let message =
          error.message == "jwt expired"
            ? "token expired , login again!"
            : "Invalid token";
        return res.status(401).send({ status: false, message: message });
            }

            req.decodedToken = decodedToken;
            console.log("decoded", decodedToken)
            next();
        })
        
    } catch (error) {
        return res.status(500).send({status:false,msg:error.msg})
    }
}

module.exports ={authenticate}