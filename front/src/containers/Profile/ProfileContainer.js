import React,{useCallback, useEffect,useState} from 'react';
import Profile from "../../components/Profile"
import {observer} from "mobx-react"
import useStore from "../../lib/hooks/useStore"
import {useHistory} from "react-router-dom"

const ProfileContainer = () => {

    const history = useHistory();
    const {store} = useStore();
    const certify = store.CertifyStore;
    const classStore = store.ClassStore;
    const meStore = store.MeStore;

    useEffect(()=>{
        if(!certify.me){
            history.push('/');
        }
    },[certify.me,history])

    useEffect(()=>{
        console.log("useEffect from profile container",classStore.isCreateClass);
        if(classStore.isCreateClass){
            setTitle("");
            setDescription("");
        }
    },[classStore.isCreateClass]);

    useEffect(()=>{
        if(meStore.isRefreshMyInfo){
            setEditName(certify.me.name);
            setEditGrade(certify.me.grade);
            setEditClass(certify.me.class);
            setEditNumber(certify.me.number);
            setEditEmail(certify.me.email);
            setEditMode(false);
        }
    },[meStore.isRefreshMyInfo,certify.me])

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [editMode,setEditMode] = useState(false);

    const [editName,setEditName] = useState(certify.me.name);
    const [editGrade,setEditGrade] = useState(certify.me.grade);
    const [editClass,setEditClass] = useState(certify.me.class);
    const [editNumber,setEditNumber] = useState(certify.me.number);
    const [editEmail,setEditEmail] = useState(certify.me.email);

    const onChangeDescription = useCallback((e)=>{
        setDescription(e.target.value);
    },[]);

    const onClickCreateClass = useCallback(async ()=>{
        try{
            await classStore.tryCreateClass(title,description,certify.me.id);
        } catch(error){
            console.error(error);
        }
        
    },[title,description,certify.me,classStore]);

    const onClickSettingMyInfo = useCallback(()=>{
        meStore.trySetMyInfo({
            grade:editGrade,
            class:editClass,
            number:editNumber,
            email:editEmail,
            name:editName,
            userId:certify.me.id,
        });
    },[editClass,editEmail,editGrade,editName,editNumber,certify.me]);

    const changeModeToggleEditToCancle = useCallback(()=>{
        setEditMode(prev=>!prev);
    },[]);

    return (
        <>
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
        </>
    )           
}

export default observer(ProfileContainer);