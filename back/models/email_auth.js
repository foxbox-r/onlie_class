const common = require("./common");

module.exports = (sequelize,DataTypes)=>{
    const Email_auth = sequelize.define("email_auth",{
        email:{
            type:DataTypes.STRING(50),
            allowNull:false,
        },
        code:{
            type:DataTypes.STRING(5),
            allowNull:false,
        }, 
        type:{
            type:DataTypes.STRING(5), 
            allowNull:false,
        },
        is_certified:{
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
    },common.sequelizeDefindSecondParams);

    Email_auth.associate = (db)=>{ 
    }

    return Email_auth;
}