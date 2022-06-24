const express=require('express');
const app=express();
const routes=require('./routes/routes');
const path=require('path');
const userlogin=require('./middleware/userlogin');
const multer=require('multer');

//session
const session=require('express-session');
const sessionStore=require('connect-session-sequelize')(session.Store);
//close session

// ........csrf token...........
const csrf=require('csurf');
const csrfprotection=csrf();
//........csrf tokens...........
// ..........database..............
const sequelize=require('./until/database');
const Customer=require('./models/customer');
const Product=require('./models/product');
const Cart=require('./models/cart');
const Cartitem=require('./models/cartitem');
const bodyParser=require('body-parser');
const Order=require('./models/order');
const Otp=require('./models/otp');
const Gallery=require('./models/gallery');
const Orderitem=require('./models/orderitem');
const connectLivereload = require("connect-livereload");



//......file
//.....

app.use(connectLivereload());

const livereload = require('livereload');
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
liveReloadServer.server.once("connection", () => {
   setTimeout(() => {
      liveReloadServer.refresh("/");
   }, 100);
});


app.use(bodyParser.urlencoded({extended:false}));

//close body parser..
const store=new sessionStore({
   db:sequelize,
})
// ..........close database........
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
app.use(express.static('public'))
app.use(session({name:'session_create',secret:'session', store:store,resave:false,saveUninitialized:true}));

const filestorage=multer.diskStorage({
   destination:(req,file,cb)=>{
       cb(null,'public/pictures')
   },
   filename:(req,file,cb)=>{
       cb(null,Date.now()+file.originalname)
   }
});
const filter=(req,file,cb)=>{
   console.log(file);
   if(file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
      cb(null,true);
   }else{
      cb(null,false);
   };
}

const multerimage=multer({storage:filestorage,fileFilter:filter}).array('galleryimages',5);
const image=require('./middleware/multer')
app.post('/addimages',multerimage,userlogin.user,image.addimages)
// app.post('/addimages',multerimage,()=>)
//...........

const imagestorage=multer.diskStorage({
   destination:(req,file,cb)=>{
      cb(null,'public/images');
   },
   filename:(req,file,cb)=>{
      cb(null,Date.now()+file.originalname);
   }
});

const imagemul=multer({storage:imagestorage}).single('image');

app.use(imagemul);
//........customer to product realationship
//......close customer to product relationship

// app.post("/addimages",multerimage.addimages);
app.use(csrfprotection);

app.use(userlogin.user);
app.use('/',routes);
Customer.hasMany(Product);
   Product.belongsTo(Customer);   
   Customer.hasOne(Cart);
   Cart.belongsTo(Customer);
   //
   Cart.belongsToMany(Product,{through:'cartitem'});
   Product.belongsToMany(Cart,{through:'cartitem'});
   
   Order.belongsTo(Customer);
   Customer.hasMany(Order);
   Order.belongsToMany(Product,{through:'orderitem'});
   Customer.hasMany(Otp);
   Otp.belongsTo(Customer);
   Customer.hasMany(Gallery);
   Gallery.belongsTo(Customer);

   sequelize.sync().then(result=>{
   }).catch((err)=>{
      console.log(err);
})
app.listen(8000)