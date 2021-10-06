require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";

import Auth from "./API/Auth";
import ConnectDB from "./database/connection";

const zomato=express();//initialsion
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(cors());
zomato.use(helmet());
zomato.use("/auth",Auth);

zomato.get("/", (req,res) => res.json({message: "SetUp Success Yay!!"}));

zomato.listen(4000,()=>
ConnectDB().then(()=>console.log("modalpettandi"))
.catch(()=>console.log("try again failed")));