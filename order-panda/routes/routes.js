const express=require('express')
const router=express.Router();
const maincontrollers=require('../controllers/maincotrollers');
const resetcontrollers=require('../controllers/resetcontrollers');
const isauth=require('../middleware/signupauth')
const logoutauth=require('../middleware/logoutauth');
const otp=require("../controllers/otpverfication");
const userlogin=require('../middleware/userlogin');
const pdfcontrollers=require('../controllers/pdfcontrollers');
const gallerycontrollers=require('../controllers/gallerycontrollers');

router.get('/',maincontrollers.home);

//signup routes
router.get('/signup',logoutauth,maincontrollers.signupget);
router.post('/signup',logoutauth,maincontrollers.signuppost,userlogin.user,otp.otpsignup);
router.post('/resend',userlogin.user,otp.otpsignup);
//....close signup routes
//login routes

router.get('/login',logoutauth,maincontrollers.login);
router.post('/loginform',logoutauth,maincontrollers.login);
router.post('/login',logoutauth,maincontrollers.loginpost);
//close login routes
//...logout.......
router.post('/logout',maincontrollers.logout);
//...close logout.

//........products................
router.get('/product',isauth,maincontrollers.product);
router.get('/addproduct',isauth,maincontrollers.addProduct);
router.post('/addproduct',isauth,maincontrollers.addProductpost);

//product detail
router.get('/productdetails/:id',isauth,maincontrollers.productdetail)
//close the product detail
//........close the products......
//.......cart.....
router.get('/cart',isauth,maincontrollers.cart);
router.post('/deletecart',isauth,maincontrollers.deletecart);
router.post('/add-cart',isauth,maincontrollers.addcartpost);

//.......order....
router.get('/order',isauth,maincontrollers.order);
router.post('/createorder',isauth,maincontrollers.createOrder);

//.........email...........
router.get('/email',isauth,maincontrollers.email);
router.post('/email',isauth,maincontrollers.emailpost);

//........Reset Password.................
router.get('/reset',logoutauth,resetcontrollers.reset);
router.post('/reset',logoutauth,resetcontrollers.resetpost);
//........new password ..................
router.get('/newpassword/:token',logoutauth,resetcontrollers.getresetpassword);
router.post('/newpassword',logoutauth,resetcontrollers.postresetpassword);

//.........Admin products ...............
router.get('/adminproducts',isauth,maincontrollers.adminproducts);
router.post('/adminproduct-delete',isauth,maincontrollers.adminproductsdelete);
router.post('/adminproducts-edit',isauth,maincontrollers.adminproductsedit);
router.post('/admin-edit',isauth,maincontrollers.adminproductseditpost);

router.post('/verify',otp.otpSignuppost);
router.get('/invoice/:orderid',pdfcontrollers.getinvoice);

router.get('/Galleries',userlogin.user,gallerycontrollers.gallery);

router.get('/addimages',userlogin.user,gallerycontrollers.addiimages);
router.post('/addimages',userlogin.user,gallerycontrollers.addiimagespost);

router.get('/',maincontrollers.home);
module.exports=router;