import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const secretkey=process.env.secretkey;

export const authentication=async(req,res,next)=>{
    const token=req.headers["authentication"];
    try{
        const decoded=jwt.verify(token,secretkey)
        req.id=decoded.id;
        req.role=decoded.role;
        next();
    }catch(e){
      return res.status(401).json({message:"unauthenticated"})
    }

}