const express= require("express")
const app=express("express")
const cors=require("cors")
const {MongoClient} =require("mongodb")
const uri=require("./uri")
const cluster=new MongoClient(uri)
cluster.connect().then(console.log("connected to mongodb")).catch(err=>console.log(err))
app.use(cors())
app.use(express.json())


app.post("/api/signin",async(req,res)=>{
    try{
    const data =req.body
    const accounts=cluster.db("mybookstore").collection("accounts")
    const respo1= await accounts.findOne({_id:data.email})
    console.log(respo1)
    if(respo1!=null){
    if (data.password===respo1.password){
        res.send({acknowledged:true,des:"authentication success",loginDetails:respo1})

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

app.post("/api/signup",async(req,res)=>{
    const data=req.body
    try{
        const accounts=cluster.db("mybookstore").collection("accounts")
        const respo1=await accounts.findOne({_id:data.email})
        console.log(respo1)
        if (respo1==null){
            const respo2=await accounts.insertOne({_id:data.email,...data})
            const respo3=await accounts.findOne({_id:data.email})
            res.send({acknowledged:true,des:"account created",loginDetails:respo3})
        }else{
            res.send({acknowledged:false,des:"account aldready exists"})
        }
    }catch(err){
        console.log(err)
        res.send({acknowledged:false,des:'error occured at our server'})
    }
})

app.listen(3001,()=>{console.log("app running at port 3001")})