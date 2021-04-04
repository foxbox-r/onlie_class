import React,{useCallback, useEffect,useState} from 'react';
import Profile from "../../components/Profile"
import {observer} from "mobx-react"
import useStore from "../../lib/hooks/useStore"

const ProfileContainer = () => {

    const {store} = useStore();
    const certify = store.CertifyStore;
    const classStore = store.ClassStore;
    const meStore = store.MeStore;

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [editMode,setEditMode] = useState(false);

    // profile input 값
    const [editName,setEditName] = useState(null);
    const [editGrade,setEditGrade] = useState(null);
    const [editClass,setEditClass] = useState(null);
    const [editNumber,setEditNumber] = useState(null);
    const [editEmail,setEditEmail] = useState(null);

    // 수업만들기 input값 지우기
    useEffect(()=>{
        if(classStore.isCreateClass){
            setTitle("");
            setDescription("");
        }
    },[classStore.isCreateClass]);

    const onChangeDescription = useCallback((e)=>{
        setDescription(e.target.value);
    },[]);

    // 프로필 정보값 바꾸기
    useEffect(()=>{
        if(meStore.isSetMyInfo && certify.me){
            setEditName(certify.me.name);
            setEditGrade(certify.me.grade);
            setEditClass(certify.me.class);
            setEditNumber(certify.me.number);
            setEditEmail(certify.me.email);
            setEditMode(false);
        }
    },[meStore.isSetMyInfo,certify.me])

    // 수업만들기 요청
    const onClickCreateClass = useCallback(async ()=>{
        await classStore.tryCreateClass(title,description,certify.me.id);
    },[title,description,certify.me,classStore]);

    // 정보수정 요청
    const onClickSettingMyInfo = useCallback(()=>{
        meStore.trySetMyInfo({
            grade:editGrade,
            class:editClass,
            number:editNumber,
            email:editEmail,
            name:editName,
            userId:certify.me.id,
        });
    },[editClass,editEmail,editGrade,editName,editNumber,certify.me,meStore]);

    // edit <=> cancle toggle 바꾸기 || input값에 me값을 넣기
    const changeModeToggleEditToCancle = useCallback(()=>{
        setEditName(certify.me.name);
        setEditGrade(certify.me.grade);
        setEditClass(certify.me.class);
        setEditNumber(certify.me.number);
        setEditEmail(certify.me.email);
        setEditMode(prev=>!prev);
    },[certify.me]);

    // 로그아웃하면
    if(!certify.me)
        return null;

    return (
        <Profile
            classStore={classStore}
            certify={certify}
            title={title}
            setTitle={setTitle}
            description={description}
            onChangeDescription={onChangeDescription}
            onClickCreateClass={onClickCreateClass}
            onClickSettingMyInfo={onClickSettingMyInfo}
            changeModeToggleEditToCancle={changeModeToggleEditToCancle}
            editMode={editMode}
            editName={editName}
            setEditName={setEditName}
            editGrade={editGrade}
            setEditGrade={setEditGrade}
            editClass={editClass}
            setEditClass={setEditClass}
            editNumber={editNumber}
            setEditNumber={setEditNumber}
            editEmail={editEmail}
            setEditEmail={setEditEmail}
            meStore={meStore}
        />
    )           
}

export default observer(ProfileContainer);