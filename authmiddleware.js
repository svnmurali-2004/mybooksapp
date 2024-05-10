const jsonwebtoken=require("jsonwebtoken")
require("dotenv").config()
 const authmiddleware=async(req,res,next)=>{
    try{
        const xtoken=req.headers.xtoken
        console.log(xtoken)
        const decode=jsonwebtoken.verify(xtoken,process.env.secretkey)
        console.log("auth token verified")
        next()
    }catch(err){
        console.log(err)
        res.status(400).send({acknowledged:false,"msg":"token invalid"})
    }
}

module.exports=authmiddleware