const express= require("express")
const app=express("express")
const cors=require("cors")
const {MongoClient, ObjectId} =require("mongodb")
const uri=require("./uri")
const cluster=new MongoClient(uri)
const jsonwebtoken=require("jsonwebtoken")
const authmiddleware  = require("./authmiddleware")
const bookSchema=require("./dbschemas/bookSchema")
const bcrypt=require('bcrypt')
require("dotenv").config()
console.log(process.env.secretkey)
cluster.connect().then(console.log("connected to mongodb")).catch(err=>console.log(err))
cluster.setMaxListeners(1)
app.use(cors())
app.use(express.json())

const tokengenerator=(data)=>{
    const xtoken=jsonwebtoken.sign( {_id:data._id}
        , process.env.secretkey,{expiresIn:"10h"});
    return xtoken
}

function comparePasswords(inputPassword, hashedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(inputPassword, hashedPassword, function (err, result) {
            if (err) {
                reject(false);
            } else {
                resolve(result);
            }
        });
    });
}
app.post("/api/signin",async(req,res)=>{
    try{
    const data =req.body
    const accounts=cluster.db("mybookstore").collection("accounts")
    const respo1= await accounts.findOne({_id:data.email})
    if(respo1!=null){
        
        const temp=await comparePasswords(data.password,respo1.password)
    if (temp){
        
        res.send({acknowledged:true,des:"authentication success",loginDetails:respo1,xtoken:tokengenerator({_id:data.email})})

    }else{
        res.send({acknowledged:false,des:"password incorrect"})
    }
}else{
    res.send({acknowledged:false,des:"account doesnot exist"})
}
    }catch(err){
        res.send({acknowledged:true,des:'error occured at our server'})
        console.log(err)
    }


})

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

app.post("/api/signup",async(req,res)=>{
    const data=req.body
    try{
        const accounts=cluster.db("mybookstore").collection("accounts")
        const respo1=await accounts.findOne({_id:data.email})
        if (respo1==null){
            
            const password=await hashPassword(data.password)
            const respo2=await accounts.insertOne({_id:data.email,...data,password:password})
            const respo3=await accounts.findOne({_id:data.email})
            res.send({acknowledged:true,des:"account created",loginDetails:{...respo3,xtoken:tokengenerator({_id:data.email})}})
        }else{
            res.send({acknowledged:false,des:"account aldready exists"})
        }
    }catch(err){
        console.log(err)
        res.send({acknowledged:false,des:'error occured at our server'})
    }
})

app.post('/api/getbooks',authmiddleware,async(req,res)=>{
    try{
        const book=cluster.db("mybookstore").collection("books")
        const books=await book.find({}).toArray()
        res.send({acknowledged:true,books:books})
    }catch(err){
        console.log(err)
    }
})
app.post("/api/downloadbook/:id",authmiddleware,async(req,res)=>{
    try{
        const data=req.params.id
        console.log(data)
        const books= cluster.db("mybookstore").collection("books")
        const respo1=await books.findOne({_id:new ObjectId(data)})
        if (respo1!==null){
            res.status(200).redirect(respo1.download_link)
        }else{
            res.status(404).send({acknowledged:true,des:"invalid request"})
        }
    }catch(err){
        console.log(err)
        res.status(500).send({acknowledged:false,des:"error occured"})
    }
})

app.post("/api/authtoken",async(req,res)=>{
    try{
        const data=req.body
        const accounts=cluster.db("mybookstore").collection("accounts")
        const respo1= await accounts.findOne({_id:data.email})
        console.log(respo1)
        if (respo1!==null){
            if (data.password==respo1.password){
                const xtoken=jsonwebtoken.sign( {_id:respo1._id}
                  , process.env.secretkey,{expiresIn:"10h"});
                console.log(xtoken)
                res.status(200).send({acknowledged:true,xtoken:xtoken})
            }
            
        }else{
            res.status(400).send({acknowledged:false,msg:"token not found"})
        }
    }catch(err){console.log(err)}
})

app.post("/api/tokenverify",authmiddleware)

app.post("/api/bookupload",authmiddleware,async(req,res)=>{
    try{
        console.log("bookupload called")
    const data=req.body
    const books=cluster.db("mybookstore").collection("books")
    const respo1=await books.insertOne(new bookSchema(req.body))
        res.status(200).send({acknowledged:true,insertedId:respo1.insertedId})
    
    }catch(err){
        console.log(err)
        res.status(500).send({acknowledged:false,msg:"server error"})
    }

})

app.listen(3001,()=>{console.log("app running at port 3001")})