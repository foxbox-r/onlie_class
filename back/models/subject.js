const common = require("./common");

module.exports = (sequelize,DataTypes)=>{
    const Subject = sequelize.define("subject",{
        title:{
            type:DataTypes.STRING(45),
            allowNull:false,
            unique:true,
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:true,
        }, 
        click_count:{
            type:DataTypes.INTEGER,
            defaultValue:0,
            allowNull:false,
        },
    },common.sequelizeDefindSecondParams);  

    Subject.associate = (db)=>{
        db.Subject.belongsTo(db.Class);
    }

    return Subject; 
}