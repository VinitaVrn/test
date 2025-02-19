import { product } from "../model/product.model.js";

export const addproduct=async(req,res)=>{
    const role=req.role;
    if(role=="user"){
        return res.status(403).json({mssg:"unauthorized"})
    }
    const id=req.id;
    const {name,description,price}=req.body;
    if(!name||!description||!price){
        return res.status(400).json({msg:"bad request"})
    }
    try{
        const newproduct={
            name,
            description,
            price
        }
        await product.create(newproduct)
        res.status(201).json(newproduct)
    }catch(e){
        res.status(500).json({msg:"internal server error"})
    }
}

export const getproduct=async(req,res)=>{
    try{
        const data=await product.find();
        res.status(200).json(data)
    }catch(e){
        res.status(500).json({msg:"internal server error"})
    }
}