import {Schema, model} from "mongoose";

const bookSchema= new Schema({
    bookname:{
        type:String,
        required:true
    },
    author:{
        type:String
    },
    stock:Number,
    genre:{
        type:String,
        enum:["fantsy","science fiction","thriler","romance","horror"]
    },
    status:{
        type:String,
        enum:["available","notavailable"]
    }
})

const books=model("books",bookSchema);

export {books}