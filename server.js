const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const mongoURL=process.env.config
const app=express()
const schema=require('./models/user')


const users=[
    {email:"alice@example.com",password:"alice123",_id:123},
    {email:"bob@example.com",password:"bob123",_id:234},
    {email:"charlie@example.com",password:"charlie123",_id:456}
]





app.get('/',(req,res)=>{
    res.send('hi')
})

app.get(`/delete/:id`,(req,res)=>{
    const id=req.params.id
    const {email,password,_id}=req.query
    console.log(email,password)
    if (!email){
        return res.status(400).json("Email not found")
    }
    if(!password){
        return res.status(400).json("Password not found")
    }
    try{
    const existing=users.find(i=>i._id===id)
    users.splice(existing)
    res.status(200).json("deleted successfully")
    }catch(error){
        return res.status(500).json(error)
    }
})

app.put(`/put/:id`,async(req,res)=>{
    const id=req.params.id
    const {email,password}=req.body
    console.log(email,password)
    if (!email){
        return res.status(400).json("Email not found")
    }
    if(!password){
        return res.status(400).json("Password not found")
    }
    const user=await schema.findByIdAndUpdate(id,{email,password},{new:true})
    res.status(200).json("updated Successfully")


})

const PORT=10000
app.listen(PORT,()=>{
    try{
        mongoose.connect(mongoURL)
        console.log("connected")
    }
    catch(error){
        console.log(error)
    }
    console.log(`listening on http://localhost:${PORT}`)
})
