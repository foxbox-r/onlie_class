import React,{ useEffect,useState,useCallback } from 'react';
import ClassAbout from "../../components/ClassAbout";
import {observer} from "mobx-react";
import useStore from "../../lib/hooks/useStore";

const ClassAboutContainer = ({ClassId}) => {

    const {store} = useStore();
    const classStore = store.ClassStore;
    const certify = store.CertifyStore;

    const [aboutClass,setAboutClass] = useState(null);
    const [subjects,setSubjects] = useState(null);

    // createSubjectMode
    const [createSubjectMode,setCreateSubjectMode] = useState(false);
    // title input 값
    const [title,setTitle] = useState("");

    // 자세한 수업 찾기
    useEffect(async ()=>{
        if(certify.me){
            const response = await classStore.tryGetCurrentClassInfo(ClassId);
            if(response.result){
                setSubjects(response.data.subjects);
                setAboutClass(response.data.Class);
            } else{
                console.log(response);
            }
        }   
    },[certify.me]);

    const onClickToggleChangeCreateMode = useCallback(()=>{
        setCreateSubjectMode(prev=>!prev);
    },[])

    const titleEnterEvenet = useCallback(()=>{
        console.log("create subject",{title});
    },[title])

    return (
        <>
            {aboutClass?<ClassAbout 
                onClickToggleChangeCreateMode={onClickToggleChangeCreateMode}
                createSubjectMode={createSubjectMode}
                aboutClass={aboutClass}
                subjects={subjects}
                title={title}
                setTitle={setTitle}
                titleEnterEvenet={titleEnterEvenet}
            />:<><br/><br/><br/><br/><br/><h1>loading...</h1></>}
        </>
    )
}

export default observer(ClassAboutContainer);