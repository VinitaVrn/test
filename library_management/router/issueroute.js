import {Router} from "express";
 import { returnbook, bookIsseuing } from "../controller/bookisssue.control.js";

 const issueroute=Router();

 issueroute.post("/issue",bookIsseuing);
 issueroute.post("/return",returnbook);

 export {issueroute}