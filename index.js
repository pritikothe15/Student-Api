import express from "express"
import mongoose from 'mongoose'
import dotenv from "dotenv";
dotenv.config()

import Student from "./Models/Student.js"

const app = express();
app.use (express.json())

mongoose.connect(process.env.MONGODB_URL,()=>{
    console.log("connected to MongoDB")  
})

app.get("/health",(req , res)=>{
      res.json({
        status:'OK',
        message: 'All Good '
      })
})

app.post('/create-student',async(req,res)=>{
    const {roll,fullName, mobile} = req.body

    const newStudent =new Student({
        roll: roll,
        fullName: fullName,
        mobile: mobile
    })

    const savedStudent = await newStudent.save()

    res.json({
        success: true,
        data : savedStudent
    })

})

app.listen(5000,()=>{
    console.log("server started running at PORT 5000 ")
})