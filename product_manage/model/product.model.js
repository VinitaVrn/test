import {Schema, model} from "mongoose"

const productSchema=new Schema({
    name:{
        type:Stirng
    },
    description:{
        type:String
    },
    price:{
        type:Number
    }
})

const product= model("product",productSchema)

export {product}