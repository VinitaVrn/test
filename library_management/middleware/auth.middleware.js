import { configDotenv } from "dotenv";
configDotenv();
import jwt from "jsonwebtoken";

const secretkey=process.env.secretkey;

class auth{
    authentication=async(req,res,next)=>{
        const token=req.headers["authentication"];
        if(!token){
            return res.status(400).json({msg:"token required"})
        }
        try{
            const decoded=await jwt.verify(token,secretkey)
            req.id=decoded.id;
            req.role=decoded.role;
            next();
        }catch(e){
            res.status(401).json({msg:"Access denied. User is unauthenticated"})
        }
    }

    authorization=function(role){
        return (req,res,next)=>{
            const userrole=req.role
            if(role.includes(userrole)){
                next()
            }else{
                return res.status(403).json({msg:"forbidden"})
            }
        }
    }
}
 export const Authaccess= new auth;