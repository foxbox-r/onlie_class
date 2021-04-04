import {action,observable} from "mobx"
import {autobind} from "core-decorators";
import MeApi from "../../assets/api/MeApi"

@autobind
class MeStore{
    rootStore;

    constructor(root){
        this.rootStore = root;
    }

    @observable isSetMyInfo = false;
    @observable isSetMyInfoLoading = false;
    @observable isSetMyInfoError = null;

    @observable isRefreshMyInfo = false;
    @observable isRefreshMyInfoLoading = false;
    @observable isRefreshMyInfoError = null;

    @action // 
    tryRefreshMyInfo = async () => {
        this.isRefreshMyInfoLoading = true;
        this.isRefreshMyInfoError = null;
        const response = await MeApi.refreshMyInfo(this.rootStore.CertifyStore.me.id);

        console.log("from tryRefreshMyInfo",response);

        if(response.result){
            this.rootStore.CertifyStore.me = response.data.user;
            this.rootStore.ClassStore.myClasses = response.data.myClasses;
            this.rootStore.ClassStore.joinedMyClasses = response.data.joinedMyClasses;
            this.isRefreshMyInfo = true;
        } else{
            this.isRefreshMyInfoError = response.msg;
            this.isRefreshMyInfo = false;
        }
        this.isRefreshMyInfoLoading = false;

        return response;
    }

    @action
    trySetMyInfo = async (settingInfo) => {//{name,grade,class,number,email,profile_img,userId}
        this.isSetMyInfoLoading = true;
        this.isSetMyInfoError = null;
        this.isSetMyInfo = false;

        const response = await MeApi.setMyInfo(settingInfo);

        console.log("from trySetMyInfo",response);

        if(response.result){
            await this.tryRefreshMyInfo();
            this.isSetMyInfo = true;
        } else{
            this.isSetMyInfoError = response.msg;
        }
        this.isSetMyInfoLoading = false;

        // return data;
    }

}

export default MeStore;