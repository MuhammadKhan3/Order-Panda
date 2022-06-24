const Sequelize=require('sequelize');

const sequelize=require('../until/database');

const Gallery=sequelize.define('gallery',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    image:{
        type:Sequelize.STRING,
        allowNull:false,
    }
})
module.exports=Gallery;