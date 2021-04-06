import {action,observable} from "mobx"
import {autobind} from "core-decorators";
import ClassApi from "../../assets/api/ClassApi"

@autobind
class ClassStore{
    rootStore;

    constructor(root){
        this.rootStore = root;
    }

    @observable myClasses = [];
    @observable joinedMyClasses = [];
    @observable currentSubjects = [];
    @observable currentClass = null;

    @observable isCreateClass = false;
    @observable isCreateClassLoading = false;
    @observable isCreateClassError = null;

    @observable isJoinClass = false;
    @observable isJoinClassLoading = false;
    @observable isJoinClassError = null;

    @observable isGetCurrentClassInfo = false;
    @observable isGetCurrentClassInfoLoading = false;
    @observable isGetCurrentClassInfoError = null;

    @observable isCreateSubject = false;
    @observable isCreateSubjectLoading = false;
    @observable isCreateSubjectError = null;
 
    @action
    tryCreateSubject = async (title,classId) => {

        this.isCreateSubjectLoading = true;
        this.isCreateSubjectError = null;
        this.isCreateSubject = false;

        const response = await ClassApi.CreateSubject(title,Number(classId));

        console.log("from tryCreateSubject",response);

        if(response.result){
            this.currentSubjects = response.data;
            this.isCreateSubject = true;
        } else{
            this.isCreateSubjectError = response.msg;
        }
        this.isCreateSubjectLoading = false;

        return response;
    }

    @action
    tryGetCurrentClassInfo = async (classId) => {

        const userId = this.rootStore.CertifyStore.me.id;
        const classStore = this.rootStore.ClassStore; 
        const isThereJoined = classStore.joinedMyClasses.find(v=>v.ownerId === userId);
        const isThereMine = classStore.myClasses.find(v=>v.ownerId === userId);

        console.log(isThereJoined,isThereMine);

        if(!(isThereJoined || isThereMine)){
            return {
                result:false,
                msg:"수업을 볼수있는 권한이 없습니다.",
            }
        }

        this.isGetCurrentClassInfoLoading = true;
        this.isGetCurrentClassInfoError = null;
        this.isGetCurrentClassInfo = false;

        const response = await ClassApi.getCurrentClassInfo(Number(classId),userId);

        console.log("from tryGetCurrentClassInfo",response);

        if(response.result){
            this.currentSubjects = response.data.subjects; 
            this.currentClass = response.data.Class;
            this.isGetCurrentClassInfo = true;
        } else{
            this.isGetCurrentClassInfoError = response.msg;
        }
        this.isGetCurrentClassInfoLoading = false;

        return response;
    }

    @action
    tryJoinClass = async (code,userId) => {
        this.isJoinClassLoading = true;
        this.isJoinClassError = null;
        this.isJoinClass = false;

        const response = await ClassApi.joinClass(code,userId);

        console.log("from tryJoinClass",response);

        if(response.result){
            this.isJoinClass = true;
            this.joinedMyClasses = response.data;
        } else{
            this.isJoinClassError = response.msg;
        }
        this.isJoinClassLoading = false;

        // return response;
    }

    @action
    tryCreateClass = async (title,description,user_id) => {
        this.isCreateClassLoading = true;
        this.isCreateClassError = null;
        this.isCreateClass = false;

        const response = await ClassApi.createClass(title,description,user_id);

        console.log("from tryCreateClass",response);

        if(response.result){
            this.myClasses = response.data;
            this.isCreateClass = true;
        } else{
            this.isCreateClassError = response.msg;
        }
        this.isCreateClassLoading = false;

        return response;
    }

}

export default ClassStore;