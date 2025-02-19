import {Schema, model} from "mongoose"

const userSchema=new Schema({
 email:{
    type:String
 },
 password:{
    type:String,
    min:3,
    max:8
 },
 role:{
    type:String,
    enum:["user","admin"]
 }
})
 const user= model("user", userSchema)

 export {user}