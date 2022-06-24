const Sequelize=require('sequelize');
const sequelize=require('../until/database');

const Product=sequelize.define('product',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false,
    },
    imageurl:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
module.exports=Product;