require("dotenv").config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
//import Image from "./API/Image";
import Review from "./API/reviews";
import Order from "./API/orders";

import ConnectDB from "./database/connection";

const zomato=express();//initialsion
zomato.use(express.json());
zomato.use(express.urlencoded({extended:false}));
zomato.use(cors());
zomato.use(helmet());
zomato.use("/auth",Auth);
zomato.use(passport.initialize());
zomato.use(passport.session());

googleAuthConfig(passport);
routeConfig(passport);

zomato.use("/restaurant",Restaurant);
zomato.use("/food",Food);
zomato.use("/menu",Menu);
//zomato.use("/image",Image);
zomato.use("/reviews",Review);
zomato.use("/order",Order);


zomato.get("/", (req,res) => res.json({message: "Let The fun Begin"}));

zomato.listen(420,()=>
ConnectDB().then(()=>console.log("modalpettandi"))
.catch(()=>console.log("try again failed")));