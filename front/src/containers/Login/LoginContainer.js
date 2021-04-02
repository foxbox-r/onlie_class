import React,{useState,useCallback,useEffect} from 'react';
import Login from "../../components/Login"
import useStore from "../../lib/hooks/useStore";
import {observer} from "mobx-react";
import {useHistory} from "react-router-dom";

const LoginContainer = () => {
    const {store} = useStore();
    const  certify = store.CertifyStore;
    const history = useHistory();

    // 로그인 input 값
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    // 로그인 이벤트
    const onClickLogin = useCallback(async ()=>{
        await certify.tryLogin(email,password).then(response=>{
            if(response.result){
                localStorage.setItem("accessToken",response.data.token)
            } else{
                console.log("false result from tryLogin");
            }
        }).catch(error=>{
            console.error(error);
        });
    },[email,password,certify]);

    useEffect(()=>{
        console.log("useEffect login",certify.me);
        if(certify.me){
            history.push("/");
        }
    },[certify.me,history])

    return (
        <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onClickLogin={onClickLogin}
            certify={certify}
        />
    )
}

export default observer(LoginContainer);