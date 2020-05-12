require("dotenv").config()
const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const models=require('../models')
const Post=models.posts
class PostController{
    async createPost(data,callBack){
        let {content,userId}=data
        const postDetails=await Post.create(
            {content,userId}
        )
        console.log(postDetails)
        callBack(201,postDetails)
    }
    deletePost(data,callBack){
        let {id,userId}=data
        Post.destroy({
            // includes:[{
            //     model:models.comments
            // }],
            where:{
                id,
                userId
            }
            
        }).then(result=> 
            callBack(204,{result}), error => callBack(401, {error})
            )
    }
    updatePost(data,callBack){
        let {id,content,updatedAt,userId}=data
        Post.update(
            {
              content:content,
              updatedAt:Date.now()
            },
            {
              where: {
                id,
                userId
              },
            }
          );
        callBack(204,{})
    }
    async getPost(data,callBack){
        let{userId}=data
        let posts=await Post.findAll({
            attributes: { exclude: ["userId"] },
            include:[{
                model:models.users,
                attributes:['name']
            },{
                model:models.comments,
                attributes: { exclude: ["userId"] },
                include: [{
                    model: models.users,
                    attributes:['name']
                }]
            }
        ],
            where:{
                userId
            },
        })
        callBack(200,posts)
    }
    
}
module.exports=()=>{
    return new PostController();
}