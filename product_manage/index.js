import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import {connect} from "mongoose"
import { userrouter } from "./router/user.route.js";

const app=express();
app.use(express.json());
app.use("/user",userrouter)

const mongo=process.env.mongourl

app.listen(4000,async(req,res)=>{
try{
    await connect(mongo);
    console.log("db connected");
    console.log("server started");
}catch(err){
    console.log(err.message)
}
})