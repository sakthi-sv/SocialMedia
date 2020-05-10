require("dotenv").config()
const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
app.use(express.json())
const usercontroller=require("./controller/userController")();
const userRouter=require("./routes/userRouter")(usercontroller);
const postcontroller=require("./controller/postController")();
const postRouter=require("./routes/postRouter")(postcontroller);
//app.use('/user',userRouter.getRouter());
app.use('/post',postRouter.getRouter());



app.listen(3000, () => {
    console.log("Server running on port : 3000") })