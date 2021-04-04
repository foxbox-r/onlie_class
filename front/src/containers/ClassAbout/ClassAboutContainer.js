import React,{ useEffect,useState } from 'react';
import ClassAbout from "../../components/ClassAbout";
import {observer} from "mobx-react";
import useStore from "../../lib/hooks/useStore";

const ClassAboutContainer = ({ClassId}) => {

    const {store} = useStore();
    const classStore = store.ClassStore;
    const certify = store.CertifyStore;

    // 자세한 수업 찾기
    useEffect(async ()=>{
        if(certify.me){
            const response = await classStore.tryGetCurrentClassInfo(ClassId);
            if(response.result){
                setAboutClass(response.data);
            } else{
                alert(response.msg);
            }
        }   
    },[certify.me]);

    
    const [aboutClass,setAboutClass] = useState(null);

    return (
        <>
            {aboutClass?<ClassAbout />:<h1>찾으려는 수업이 없거나, 참가 권한이 없습니다.</h1>}
        </>
    )
}

export default observer(ClassAboutContainer);