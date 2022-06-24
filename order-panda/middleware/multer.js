const express=require('express')
const router=express.Router();

exports.addimages=(req,res,next)=>{    
    req.files.forEach(image=> {
        req.user.createGallery({
        image:image.filename,
        });    
    })
    res.redirect('/Galleries');
}