const multer=require('multer');
const Gallery=require('../models/gallery');

const per_page_images=6;
exports.multipleimage=(req,res,next)=>{
console.log(req.file);
res.redirect('/')
}
exports.gallery=(req,res,next)=>{
    
    const page= +req.query.page || 1;
    let totalitems;
    Gallery.findAndCountAll({raw:true, offset:(page-1)*per_page_images, limit:per_page_images}).then((images)=>{
        totalitems=images.count;
        if(+req.query.page>Math.ceil(totalitems/per_page_images)){
            return res.redirect('/galleries?page=1');
        }
        res.render('galleryproducts',{
            products:images.rows,
            csrfToken:req.csrfToken(),
            islogin:req.session.islogin,
            totalitems:totalitems,
            nextpage:page+1,
            prevpage:page-1,
            currentpage:page,
            hasnextpage:page*per_page_images<totalitems,
            hasprevpage:page>1,
            lastpage:Math.ceil(totalitems/per_page_images),
        });
    }).catch();
}
exports.addiimages=(req,res,next)=>{
    res.render('uploadgallery',{
        islogin:req.session.islogin,
        csrfToken:req.csrfToken(),
    });
}
exports.addiimagespost=(req,res,next)=>{
    console.log(req.files);
    res.redirect('/');
}
