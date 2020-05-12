require("dotenv").config()
const express=require('express')
const app=express()
const jwt=require('jsonwebtoken')
const models=require('../models')
const Comment=models.comments
class CommentController{
    createComment(data,callBack){
        let {comment,postId,userId}=data;
         Comment.create({
            comment,
            postId,
            userId
        }).then(commentdetails => 
            callBack(201,commentdetails)
            ,(error)=> {
                callBack(401,error)
            })
    }
    getComments(data,callBack){
        let {postId}=data;
        Comment.findAll({
            include:[{
                model:models.users,
                attributes:['name']
            }],
            where:{
                postId
            }
        }).then(commentdetails=>
            callBack(200,commentdetails)
            ,(error)=>
            callBack(401,error)
        )
        
    }
    updateComment(data,callBack){
        let {id,comment,userId}=data;
        Comment.update(
            {
                comment:comment,
                updatedAt:Date.now()
            },
            {
                where:{
                    id,
                    userId
                }
            }
        ).then(result => callBack(201,result)
        , error => callBack(401,error)
        )
    }
    deleteComment(data,callBack){
        let {id,userId}=data;
        comment.destroy(
            {
                where:{
                    id,
                    userId
                }
            }
        ).then(result => callBack(201,result)
        , error => callBack(401,result)
        )
    }
}
module.exports=()=>{
    return new CommentController();
}