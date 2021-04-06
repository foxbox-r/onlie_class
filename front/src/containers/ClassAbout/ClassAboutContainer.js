import React,{ useEffect,useState,useCallback,useRef } from 'react';
import ClassAbout from "../../components/ClassAbout";
import {observer} from "mobx-react";
import useStore from "../../lib/hooks/useStore";

const ClassAboutContainer = ({ClassId}) => {

    const {store} = useStore();
    const classStore = store.ClassStore;
    const certify = store.CertifyStore;

    // createSubjectMode
    const [createSubjectMode,setCreateSubjectMode] = useState(false);
    // title input 값
    const [title,setTitle] = useState("");
    const titleRef = useRef();

    const [isCanCreate,setIsCanCreate] = useState(false);

    // 자세한 수업 찾기
    useEffect(async ()=>{
        if(certify.me){
            await classStore.tryGetCurrentClassInfo(ClassId);
        }   
    },[certify.me]);

    // 과제를 다 만들면..
    useEffect(()=>{
        if(classStore.isCreateSubject){
            setTitle("");
            setCreateSubjectMode(false);
        }
    },[classStore.isCreateSubject])

    // 이 수업이 내 수업인지 확인하기
    useEffect(()=>{
        classStore.myClasses.forEach(v=>{
            console.log(v.id , ClassId);
            if(v.id == ClassId)
                return setIsCanCreate(true);
        });
    },[classStore.myClasses])

    const onClickToggleChangeCreateMode = useCallback(()=>{
        setCreateSubjectMode(prev=>!prev);
    },[])

    // Enter 이벤트
    const titleEnterEvenet = useCallback(()=>{
        console.log("create subject",{title});
        classStore.tryCreateSubject(title,ClassId);
    },[title]);

    return (
        <>
            {(classStore.currentClass)?<ClassAbout 
                onClickToggleChangeCreateMode={onClickToggleChangeCreateMode}
                createSubjectMode={createSubjectMode}
                aboutClass={classStore.currentClass}
                subjects={classStore.currentSubjects}
                title={title}
                setTitle={setTitle}
                titleEnterEvenet={titleEnterEvenet}
                classStore={classStore}
                titleRef={titleRef}
                isCanCreate={isCanCreate}
            />:<><br/><br/><br/><br/><br/><h1>loading...</h1></>}
        </>
    )
}

export default observer(ClassAboutContainer);