const router=require("express").Router();
const jwt=require('jsonwebtoken')
class Post{
    constructor(postController){
        this.controller=postController
        this.init();
    }
    authenticateToken=(req, res, next)=>{
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
        router.post('/create',this.authenticateToken,(req,res)=>{
            this.controller.createPost(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.put('/delete',this.authenticateToken,(req,res)=>{
            this.controller.deletePost(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.put('/update',this.authenticateToken,(req,res)=>{
            this.controller.updatePost(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.get('/view',this.authenticateToken,(req,res)=>{
            this.controller.getPost(
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
    return new Post(controller);
};