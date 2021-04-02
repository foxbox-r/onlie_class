import Api from "../../lib/customAxios"

class AuthApi {

    async logout(){
        try{
            const {data} = await Api.post("/user/logout");
            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"로그아웃을 요청하는 과정에서 에러"
            };
        }
    }

    async login(email,password){
        try{
            const body = {
                email:email.trim(),
                password:password.trim(),
            };
            const {data} = await Api.post("/user/login",body);
            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"로그인을 요청하는 과정에서 에러"
            };
        }
    }

    async certifyEmail(email,type){ // {}
       try{ 
            const body = {
                email,
                type
            };
            const {data} = await Api.post("/user/emailAuth",body);
            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"이메일 인증을 요청하는 과정에서 에러"
            };
        }
    }

    async checkCode(email,code,type){ // {}
        try{ 
            const body = {
                email:email.trim(),
                code:code.trim(),
                type
            };
            const {data} = await Api.post("/user/checkCode",body);

            return data;
        } catch(error){
            console.error(error);
            return {
                    result:false,
                    msg:"인증코드확인을 요청하는 과정에서 에러 "
                };
        }
    }

    async regist(name,grade,clas,number,email,password){
        try{
            const body = {
                name,
                grade,
                clas,
                number,
                email:email.trim(),// 이메일 공백 처리하기
                password:password.trim(),
            };
            const {data} = await Api.post("/user/regist",body);

            return data;
        } catch(error){
            console.error(error);
            return {
                result:false,
                msg:"회원가입을 하는 과정에서 에러",
            }
        }
    }
}

export default new AuthApi();