require("dotenv").config()
const express=require('express')
const app=express()
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
app.use(express.json())

const postcontroller=require("./controller/postController")();
const postRouter=require("./routes/postRouter")(postcontroller);
const commentcontroller=require("./controller/commentController")();
const commentRouter=require("./routes/commentRouter")(commentcontroller);
//app.use('/user',userRouter.getRouter());
app.use('/post',postRouter.getRouter());
app.use('/comment',commentRouter.getRouter());



app.listen(3000, () => {
    console.log("Server running on port : 3000") })