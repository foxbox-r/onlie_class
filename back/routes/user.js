const router = require("express").Router();
const db = require("../models");
const {Email_auth,User,Class} = db;
const jwt = require("jsonwebtoken");
const {isLoggedIn,isNotLoggedIn} = require("./middlewares");
const smtpTransport = require("../email_author");
const {getRandom} = require("../utill");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Sequelize = require("Sequelize");
const Op = Sequelize.Op;
dotenv.config();

router.get("/",async (req,res,next)=>{})

router.post("/regist",async (req,res,next) => {
    try{
        const {name,grade,clas,number,email,password} = req.body;
        // console.log(name,grade,clas,number,email,password);
        
        const exUser = await User.findOne({
            where:{
                email
            }
        });

        if(exUser){
            console.log("이메일이 이미 있습니다.");
            return res.json({
                result:false,
                msg:"이미 사용중인 이메일이 있습니다."
            });
        }
        
        const hashedPassword = bcrypt.hashSync(password,9);
        
        await User.create({
            email,
            grade,
            class:clas,
            number,
            password:hashedPassword,
            name,
        });

        return res.json({
            result:true,
            msg:"회원가입이 성공했습니다."
        });
    } catch(error){
        console.error(error);
        next(error); // 500 server error
    }
});

router.post("/checkCode",async(req,res,next)=>{
    try{
        const {email,code,type} = req.body;

        const auth = await Email_auth.findOne({
            order:[
                ['createdAt', 'DESC'],
            ],
            where:{
                email,
                type:""+type,
            },
            attributes:{
                include:["email","code","type"]
            }
        });

        let output;
        if(auth){
            if(auth.code === code){
                output = {
                    result:true,
                    msg:"인증코드가 일치합니다."
                };
                auth.is_certified = true;
                await auth.save();
            } else{
                output = {
                    result:false,
                    msg:"이메일이 존재하지만 코드가 일치하지 않습니다."
                }
            }
        } else{
            output = {
                result:false,
                msg:"요청한 이메일이 없습니다."
            };
        }
        return res.json(output);
    } catch(error){
        console.error(error);
        next(error);
    }
})

router.post("/emailAuth",async(req,res,next)=>{
    try{
        const {email,type} = req.body;
        const code = getRandom()+"";
        const html = `
        <style>
            input{background:white;}
        </style>
        <h1>회원가입 이메일 인증</h1>
        <p><b>인증코드 : ${code}</b></p>
        `; 

        await Email_auth.create({
            email,
            code,
            type,// 회원가입 인증
            is_certified:false,
        });

        const mailOptions = {
            from: "foxboxr@gmail.com",
            to: email,
            subject: "test email auth",
            html
        };
        
        let output;

        await smtpTransport.sendMail(mailOptions, (error, responses) =>{
            if(error){
                output = {
                    result:false,
                    msg:"찾지못하는 이메일,서버에서 인증코드를 보내는 과정에서 에러발생",
                };
            }else{
                output = {
                    result:true,
                    msg:"서버에서 인증코드를 보냈습니다.",
                };
            }
            smtpTransport.close();
            return res.json(output); 
            }
        );
    } catch(error){
        console.error(error);
        next(error);
    }
});

router.post("/logout",isLoggedIn,async (req,res,next)=>{
    try{
        // res.clearCookie("access_token");
        return res.json({
            result:true,
            msg:"로그아웃이 성공적으로 끝났습니다."
        })
    } catch(error){
        next(error);
    }
});

router.post("/login",isNotLoggedIn,async (req,res,next)=>{
    try{
        const {email,password} = req.body;
        const exUser = await User.findOne({
            where:{
                email
            },
            attributes:{
                exclude:["updatedAt","createdAt"],
            }
        });

        if(!exUser){
            return res.json({
                result:false,
                msg:"존재하지 않는 이메일 입니다.",
            });
        }

        const result = await bcrypt.compare(password,exUser.password);

        if(result){
// userInfo : 아이디, 비밀번호 등 사용자 정보가 들어간 object이다. 형식은 상관없음.
// secretKey : 여러가지 복잡한 문자열로 되어있는 키.
// options: 토큰에 대한 여러가지 정보를 설정한다. expiresIn은 토큰 만료일, issuer, subject는 토큰에 대한 정보이다. 외에도 options가 더 있다.
// const options = {expiresIn: '7d', issuer: 'inyongTest', subject: 'userInfo'};
// const token = jwt.sign({exUser},process.env.JWT_SECRET_KEY,options); <= 다음에 쓸 코드
            const token = jwt.sign({exUser},process.env.JWT_SECRET_KEY);

            // 비밀번호 제거한 유저 데이터
            const UsertoSend = await User.findOne({
                where:{
                    email
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

            const joinedMyClasses = await exUser.getJoinedClass({
                include:[
                    {
                        model:User,
                        as:"owner",
                        attributes:{
                            exclude:["password","createdAt","updatedAt"],
                        },
                        where:{
                            id:{
                                [Op.ne]:exUser.id,
                            }
                        }
                    }
                ]
            });

            // res.cookie("access_token","bearer "+token,{
            //     maxAge:1000*60*60*4,
            //     httpOnly: true
            //     // path:"/token",
            // });
            
            return res.json({
                result:true,
                msg:"로그인을 성공했습니다.",
                data:{
                    me:UsertoSend,//password 제거
                    myClasses,
                    joinedMyClasses,
                    token,
                },
            });
        } else{
            return res.json({
                result:false,
                msg:"이메일은 있지만 비밀번호가 틀렸습니다.",
            });
        }
    } catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;