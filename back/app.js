const express = require("express");
const app = express();
const host = "localhost";
const port = 5000;
const serverAddress = `http://${host}:${port}`; 
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const db = require("./models");

const userRouter = require("./routes/user");
const classRouter = require("./routes/class");
const meRouter = require("./routes/me");

// get 가져오다
// post 생성하다
// put 전체 수정
// delete 제거
// patch 부분 수정
// options 찔러보기
// head 헤더

db.sequelize.sync()
.then(()=>{
    console.log("===============db 연결 성공===============");
})
.catch(console.error)

app.use(logger("dev")); 
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
  }));
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use("/user",userRouter);
app.use("/class",classRouter);
app.use("/me",meRouter);

app.listen(port,host,()=>{
    console.log(`server runs at ${serverAddress}`);
});