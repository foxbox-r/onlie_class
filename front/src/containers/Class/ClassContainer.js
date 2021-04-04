import React,{useState,useCallback,useEffect} from 'react';
import Class from "../../components/Class"
import {observer} from "mobx-react"
import useStore from "../../lib/hooks/useStore"

const ClassContainer = () => {

    const {store} = useStore();
    const certify = store.CertifyStore;
    const classStore = store.ClassStore;

    const [isOpenAddClassWindow,setIsOpenAddClassWindow] = useState(false);
    
    // 수업코드 input 값
    const [code,setCode] = useState("");

    const onClickAddClassButton = useCallback(()=>{
        setIsOpenAddClassWindow(prev=>!prev);
    },[]);

    const onClickJoinClassButton = useCallback(()=>{
        classStore.tryJoinClass(code,certify.me.id);
    },[code,certify.me,classStore]);

    useEffect(()=>{
        if(classStore.isJoinClass){
            setCode("");
            setIsOpenAddClassWindow(false);
        }
    },[classStore.isJoinClass]);

    return (
        <>
            <Class
                classStore={classStore}
                code={code}
                setCode={setCode}
                isOpenAddClassWindow={isOpenAddClassWindow}
                onClickAddClassButton={onClickAddClassButton}
                onClickJoinClassButton={onClickJoinClassButton}
            />
        </>
    )           
}

export default observer(ClassContainer);