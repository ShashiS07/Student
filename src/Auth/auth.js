const jwt=require('jsonwebtoken')


const authentication=async function(req,res,next){
try{
    let token=req.headers['x-api-key']
    if(!token) return res.status(400).send({status:false,message:"Token is not present"})

    jwt.verify(token,"studentkey",function(error,decoded){
        if(error){
            let msg=error.message==="jwt expired"? "token is expired":"Invalid Token"
            return res.status(401).send({status:false,message:msg})
        }
        req.decoded=decoded
        next();
    })

}catch(error){
    return res.status(500).send({status:false,message:error.message})
}
}

module.exports={authentication}