const express = require("express");
const bcrypt = require("bcrypt");
require('dotenv').config();
const router_user = express.Router();
const{UserModel,todoModel} = require("../db");
const jwt = require("jsonwebtoken");
const{JWT_USER_SCERET} =require("../confi")





router_user.post("/signup", async function(req,res){


    const{username , password} = req.body;
    const hasedpassword = await bcrypt.hash(password,5);

    try{
    UserModel.create({
        username : username,
        password : hasedpassword
    })

    res.json({
        message : "you are signed in"
    })
}catch(e){
    console.error("error while signup" ,e);
}

})

router_user.post("/signin", async function(req,res){
    const{username,password} =req.body;
    console.log("JWT_USER_SCERET:", JWT_USER_SCERET);
    try{
    const user = await UserModel.findOne({
        username: username,
      
          })
          const passwordMatch = await bcrypt.compare(password,user.password);
          if(user && passwordMatch){
        const token  = jwt.sign({
            id : user._id
        },JWT_USER_SCERET);
    
        res.json({
            token : token
        })
          }
          else{
            res.status(403).json({
                message : "wrong cred"
            })
          }
        }catch(e){
            console.error("error while sign in",e);
        }
})


module.exports={
    router_user : router_user
}

