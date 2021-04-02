import {action,observable} from "mobx"
import {autobind} from "core-decorators";
import AuthApi from "../../assets/api/AuthApi";
import rootStore from "../index";

@autobind
class CertifyStore{
    rootStore;

    constructor(root){
        this.rootStore = root;
    }

    @observable me = null;

    @observable isCertifiedEmail_1 = false;
    @observable certifiEmailLoading_1 = false;
    @observable certifiEmailError_1 = null;
    
    @observable isCheckedCode_1 = false;
    @observable checkCodeLoading_1 = false;
    @observable checkCodeError_1 = null;

    @observable isRegist = false;
    @observable isRegistLoading = false;
    @observable isRegistError = null;

    @observable isLogin = false;
    @observable isLoginLoading = false;
    @observable isLoginError = null;

    @observable isLogout = false;
    @observable isLogoutLoading = false;
    @observable isLogoutError = null;
 
    @action//로그아웃
    tryLogout = async () => {
        this.isLogoutLoading = true;
        this.isLogoutError = null;

        const data = await AuthApi.logout();

        console.log("from tryLogout",data);

        if(data.result){
            this.isLogout = true;
            this.me = null;
        } else{
            this.isLogout = false;
            this.isLogoutError = data.msg;
        }
        this.isLogoutLoading = false;

        return data;
    }
    
    @action//로그인
    tryLogin = async (email,password) => {
        this.isLoginLoading = true;
        this.isLoginError = null;

        const data = await AuthApi.login(email,password);

        console.log("from tryLogin",data);

        if(data.result){
            this.isLogin = true;
            this.me = data.data.me;
            this.rootStore.ClassStore.myClasses = data.data.myClasses;
            this.rootStore.ClassStore.joinedMyClasses = data.data.joinedMyClasses;
        } else{
            this.isLogin = false;
            this.isLoginError = data.msg;
        }
        this.isLoginLoading = false;

        return data;
    }

    @action //이메일 인증
    tryCertifiEmail = async (email,type) =>{
        this.certifiEmailLoading_1 = true;
        this.certifiEmailError_1 = null;
        this.isCertifiedEmail_1 = false;
        const data = await AuthApi.certifyEmail(email,type);

        console.log("from tryCertifiEmail",data);
        
        if(data.result){
            this.isCertifiedEmail_1 = true;
        } else{
            this.isCertifiedEmail_1 = false;
            this.certifiEmailError_1 = data.msg;
        }
        this.certifiEmailLoading_1 = false; 
    }

    @action // 인증 코드 확인
    tryCheckCode = async (email,code,type) =>{
        this.checkCodeLoading_1 = true;
        this.checkCodeError_1 = null;
        const data = await AuthApi.checkCode(email,code,type);

        console.log("from tryCheckCode",data);

        if(data.result){
            this.isCheckedCode_1= true;
        } else{
            this.checkCodeError_1 = data.msg;
        }
        this.checkCodeLoading_1 = false;
    }

    @action //회원가입
    tryRegister = async (name,grade,clas,number,email,password) =>{
        this.isRegistLoading = true;
        const data = await AuthApi.regist(name,grade,clas,number,email,password);

        console.log("from tryRegister",data);

        if(data.result){
            this.isRegist = true;
            console.log("api check code",data);
        } else{
            this.isRegistError = data.msg;
        }
        this.isRegistLoading = false;
    }
}

export default CertifyStore;