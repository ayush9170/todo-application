require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const {mid_auth} = require("./middleware/user");
const{JWT_USER_SCERET} =require("./confi")




const{router_user} =require("./route/user");
const{router} = require("./route/todo")

const app = express();
app.use(express.json());


app.use(express.static('./public')); 
app.use("/user",router_user);
app.use("/todo",router)


async function current (){
    await mongoose.connect(process.env.mongo_url);
    app.listen(3000);
}
current();