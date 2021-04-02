import React from 'react';
import LoginContainer from "../containers/Login/LoginContainer"
import DefaultTemplate from "../components/common/Template/DefaultTemplate"

function LoginPage(){

    return (
        <DefaultTemplate>
            <LoginContainer />
        </DefaultTemplate>
    )
}

export default LoginPage;