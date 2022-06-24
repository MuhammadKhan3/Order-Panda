const crypto=require('crypto');
const Customer=require('../models/customer');
const nodemailer=require('nodemailer');
const {Op, DatabaseError}=require('sequelize')
const bcrypt=require('bcryptjs');
exports.reset=(req,res,next)=>{
    res.render('Reset',{
        islogin:req.session.islogin,
        csrfToken:req.csrfToken(),
    });
}
exports.resetpost=(req,res,next)=>{
    const email=req.body.email;
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            return res.redirect('/reset');
        }
        const token=buffer.toString('hex');
        Customer.findOne({where:{email:email}}).then(user=>{
            console.log('use',user);
            if(!user){
                res.redirect('/')
             return null;
            }
            user.resetToken=token;
            user.resetTokenExpiration=Date.now()+3600000;
            return user.save();
        }).then(result=>{
            console.log(result);
            if(!result){
                return null;
            }
            let transporter=nodemailer.createTransport({
                service:'gmail',
                auth:{
                    user:'alizain3474@gmail.com',
                    pass:'google327'   
                }
            })
            let mailoptions={
                from:'alizain3474@gmail.com',
                to:email,
                subject:'Email Reset Validation',
                html:`<html>
                <body>
                <h3>Reset the password</h3>
                <p>Reset the password to click the link <a href="http://localhost:8000/newpassword/${token}">Link</a></p>
                </body>
                </html>`
            }
         transporter.sendMail(mailoptions,(err,info)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log('email sent'+info.response);
                }
            }) 
        return   res.redirect('/')
        }).catch(err=>{
            console.log(err);
        })
    })   
}
exports.getresetpassword=(req,res,next)=>{
    const token=req.params.token;
    Customer.findOne({where:{resetToken:token,resetTokenExpiration:{[Op.gt]:Date.now()}}})
    .then(user=>{
        res.render('newpassword',{
            csrfToken:req.csrfToken(),
            userid:user.id.toString(),
            passwordtoken:token
        })
    }).catch(err=>{
        console.log(err);
    })
}
exports.postresetpassword=(req,res,next)=>{
    const userid=req.body.userid;
    const token=req.body.passwordtoken;
    const password=req.body.password;
    const confirmpassword=req.body.confirmpassword;
    let resetuser;  
    console.log(token,userid)
    if(password==confirmpassword){
        console.log('hi');
        Customer.findOne({where:{resetToken:token,resetTokenExpiration:{[Op.gt]:Date.now()},id:userid}}).then(user=>{
            console.log(user);
            resetuser=user;
            return bcrypt.hash(password,12);
        }).then(hashedpassword=>{
            resetuser.password=hashedpassword;
            resetuser.resetToken=undefined;
            resetuser.resetTokenExpiration=undefined;
            return resetuser.save();
        }).then(result=>{
            res.redirect('/login');
        }).catch(err=>{
        })
    }else{
        return res.send("not match password")
    }
}