import {Router}  from "express";
import { register,login } from "../controller/user.control.js";

const userrouter=Router();

userrouter.post("/register",register);
userrouter.post("/login",login)

export {userrouter}