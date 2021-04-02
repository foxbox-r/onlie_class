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
        const data = await MeApi.refreshMyInfo(this.rootStore.CertifyStore.me.id);

        console.log("from tryRefreshMyInfo",data);

        if(data.result){
            this.isRefreshMyInfo = true;
            this.me = data.data.me;
            this.rootStore.ClassStore.myClasses = data.data.myClasses;
            this.rootStore.ClassStore.joinedMyClasses = data.data.joinedMyClasses;
        } else{
            this.isRefreshMyInfo = false;
            this.isRefreshMyInfoError = data.msg;
        }
        this.isRefreshMyInfoLoading = false;

        return data;
    }

    @action
    trySetMyInfo = async (settingInfo) => {//{name,grade,class,number,email,profile_img,userId}
        this.isSetMyInfoLoading = true;
        this.isSetMyInfoError = null;
        this.isSetMyInfo = false;

        const data = await MeApi.setMyInfo(settingInfo);

        console.log("from trySetMyInfo",data);

        if(data.result){
            this.isSetMyInfo = true;
            const updatedData = await this.tryRefreshMyInfo();
            console.log(updatedData);
        } else{
            this.isSetMyInfoError = data.msg;
        }
        this.isSetMyInfoLoading = false;

        // return data;
    }

}

export default MeStore;