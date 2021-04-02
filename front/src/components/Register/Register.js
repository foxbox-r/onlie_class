import React from 'react';
import "./Register.scss"
import CustomInput from "../common/CustomInput"
import {observer} from "mobx-react";

const Register = ({
    certify,
    name,setName,
    grade,setGrade,
    clas,setClas,
    number,setNumber,
    email,setEmail,
    code,setCode,
    password,setPassword,
    check,setCheck,
    onClickCertifiEmail,
    onClickCheckCode,
    onSameEvent,
    onClickRegister,
    isSame,a
}) => {

    return (
        <div className="register">
            <header className="register-header">
                <div className="register-header-wrapper">
                    <p>Welcome</p>
                    <p>대구소프트웨어마이스터고등학교 원서 작성 사이트에 오신 것을 환영합니다.</p>
                </div>
            </header>
            <article className="register-article">
                <header onClick={a} className="register-article-header">
                    <p>회원가입</p>
                </header>
                <article className="register-article-input">
                    <div className="name_class_number">
                        <CustomInput value={name} setValue={setName} placeholder="이름" className="name_class_number-name" type="text"/>
                        <CustomInput value={grade} setValue={setGrade} placeholder="학년" className="name_class_number-grade" type="number"/>
                        <CustomInput value={clas} setValue={setClas} placeholder="반" className="name_class_number-class" type="number"/>
                        <CustomInput value={number} setValue={setNumber} placeholder="번호" className="name_class_number-number" type="number"/>
                    </div>
                    {
                        (certify.isCertifiedEmail_1 && certify.isCheckedCode_1 )?(
                            <div className="completeBox">이메일인증이 완료되었습니다.</div>
                        ):(
                        <div className="email_author">
                            <CustomInput value={email} setValue={setEmail} placeholder="이메일" className="email_author-email" type="text"/>
                            <CustomInput className="email_author-author" type="button" onClick={onClickCertifiEmail} value={certify.isCertifiedEmail_1?"다시보내기":certify.certifiEmailLoading_1?"보내는중..":"인증"}/>
                        </div>
                        )
                    }
                    
                    {(certify.isCertifiedEmail_1 && !certify.isCheckedCode_1 ) && (
                        <div className="code_check">
                            <CustomInput value={code} setValue={setCode} className="code_check-code" type="number" placeholder="인증코드"/>
                            <CustomInput onClick={onClickCheckCode} className="code_check-check" type="button" value={certify.checkCodeLoading_1?"확인중...":"확인"}/>
                        </div>
                        )}
                    <div className="password">
                        <CustomInput value={password} setValue={setPassword} placeholder="비밀번호" type="text"/>
                    </div>
                    <div className="check_password">
                        <h1>{check.length!==0 && ((isSame)?<span className="good_span">good.</span>:<span className="bad_span">bad.</span>)}</h1>
                        <input value={check} onChange={e=>{setCheck(e.target.value);onSameEvent(e);}}  placeholder="비밀번호 체크" type="text"/>
                    </div>
                    {/* <div className="agree">
                        <input type="checkbox"/>
                        <p>개인정보 처리 및 개인정보 활용 동의 [보기]</p>
                        <p>입학원서 접수 사이트 이용약관 동의 [보기]</p>
                        <p>바탕 개인정보 취급방침 동의 [보기]</p>
                    </div> */}
                </article>
                <footer className="register-article-footer">
                    {certify.isRegist?<div>회원가입 완료</div>:<div onClick={onClickRegister}>회원가입</div>}
                </footer>
            </article>
        </div>
    )
}

export default observer(Register);