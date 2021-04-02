const router = require("express").Router();
const db = require("../models");
const {Email_auth,User,Class} = db;
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");

const Sequelize = require("Sequelize");
const Op = Sequelize.Op;



// PATCH /me 자신의 정보 수정 요청
router.patch("/",isLoggedIn,async (req,res,next) => {
    try{
        const {name,grade,number,email,userId} = req.body;
        console.log("userId ",userId);

        const userById = await User.findOne({
            where:{
                id:userId,
            }
        });

        const exEmail = await User.findOne({
            where:{
                email
            }
        });

        if(exEmail){
            if(exEmail.id !== userById.id)
                return res.json({
                    result:false,
                    msg:"이미 등록된 이메일이 있습니다.",
                });
        }

        const updatedUser = await User.update(
            {
                name,
                grade,
                number,
                email,
                class:req.body.class
            },
            {where:{id:userId}},
        );

        res.json({
            result:true,
            msg:"사용자의 정보수정이 완료되었습니다.",
        });
    } catch(error){
        console.error(error);
        next(error); // 500 server error
    }
});

// GET /me/:userId 자신의 정보 제공 요청
router.get("/:userId",isLoggedIn,async (req,res,next)=>{
    try{
        const {userId} = req.params;

        const UsertoSend = await User.findOne({
            where:{
                id:userId,
            },
            attributes:{
                exclude:["updatedAt","password","createdAt"],
            }
        });

        const myClasses = await Class.findAll({
            where:{
                ownerId:UsertoSend.id
            },
            order:[
                ["createdAt","DESC"],
            ],
            include:[
                {
                    model:User,
                    attributes:{
                        exclude:["password","createdAt","updatedAt"]
                    },
                    as:"owner"
                }
            ]
        })

        const joinedMyClasses = await UsertoSend.getJoinedClass({
            include:[
                {
                    model:User,
                    as:"owner",
                    attributes:{
                        exclude:["password","createdAt","updatedAt"],
                    },
                    where:{
                        id:{
                            [Op.ne]:UsertoSend.id,
                        }
                    }
                }
            ]
        });

        res.json({
            result:true,
            msg:"사용자의 정보를 재정송했습니다.",
            data:{
                user:UsertoSend,
                myClasses,
                joinedMyClasses,
            }
        })
    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;