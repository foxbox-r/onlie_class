import React, { useCallback,useState,useEffect } from 'react';
import Register from "../../components/Register"
import useStore from "../../lib/hooks/useStore";
import {observer} from "mobx-react";
import {useHistory} from "react-router-dom" 

const RegisterContainer = () => {
    const {store} = useStore();
    const certify = store.CertifyStore;
    const history = useHistory();

    // 정보를 받는 input들
    const [name,setName] = useState("");
    const [grade,setGrade] = useState("");
    const [clas,setClas] = useState("");
    const [number,setNumber] = useState("");
    const [email,setEmail] = useState("");
    const [code,setCode] = useState("");
    const [password,setPassword] = useState("");
    const [check,setCheck] = useState("");
    const [isSame,setIsSame] = useState(null);

    // 이메일 인증코드 요청
    const onClickCertifiEmail = useCallback(()=>{
        certify.tryCertifiEmail(email,1);
    },[email,certify])

    //이메일 인증코드 확인 요청
    const onClickCheckCode = useCallback(()=>{
        certify.tryCheckCode(email,code,1); // 이메일,코드,타입
    },[email,code,certify]) 

    //회원가입 요청
    const onClickRegister = useCallback(()=>{
        if(certify.isCertifiedEmail_1 && certify.isCheckedCode_1)
            certify.tryRegister(name,grade,clas,number,email,password);
        else
            alert("나머지 가입을 하세요.")
    },[name,clas,number,email,password,certify,grade])

    //비밀번호 체크
    const onSameEvent = useCallback((e)=>{
        const value = e.target.value;
        if(password === value){
            setIsSame(true);
        }else{
            setIsSame(false);
        }
    },[password]);

    // 회원가입을 마췄거나 이미 로그인을 한상태라면
    useEffect(()=>{
        console.log("useEffect register",certify.me);
        if(certify.isRegist || certify.me){
            history.push("/login")
        }
    },[certify.isRegist,certify.me,history]);

    return (
        <>
            <Register 
                certify={certify}
                name={name}
                setName={setName}
                grade={grade}
                setGrade={setGrade}
                clas={clas}
                setClas={setClas}
                number={number}
                setNumber={setNumber}
                email={email}
                setEmail={setEmail}
                code={code}
                setCode={setCode}
                password={password}
                setPassword={setPassword}
                check={check}
                setCheck={setCheck}
                onClickCertifiEmail={onClickCertifiEmail}
                onClickCheckCode={onClickCheckCode}
                onSameEvent={onSameEvent}
                isSame={isSame}
                onClickRegister={onClickRegister}
            />
        </>
    )           
}

export default observer(RegisterContainer);