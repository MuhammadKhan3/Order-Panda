const Customer=require('../models/customer');
const nodemailer=require('nodemailer');
const Order=require('../models/order');
const Product=require('../models/product');
const bcrypt=require('bcryptjs');
const path = require('path');
const fs=require('fs')
const file=require('../until/filedelet');
const { count } = require('console');

exports.home=(req,res,next)=>{
    res.render('home',{
        islogin:req.session.islogin,
        csrfToken:req.csrfToken(),
    });
}
//.........Signup system...................
exports.signupget=(req,res,next)=>{
    res.render('signup',{
        csrfToken:req.csrfToken(),
        islogin:false,
    });
}
const item_per_page=6;
exports.signuppost=(req,res,next)=>{
    const name=req.body.name.toLowerCase();
    const phoneno=req.body.phoneno;
    const email =req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    console.log(password,confirmPassword);
    if(name && phoneno && email){
        Customer.findOne({where:{email:email}}).then(result=>{
                if(result){
                    return res.redirect('/signup');
                }
                if(password===confirmPassword){
                    return bcrypt.hash(password,12).then(hashpassword=>{
                        Customer.create({
                            name:name,
                            email:email,
                            phone:phoneno,
                            password:hashpassword,
                        }).then(result=>{
                            req.session.islogin=true;
                            req.session.user=result;
                            req.session.save();

                            next();
                        }).catch(err=>{
                            console.log(err);
                        })
                    }).catch(err=>{
                        console.log(err);
                    })
                }else{
                    console.log("password not match");
                }
        }).then(result=>{
            console.log(result);
        });
    }else{
        console.log('not fill all field kindly check');
    }
}
//login system...................
exports.login=(req,res,next)=>{
    res.render("login",{
        csrfToken:req.csrfToken(),
    });
}
exports.loginpost=(req,res,next)=>{
    const email= req.body.email;
    const password=req.body.password;
    if(email && password){
        Customer.findOne({where:{email:email}}).then(user=>{
            if(!user){
                return res.redirect('/signup');
            }
            return bcrypt.compare(password,user.password).then(match=>{
                if(match){
                    req.session.islogin=true;
                    req.session.user=user;
                    user.getOtps().then(otp=>{
                          req.session.otp=otp.verified;
                      }).catch();           
                     req.session.save();
                     return res.redirect("/");
                }
                return console.log('password not correct try again');
            }).then((user)=>{

            }).catch(err=>{
                console.log(err);
            })
        }).catch(err=>{
            console.log(err);
        })
    }else{
        console.log('email and password check');
    }
}
//close the login system.........

//........logout system
exports.logout=(req,res,next)=>{
    req.session.destroy();
    res.redirect('/login');
}
//......close logout system

//........product..........
exports.product=(req,res,next)=>{
    const page= +req.query.page || 1;
    let totalitems;
    Product.findAndCountAll({offset:(page-1)*item_per_page , limit:item_per_page})
    .then((product)=>{
        if(+req.query.page>Math.ceil(product.count/item_per_page)){
            return res.redirect('/product');
        }
        totalitems=product.count;
        res.render('product',{
            islogin:req.session.islogin,
            csrfToken:req.csrfToken(),
            product:product.rows,
            totalitems:totalitems,
            hasprevpage:page > 1,
            hasnextpage: page *item_per_page <totalitems,
            nextpage:page+1,
            currentpage:page,
            prevpage:page-1,
            lastpage:Math.ceil(totalitems/item_per_page),
        });
    }).catch();
    

}

exports.fetchProducts=(req,res,next)=>{
}
//.....close product.......
//.........cart............
exports.cart=(req,res,next)=>{
    req.user.getCart().then(cart=>{
        if(!cart){
            return res.redirect('/product');
        }
        return cart.getProducts();
    }).then(product=>{
        console.log(product);
        res.render('cart',{
            islogin:req.session.islogin,
            csrfToken:req.csrfToken(),
            product:product,
        });
    }).catch(err=>{
    })

    req.user.getCart().then(cart=>{
        if(cart){
            return cart.save();
        }
        return req.user.createCart();
    }).catch(err=>{

    })
}
exports.addcartpost=(req,res,next)=>{
    const prodid=req.body.id;
    let fetchedcart;
    let newquantity=1;
    req.user.getCart().then(cart=>{
        fetchedcart=cart;
        return cart.getProducts({where:{id:prodid}});
    }).then(products=>{
        let product;
        if(products.length>0){
            product=products[0];
        }
        let quantity;
        if(product){
           console.log(product);
           quantity=product.cartitem.quantity+1;
           newquantity=quantity;
           return product;
        }
        return Product.findByPk(prodid);
    }).then(product=>{
        return fetchedcart.addProduct(product,{through:{quantity:newquantity}})
    }).then(result=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err);
    })

}
exports.deletecart=(req,res,next)=>{
    const productid=req.body.productid;
    console.log(productid);
    req.user.getCart().then(cart=>{
        return cart.getProducts({where:{id:productid}});
    }).then(products=>{
        console.log(products);
        const product=products[0];
        return product.cartitem.destroy();
    }).then(result=>{
        res.redirect('/cart');
    }).catch(err=>{
        console.log(err);
    })
}
//....close cart...........
//........Order............
exports.createOrder=(req,res,next)=>{
    let fetchedcart;
    req.user.getCart().then(cart=>{
        fetchedcart=cart;
        return cart.getProducts();
    }).then(products=>{
        console.log(products);
        return req.user.createOrder()
        .then(order=>{
            return order.addProducts(
            products.map(product=>{
                console.log(product.cartitem.quantity);
                product.orderitem={quantity:product.cartitem.quantity}
                return product;
            }))
        }).then(result=>{
            return   fetchedcart.setProducts(null);
        }).then(result=>{
            res.redirect('/order');
        }).catch(err=>{
            console.log(err);
        })
    }).then(result=>{
        res.redirect('/order');
    }).catch(err=>{
        console.log(err);
    })
}
exports.order=(req,res,next)=>{
    req.user.getOrders({include:['products']}).then(order=>{
        console.log(order)
            res.render('order',{
                islogin:req.session.islogin,
                csrfToken:req.csrfToken(),
                product:order,
            });
    }).catch(err=>{
        console.log(err);
    })
}

//.....close cart..........


//.....Add product

exports.addProduct=(req,res,next)=>{
    res.render('addproduct',{
        islogin:req.session.islogin,
        csrfToken:req.csrfToken(),
    })
}

exports.addProductpost=(req,res,next)=>{
    const name=req.body.name.toLowerCase();
    const price=req.body.price;
    let imageurl=req.file;
    imageurl=imageurl.path;
    imageurl=imageurl.substr(14);
    Product.findOne({where:{name:req.body.name}}).then(result=>{
               if(result){
                   res.redirect('/');
                   return console.log('Already exist');
               }
               return req.user.
               createProduct({
                   name:name,
                   price:price,
                   imageurl:imageurl,
               }).then(result=>{
                   res.redirect('/product');
                   console.log(result);
               }).catch(err=>{
                   console.log(err);
               })       
    }).catch(err=>{
        console.log(err);
    })
}
//.......close Add product
//........product detail...................
exports.productdetail=(req,res,next)=>{
    Product.findByPk(req.params.id).then(product=>{
        console.log(product);
        res.render('productdetail',{
            csrfToken:req.csrfToken(),
            product:product,
        })
    })
}
//........close the product detail.........

//.........Email...............
//.....transporter.............
exports.emailpost=(req,res,next)=>{
    const email=req.body.email;
    const subject=req.body.subject;
    const text=req.body.text;
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
        subject:subject,
        text:text,
    }
    transporter.sendMail(mailoptions,(err,info)=>{
        if(err){
            console.log(err);
        }else{
            console.log('email sent'+info.response);
        }
    })
}
exports.email=(req,res,next)=>{
    res.render('Email',{
        csrfToken:req.csrfToken(),
        islogin:req.session.islogin,
    });
}
//.......Admin Products............
exports.adminproducts=(req,res,next)=>{
    const page= +req.query.page || 1;
    Product.findAndCountAll({offset:(page-1)*item_per_page,limit:item_per_page})
    .then(products=>{
        const totalitem=products.count;
        const product=products.rows;
        if(+req.query.page>Math.ceil(totalitem/item_per_page)){
            return res.redirect('/adminproducts?page=1');
        }
        res.render('admin',{
            csrfToken:req.csrfToken(),
            islogin:req.session.islogin,
            product:product,
            totalitems:totalitem,
            nextpage:page+1,
            prevpage:page-1,
            currentpage:page,
            hasprevpage:page>1,
            hasnextpage:page*item_per_page<totalitem,
            lastpage:Math.ceil(totalitem/item_per_page),
        })
    }).catch(err=>{
        console.log(err);
    })
}
exports.adminproductsdelete=(req,res,next)=>{
    const id=req.body.id;
    Product.findOne({where:{id:req.body.id}})
    .then(product=>{
        if(product.customerId!==req.user.id){
            return res.redirect('/adminproducts');            
        }
        console.log(product.imageurl);
        file.deletefile("./public/images/"+product.imageurl);
        return product.destroy();
    }).then(result=>{
        res.redirect("/");
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.adminproductsedit=(req,res,next)=>{
    const id=req.body.id;
    Product.findOne({where:{id:id}})
    .then(product=>{
        if(!product){
            return res.redirect('/adminproducts');
        }
        res.render('editproducts',{
            csrfToken:req.csrfToken(),
            product:product,
            islogin:req.session.islogin,
        })
    })
    .catch(err=>{
        console.log(err);
    })
}
exports.adminproductseditpost=(req,res,next)=>{
    const name=req.body.name;
    const price=req.body.price;
    const imageurl=req.body.imageurl;
    const id=req.body.productid;
    console.log(name,price,imageurl,id);
    Product.findOne({where:{id:id}}).then(product=>{
        if(product.customerId!==req.user.id){
            return res.redirect('/signup')
        }
        product.name=name;
        product.price=price;
        product.imageurl=imageurl;
        return product.save();
    }).then(result=>{
        res.redirect('/adminproducts');
    }).catch(err=>{
        console.log(err);
    })
}

//.........pdf...........
exports.getinvoice=(req,res,next)=>{
    const orderid=req.params.orderid;
    console.log(orderid)
    const invoicenumber='invoice.pdf';
    const invoicepath=path.join('data','invoices',invoicenumber);
    
    var file = fs.createReadStream('./public/invoices/invoice.pdf');
    var stat = fs.statSync('./public/invoices/invoice.pdf');
    res.setHeader('Content-Length', stat.size);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
    file.pipe(res);

}