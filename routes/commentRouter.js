const router=require("express").Router();
const jwt=require('jsonwebtoken')
class Comment{
    constructor(commentController){
        this.controller=commentController
        this.init();
    }
    authenticateAccessToken=(req, res, next)=>{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
          
          if (err) return res.sendStatus(403)
          req.body.userId = data.id
        console.log(data.id)
          next()
        })
    }
    init(){
        router.post('/create',this.authenticateAccessToken,(req,res)=>{
            this.controller.createComment(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.put('/view',this.authenticateAccessToken,(req,res)=>{
            this.controller.getComments(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.put('/update',this.authenticateAccessToken,(req,res)=>{
            this.controller.updateComment(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.put('/delete',this.authenticateAccessToken,(req,res)=>{
            this.controller.deleteComments(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })

    }
    getRouter(){
        return router;
    }
}
module.exports=controller =>{
    return new Comment(controller);
};