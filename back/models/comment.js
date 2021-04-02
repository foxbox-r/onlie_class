const common = require("./common");

module.exports = (sequelize,DataTypes)=>{
    const Comment = sequelize.define("comment",{
        description:{
            type:DataTypes.TEXT,
            allowNull:false,
        },
        like_count:{
            type:DataTypes.INTEGER,
            allowNull:false,
        }
    },common.sequelizeDefindSecondParams);

    Comment.associate = (db)=>{
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Class);
        db.Comment.belongsToMany(db.User,{through:"comment_like"});
    }

    return Comment;
}