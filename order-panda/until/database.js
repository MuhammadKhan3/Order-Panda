const  Sequelize=require('sequelize');


const sequelize=new Sequelize('hotel','root','ahmad327',{
    dialect:'mysql',
    host:'localhost',
    // query:{raw:true}
},)
module.exports=sequelize;