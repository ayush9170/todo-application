const express = require("express");
const bcrypt = require("bcrypt");
const Route = express.Router;
const {mid_auth} = require("../middleware/user");
const{todoModel} = require("../db");

const router = Route();
router.use(mid_auth);

router.post("/", async function(req,res){
const{title} =req.body;

try{
 await  todoModel.create({
    userId : req.id,
    title :title,
    completed : false
})

res.json({
    message : "todo created"
})
}catch(e){
    console.error("error while creating",e);
}

})


router.get("/",async function(req,res){
    try {
        const todos = await todoModel.find({ userId: req.id });

        res.json({
            todos: todos,
        });
    } catch (error) {
        console.error("hello",error)
        res.status(500).json({
            msg: "Error fetching todos",
            error: error.message,
          
        });
    }
    
})

router.put("/:id",async function(req,res){
    const { id } = req.params; 
    const obj =req.body;

    try{
   await todoModel.updateOne({
        _id:id
    },{
    
        completed:obj.completed
    })
    res.json({
        message:"you have updated"
    })
}catch(e){
console.error("error while creating" , e)
}

})

module.exports ={
    router :  router
} 

