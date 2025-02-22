import { booksIssued } from "../models/issue.model.js";
import { user } from "../models/user.model.js";
import { books } from "../models/books.modell.js";

export const bookIsseuing=async(req,res)=>{
    const {bookname,username}=req.body;
    try{
        if(!bookname||!username){
            return res.status(400).json({msg:"bad request"})
        }
        const userdata=await user.find(username)
        if(!userdata){
            return res.status(404).json({msg:"member doesn't exist"})
        }
        const bookdata=await books.find(bookname)
        if(bookdata.stock<1){
            return res.status(400).json({msg:"book out of stock"})
        }
        bookdata.stock-=1;
        await bookdata.save();
        const newbookissue={
            bookname:bookname,
            issueddata:[
                {
                    issuedby:userdata._id
                }
            ]
        }
        await booksIssued.create(newbookissue)
        res.status(200).json({msg:"book issued"})
        
    }catch(e){
        console.log(e.message)
        res.status(500).json({msg:"Internal server error"})
    }
}

export const returnbook=async(req,res)=>{
    const {bookname,username}=req.body;
    if(!bookname||!username){
        return res.status(400).json({msg:"bad request"})
    }
    const bookdata=await books.find(bookname)
    bookdata.stock+=1;
    await bookdata.save();
    const userdata=await user.find(username)
    await booksIssued.updateOne({bookname},{ $pull: { issueddata: { issuedby: userdata._id } } })
    return res.status(200).json({msg:"book return success"})
}