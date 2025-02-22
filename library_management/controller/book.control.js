import { books } from "../models/books.modell.js";

class bookCRUD{
    addbook=async(req,res)=>{
        const {bookname,author,stock,genre,status}=req.body;
        try{
            const newbook={
                bookname,
                author,
                stock,
                genre,
                status
            }
            await books.create(newbook);
            res.status(201).json({msg:"book added in library"})
        }
        catch(e){
            res.status(500).json({msg:"Internal server error",error:e.msg})
        }
    }

    getbooks=async(req,res)=>{
        try{
           const bookdata= await books.find();
           res.status(200).send(bookdata)
        }catch(e){
            res.status(500).json({msg:"Internal server error",error:e.message})
        }
    }
    updatebook=async(req,res)=>{
        const {bookname,stock,status}=req.body;
        try{
            const bookdata=await books.findOne()
            bookdata.bookname=bookname;
            bookdata.stock=stock;
            bookdata.status=status;
            res.status(200).json({msg:"updated"})
        }catch{
            res.status(500).json({msg:"Internal server error",error:e.message})
        }
    }
    removebook=async(req,res)=>{
        const {bookname}=req.params;
        try{
            await books.deleteOne({bookname})
            res.status(200).json({msg:"book removed"})
        }catch(e){
            res.status(500).json({msg:"Internal server error",error:e.message})
        }
    }
}
export const book=new bookCRUD