const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.isLoggedIn = (req,res,next)=>{
    const bearHeader = req.headers["authorization"];
    // console.log(req.headers);
    if(typeof bearHeader !== "undefined"){
        const bearer = bearHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        jwt.verify(req.token,process.env.JWT_SECRET_KEY,(error,data)=>{
            if(error){
                res.json({
                    result:false,
                    msg:"토큰이 일치하지 않습니다.",
                });
            } else{
                next();
            }
        });
    } else{
        res.status(403).json({
            result:false,
            msg:"로그인 상태가 필요합니다.",
        });
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    const bearHeader = req.headers["authorization"];
    if(typeof bearHeader === "undefined"){
        next();
    } else{
        res.json({
            result:false,
            msg:"로그아웃 상태가 필요합니다.",
        });
    }
}