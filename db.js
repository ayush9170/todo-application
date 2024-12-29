const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const ObjectId =Schema.ObjectId;

const user = new Schema({
    username : String,
    password : String,
})

const todo = new Schema({
    userId: ObjectId,
    title: String,
    completed: Boolean,
})


const UserModel = mongoose.model("user", user);
const todoModel = mongoose.model("todo",todo)

module.exports = {
UserModel,
todoModel
}