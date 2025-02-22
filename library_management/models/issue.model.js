import {Schema, SchemaType, model} from "mongoose";
import { books } from "./books.modell.js";
import { user } from "./user.model.js";

const issueSchema=new Schema({
    bookname:{
        type:String,
        required:true
    },
    issueddata:[
        {
            issuedby:{
                type:Schema.Types.ObjectId,
                ref:user
            },
            date:{
                type:Date,
                default:Date.now
            }
        }
   ]
})

const booksIssued=model("booksIssue",issueSchema)
export {booksIssued}