const Sequelize=require('sequelize');

const sequelize=require('../until/database');

const Cartitem=sequelize.define('cartitem',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
})
module.exports=Cartitem;