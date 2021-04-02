import React from 'react';
import "./Login.scss"
import {NavLink} from "react-router-dom"
import CustomInput from "../common/CustomInput"

import {observer} from "mobx-react";

const Login = ({
    email,setEmail,
    password,setPassword,
    certify,
    onClickLogin,
}) =>{

    return (
        <div className="login">
            <header className="login-header">
                <div className="login-header-content-wrapper">
                    <p>Welcome</p>
                    <p>대구소프트웨어마이스터고등학교 온라인 클래스에 오신것을 환영합니다.</p>
                </div>
            </header>
            <footer className="login-footer"></footer>
            <article className="login-article">
                <div className="login-article-wrapper">
                    <header>
                        <div>
                            로그인
                        </div>
                    </header>
                    <article className="login-article-wrapper-content">
                        <div className="login-input">
                            <div><CustomInput  value={email} setValue={setEmail} type="text" placeholder="email"/></div>
                            <div><CustomInput  value={password} setValue={setPassword} type="password" placeholder="password"/></div>
                            {/* <div><input type="checkbox"/></div> */}
                        </div>
                        <div className="login-submit">
                            <div onClick={onClickLogin}>{certify.isRegistLoading?"로그인중..":"로그인"}</div>
                            <div>
                                <NavLink to="/register">
                                    아이디 혹은 비밀번호를 잊으셨나요?
                                </NavLink>
                            </div>
                        </div>
                    </article>
                </div>
            </article>
        </div>
    )
}

export default observer(Login);