const common = require("./common");

module.exports = (sequelize,DataTypes)=>{
    const Class = sequelize.define("class",{
        code:{
            type:DataTypes.STRING(45),
            allowNull:false,
            unique:true,
        },
        title:{
            type:DataTypes.STRING(45),
            allowNull:false,
        },
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        start_count:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue:0,
        },
    },common.sequelizeDefindSecondParams);  

    Class.associate = (db)=>{
        db.Class.belongsTo(db.User,{as:"owner"});
        db.Class.hasMany(db.Comment);
        db.Class.belongsToMany(db.User,{as:"Liker",through:"class_star"});
        db.Class.belongsToMany(db.User,{as:"Student",through:"class_user"});
        db.Class.hasMany(db.Subject);
    }

    return Class;  
}