const router=require("express").Router();
const jwt=require('jsonwebtoken');
class User{
    constructor(userController){
        this.controller=userController
        this.init();
    }
    authenticateAccessToken=(req, res, next)=>{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
          console.log(err)
          if (err) return res.sendStatus(403)
          req.body.id = data.id
          console.log(data.id)
          next()
        })
    }
    authenticateRefreshToken=(req, res, next)=>{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        console.log(token)
        if (token == null) return res.sendStatus(401)
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
          console.log(err)
          if (err) return res.sendStatus(403)
          req.body.id = data.id
          console.log(data.id)
          next()
        })
    }

    init(){
        router.put("/signOut",this.authenticateAccessToken,(req,res)=>{
            this.controller.signOut(
                req.body,
                (code, result) => {
                    res.status(code).send(result)
                }
            )
                
        });
        router.get("/token",this.authenticateRefreshToken,(req,res)=>{
            this.controller.getToken(
                req.body,
                (code,result)=>{
                    res.status(code).send(result)
                }
            )
        })
        router.post("/signIn",(req,res)=>{
            this.controller.signIn(
                req.body,
                (code, result) => {
                    res.status(code).send(result)
                }
            )
                
        });
        router.post("/signUp",(req,res)=>{
            this.controller.signUp(
                req.body,
                (code, data) => {
                    res.status(code).send(data)
                }
            )
                
        });
    }
    getRouter(){
        return router;
    }
}
module.exports=controller =>{
    return new User(controller);
};