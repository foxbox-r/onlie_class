import React,{useCallback} from 'react';
import Header from "../../components/common/Header";
import useStore from "../../lib/hooks/useStore"

const HeaderContainer = () => {
    const {store} = useStore();
    const certify = store.CertifyStore;

    const onClickLogout = useCallback(async ()=>{
        await certify.tryLogout().then(response=>{
            if(response.result){
                localStorage.removeItem("accessToken");
            } else{
                console.log("false result from tryLogout");
            }
        }).catch(error=>{
            console.error(error);
        });
    },[certify])

    return (
        <Header 
            certify={certify}
            onClickLogout={onClickLogout}
        />
    )           
}

export default HeaderContainer;