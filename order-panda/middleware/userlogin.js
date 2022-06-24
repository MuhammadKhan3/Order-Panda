const express=require('express');
const app=express();
const Customer=require("../models/customer");
exports.user=((req,res,next)=>{
    if(!req.session.user){
       return next();
    }
    Customer.findByPk(req.session.user.id).then(user=>{
     req.user=user;
     next()
    }).catch(err=>{
        console.log(err);
    })
 })