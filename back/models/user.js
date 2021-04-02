const common = require("./common");

module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define("user",{
        email:{
            type:DataTypes.STRING(50),
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING(70),
            allowNull:false,
        },
        name:{ 
            type:DataTypes.STRING(15),
            allowNull:false,
        },
        grade:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        class:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        number:{
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        profile_img:{
            type:DataTypes.STRING(45),
            allowNull:true, 
        }, 
    },common.sequelizeDefindSecondParams);  

    User.associate = (db)=>{
        db.User.hasMany(db.Class);
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Class,{through:"class_star"});
        db.User.belongsToMany(db.Class,{as:"JoinedClass",through:"class_user"});
        db.User.belongsToMany(db.Comment,{as:"Comment",through:"comment_like"});
    };

    return User;
}