const router = require("express").Router();
const db = require("../models");
const {Class,User} = db;
const cryptoRandomString = require('crypto-random-string');
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");

// POST /user/join 수업 참여하기
router.post("/join",isLoggedIn,async (req,res,next)=>{
    try{
        const {code,userId} = req.body;
        const exClass = await Class.findOne({
            where:{
                code
            }  
        }); 

        if(!exClass){
            return res.json({
                result:false,
                msg:"찾으려는 수업코드가 없습니다.",
            });
        } 

        await exClass.addStudent(userId); 
        
        const user = await User.findOne({
            where:{
                id:userId,
            }
        });

        const joinedClass = await user.getJoinedClass({
            include:[
                {
                    model:User,
                    as:"owner",
                    attributes:{
                        exclude:["password","createdAt","updatedAt"],
                    }
                }
            ]
        });

        console.log(joinedClass);

        return res.json({
            result:true,
            msg:"코드에 맞는 수업을 찾았습니다.",
            data:joinedClass,
        });
    } catch(error){
        console.error(error);
        next(error);
    }
});


// POST /user 수업 만들기
router.post("/",isLoggedIn,async (req,res,next)=>{
    try{
        console.log(req.body);
        const {title,description,owner} = req.body;
        let code = cryptoRandomString({length:5});

        const exCode = await Class.findOne({
            where:{
                code
            }
        });

        if(exCode){
            code = cryptoRandomString({length:5});;
        }

        const newClass = await Class.create({
            title,
            description,
            ownerId:owner,
            code,
            click_count:0,
            start_count:0,
        });

        const fullClass = await Class.findAll({
            where:{
                ownerId:owner,
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
        });

        return res.json({
            result:true,
            msg:"클래스를 만들었습니다.",
            data:fullClass,
        });

    } catch(error){
        console.error(error);
        next(error);
    }
})

module.exports = router;