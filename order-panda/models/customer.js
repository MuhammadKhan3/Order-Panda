const Sequelize=require('sequelize');
const sequelize=require('../until/database');

const Customer=sequelize.define('customer',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    resetToken:{
        type:Sequelize.STRING,
    },
    resetTokenExpiration:{
         type:Sequelize.STRING,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    phone:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
module.exports=Customer;