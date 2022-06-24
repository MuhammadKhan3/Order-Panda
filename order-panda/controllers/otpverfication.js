const otpGenerator=require('otp-generator');
const nodemailer=require('nodemailer');
const Otp=require('../models/otp');
const {Op}=require('sequelize')

exports.otppage=(req,res,next)=>{
    res.render("otpverification",{
        csrfToken:req.csrfToken(),
        islogin:req.session.islogin,
    });
}
exports.otpsignup=(req,res,next)=>{
    let otp=otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false});
    const time=Date.now()+3600000;
    Otp.findOne({where:{id:req.user.id}}).then((otp1)=>{
        if(otp1){
            otp1.otp_verification=otp;
            otp1.otp_expiration=time;
            return otp1.save();
        }
        return req.user.createOtp({
            otp_verification:otp,
            otp_expiration:time,
        }).then(result=>{
            console.log(result)
        }).catch(err=>{
            console.log(err);
        });
    }).then(result=>{
        console.log(result)
    }).catch()
    // ...........
    res.render("otpverification",{
        csrfToken:req.csrfToken(),
        islogin:req.session.islogin,
    });

    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'alizain3474@gmail.com',
            pass:'google327'
        }
    })
    
    let mailoptions={
        from:'alizain3474@gmail.com',
        to:req.session.user.email,
        subject:'Otp Verification',
        html:`<html>
        <body>
           <h3>Otp Verification</h3><br/>
           <p>don,t share anyone kindly enter the ${otp} code in verification field</p>
        </body>
        </html>`
    }
    transporter.sendMail(mailoptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
              console.log('email send'+info.response);
        }
    })
    next();
}

exports.otpSignuppost=(req,res,next)=>{
    const otpcode=req.body.otp;
    const time=Date.now();

    Otp.findOne({where:{otp_verification:otpcode,otp_expiration:{[Op.gte]:Date.now()}}}).
    then((otp)=>{
        if(!otp){
            return res.redirect("/signup");
        }
            otp.verified=true;
            req.session.otp=true;
            otp.save();
            return res.redirect("/");
    }).
    catch(err=>{console.log(err)})    
}
exports