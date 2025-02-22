import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import {connect} from "mongoose";
import { userrouter } from "./router/user.route.js";
import { bookrouter } from "./router/book.router.js";
import { issueroute } from "./router/issueroute.js";

const app=express();
const mongodb=process.env.mongo_url

app.use(express.json());
app.use("/user",userrouter)
app.use("/books",bookrouter)
app.use("/book",issueroute)

app.listen(9000,async()=>{
    try{
        await connect(mongodb);
        console.log("db connected")
        console.log("server conneted")
    }catch(e){
        console.log(e.message)
    }
})