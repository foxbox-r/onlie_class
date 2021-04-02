import {action,observable} from "mobx"
import {autobind} from "core-decorators";
import ClassApi from "../../assets/api/ClassApi"

@autobind
class ClassStore{
    @observable myClasses = [];
    @observable joinedMyClasses = [];

    @observable isCreateClass = false;
    @observable isCreateClassLoading = false;
    @observable isCreateClassError = null;

    @observable isJoinClass = false;
    @observable isJoinClassLoading = false;
    @observable isJoinClassError = null;

    @observable isGetCurrentClassInfo = false;
    @observable isGetCurrentClassInfoLoading = false;
    @observable isGetCurrentClassInfoError = null;
 
    @action
    tryGetCurrentClassInfo = async (classId) => {
        this.isGetCurrentClassInfoLoading = true;
        this.isGetCurrentClassInfoError = null;
        this.isGetCurrentClassInfo = false;

        const data = await ClassApi.getCurrentClassInfo(classId);

        console.log("from tryGetCurrentClassInfo",data);

        if(data.result){
            this.isGetCurrentClassInfo = true;
        } else{
            this.isGetCurrentClassInfoError = data.msg;
        }
        this.isGetCurrentClassInfoLoading = false;

        // return data;
    }

    @action
    tryJoinClass = async (code,userId) => {
        this.isJoinClassLoading = true;
        this.isJoinClassError = null;
        this.isJoinClass = false;

        const data = await ClassApi.joinClass(code,userId);

        console.log("from tryJoinClass",data);

        if(data.result){
            this.isJoinClass = true;
            this.joinedMyClasses = data.data;
        } else{
            this.isJoinClassError = data.msg;
        }
        this.isJoinClassLoading = false;

        // return data;
    }

    @action
    tryCreateClass = async (title,description,user_id) => {
        this.isCreateClassLoading = true;
        this.isCreateClassError = null;
        this.isCreateClass = false;

        const data = await ClassApi.createClass(title,description,user_id);

        console.log("from tryCreateClass",data);

        if(data.result){
            this.isCreateClass = true;
            this.myClasses = data.data;
        } else{
            this.isCreateClassError = data.msg;
        }
        this.isCreateClassLoading = false;

        return data;
    }

}

export default ClassStore;