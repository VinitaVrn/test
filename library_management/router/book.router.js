import {Router} from "express";
import { book } from "../controller/book.control.js";
import { Authaccess } from "../middleware/auth.middleware.js";
const bookrouter=Router();

bookrouter.post("/add",Authaccess.authentication,Authaccess.authorization(["librarian"]),book.addbook)
bookrouter.get("/getbook",Authaccess.authentication,Authaccess.authorization(["member","librarian"]),book.getbooks)
bookrouter.post("/updatebook",Authaccess.authentication,Authaccess.authorization(["librarian"]),book.updatebook)
bookrouter.post("/removebook",Authaccess.authentication,Authaccess.authorization(["librarian"]),book.removebook)

export {bookrouter}