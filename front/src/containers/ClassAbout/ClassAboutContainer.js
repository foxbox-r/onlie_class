import React,{ useEffect } from 'react';
import ClassAbout from "../../components/ClassAbout"
import {observer} from "mobx-react"
import useStore from "../../lib/hooks/useStore"

const ClassAboutContainer = ({ClassId}) => {

    const {store} = useStore();
    const classStore = store.ClassStore;
    
    useEffect(()=>{
        classStore.tryGetCurrentClassInfo(ClassId);
    },[])

    return (
        <>
            <ClassAbout />
        </>
    )
}

export default observer(ClassAboutContainer);