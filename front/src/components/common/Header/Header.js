import React,{useCallback, useState} from 'react';
import {NavLink,useHistory} from "react-router-dom"
import "./Header.scss"
import {observer} from "mobx-react";

const Header = ({
    certify,
    onClickLogout,
}) => {
    const [isOpenSlideBar,setIsOpenSlideBar] = useState(false);
    const history = useHistory();
    const onClickIsOpenToggle = useCallback((e)=>{
        // setIsOpenSlideBar(!isOpenSlideBar)
        setIsOpenSlideBar(prev=>!prev);
    },[])

    const onClickGoLogin = useCallback(()=>{
        history.push("/login");
    },[history])

    const onClickGoRegister = useCallback(()=>{
        history.push("/register");
    },[history]);

    return (
        <header
            id="header"
            className="header"
        >

        <div className="header-menu-pc">
            <div className="header-menu-pc-container">
                <NavLink id="header-logo"
                        to="/"
                        exact
                        className="header-menu-content-item"
                        // activeClassName="header-menu-content-item-active"
                    >
                    <span>DGSW</span>
                </NavLink>

                <NavLink
                    to="/"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>홈</span>
                </NavLink>

                <NavLink
                    to="/class"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>클래스</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>프로필</span>
                </NavLink>
    {/*                 
    ==============================================================================================================================
                    */}
                <NavLink
                    to="/sub"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>메뉴2</span>
                </NavLink>

                <NavLink
                    to="/sub"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>메뉴3</span>
                </NavLink>
            </div>
            <div className="header-menu-pc-button">
                {certify.me?(
                    <>
                        <button onClick={onClickLogout}>{certify.isLogoutLoading?"아웃중..":"로그아웃"}</button>
                    </>
                )
                :(
                <>
                    <button onClick={onClickGoLogin}>로그인</button>
                    <button onClick={onClickGoRegister}>회원가입</button>
                </>
                )}
                <span className="open_menu_button" onClick={onClickIsOpenToggle}>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
            </div>
        </div>
        
        {isOpenSlideBar && <div className="slide-bar-background" onClick={onClickIsOpenToggle}></div>}
        
        <div className={"header-menu-mobile" + (isOpenSlideBar?" open-slide-bar":"")}>
            <div className="slide-bar-wrapper">
                <span className="header-menu-content-item">
                    <span>
                        카테고리
                    </span>
                </span>
                <NavLink
                    to="/"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>HOME</span>
                </NavLink>

                <NavLink
                    to="/class"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>클래스</span>
                </NavLink>

                <NavLink
                    to="/profile"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>프로필</span>
                </NavLink>

                <NavLink
                    to="/login"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>로그인</span>
                </NavLink>

                <NavLink
                    to="/register"
                    exact
                    className="header-menu-content-item"
                    activeClassName="header-menu-content-item-active"
                >
                    <span>회원가입</span>
                </NavLink>

            </div>
        </div>
        
        </header>
    )
}

export default observer(Header);