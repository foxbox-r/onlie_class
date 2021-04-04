import { useEffect } from "react"
import useStore from "../../../lib/hooks/useStore";
import {useHistory} from "react-router-dom";
import {observer} from "mobx-react";

const IsLoggedin = () => {

    const {store} = useStore();
    const certify = store.CertifyStore;
    const history = useHistory();
  
    useEffect(()=>{
        console.log("useEffect from IsLogggedin",certify.me);
        if(!certify.me){
            history.push("/login");
        } 
    },[certify.me,history]);

    return (
        <>
        </>
    )
}

export default observer(IsLoggedin);