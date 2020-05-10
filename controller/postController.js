require("dotenv").config()
const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const models=require('../models')
const Post=models.posts
class PostController{
    putPost(data,callBack){
        let {content,userId}=data
        Post.create(
            {content,userId}
        )
        callBack(201,{})
    }
    
}
module.exports=()=>{
    return new PostController();
}