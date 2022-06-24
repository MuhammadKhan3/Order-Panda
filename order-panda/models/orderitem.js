const Sequelize=require('sequelize');

const sequelize=require('../until/database');

const Orderitem=sequelize.define('orderitem',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    quantity:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
})
module.exports=Orderitem;