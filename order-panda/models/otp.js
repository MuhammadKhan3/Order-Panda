const Sequelize=require('sequelize');
const sequelize=require('../until/database');

const Otp=sequelize.define('otp',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false,
    } ,
    otp_verification:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    otp_expiration:{
        type:Sequelize.DATE,
        get(){
            const value= this.getDataValue('otp_expiration').getTime();
            return value;
        }
    },
    verified:{
        type:Sequelize.BOOLEAN,
        allowNull:false,
        defaultValue:false,  
    }
})
module.exports=Otp;