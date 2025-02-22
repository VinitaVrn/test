import {Router}  from "express";
import { register,login } from "../controller/user.auth.js";

const userrouter=Router();

userrouter.post("/register",register);
userrouter.post("/login",login)

export {userrouter}