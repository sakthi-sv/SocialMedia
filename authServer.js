require("dotenv").config()
const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
app.use(express.json())
const usercontroller=require("./controller/userController")();

const userRouter=require("./routes/userRouter")(usercontroller);
app.use('/user',userRouter.getRouter());


app.listen(4000, () => {
    console.log("Server running on port : 4000") })