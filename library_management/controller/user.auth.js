import { user } from "../models/user.model.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const secretkey=process.env.secretkey;

export const register=async(req,res)=>{
    const {username, password, role}= req.body;
    if(!username||!password||!role){
        return res.status(400).json({message:"bad request"})
    }
    try{
        const hashedpass= await argon2.hash(password)
        const newuser={
            username,
            password:hashedpass,
            role
        }
        await user.create(newuser);
        return res.status(201).json({message:"user signup success"})
    }catch(e){
        return res.status(500).json({message:"Internal server error", error:e.message})
    }
}

 export const login =async (req,res)=>{
    const {username,password}=req.body;
    if(!username||!password){
        return res.status(400).json({message:"bad request"})
    }
    try{
      const userdata= await user.findOne({username})  
      if(!userdata){
        return res.status(400).json({message:"user doesn't exixt signup"})
      }
      const correctuser=await argon2.verify(userdata.password,password)
      if(!correctuser){
        return res.status(400).json({message:"user email or password is wrong"})
      }
      console.log(secretkey)
      const token= jwt.sign({
        id:userdata._id,
        role:userdata.role
      },secretkey)
      res.status(200).json({message:"login success",token:token})
    }catch(e){
        res.status(500).json({message:"Internal server error",err:e.message})
    }
 }
 