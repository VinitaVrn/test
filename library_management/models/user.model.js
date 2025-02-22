import {Schema,model} from "mongoose"

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        min:3
    },
    role:{
        type:String,
        enum:["member","librarian"]
    }
})

const user= model("user",userSchema)
export{user}