import React from 'react';
import "./Profile.scss";
import {observer} from "mobx-react";
import CustomInput from "../common/CustomInput";
import ClassCard from "../common/Card/Class"


// const src = "https://img.theqoo.net/img/blYxr.jpg";
const Profile = ({
    certify,
    title,setTitle,
    description,onChangeDescription,
    onClickCreateClass,
    classStore,
    onClickSettingMyInfo,
    changeModeToggleEditToCancle,editMode,
    editName,setEditName,
    editGrade,setEditGrade,
    editClass,setEditClass,
    editNumber,setEditNumber,
    editEmail,setEditEmail,
    meStore,createOnClickGoToClassAbout
}) => {
    return (
        <div className="profile">

            <div className="profile-info">
                <div className="profile-info-profileBox profile-info-sub-box">
                    {(certify.me&&certify.me.profile_img)?<div className="profile-img profile-img-box"><img alt="img" src={certify.me.profile_img} /></div>:<div className="profile-base profile-img-box">{certify.me.name[0].toUpperCase()}</div>}
                </div>
                <div className="profile-info-nameBox profile-info-sub-box">
                    <p>이름 : {editMode?<CustomInput className="name" value={editName} setValue={setEditName} placeholder="이름" />:certify.me.name}</p>
                </div>
                <div className="profile-info-gradeBox profile-info-sub-box">
                    <p>{editMode?<CustomInput type="number" className="grade" value={editGrade} setValue={setEditGrade} placeholder="학년"  />:certify.me.grade}학년 {editMode?<CustomInput type="number" className="class" value={editClass} setValue={setEditClass} placeholder="반"  />:certify.me.class}반 {editMode?<CustomInput type="number" className="number" value={editNumber} setValue={setEditNumber} placeholder="번"  />:certify.me.number}번</p>
                </div>
                <div className="profile-info-emailBox profile-info-sub-box">
                    <p>이메일 : {editMode?<CustomInput className="email" value={editEmail} setValue={setEditEmail} placeholder="이메일"  />:certify.me.email}</p>
                </div>
                {editMode && <div onClick={onClickSettingMyInfo} className="profile-info-setting profile-info-sub-box">
                    <div>{meStore.isSetMyInfoLoading?"수정중..":"수정하기"}</div>
                </div>}
                <div className="profile-info-setting profile-info-sub-box">
                    <div onClick={changeModeToggleEditToCancle}>{editMode?"취소":"프로필 수정"}</div>
                </div>
            </div>

            <div className="profile-myClass">

                <div className="profile-myClass-create">
                    <div className="profile-myClass-create-inputBox">
                        <CustomInput className="title input" value={title} setValue={setTitle} type="text" placeholder="수업제목" />
                    </div>
                    <div className="profile-myClass-create-inputBox">
                        <textarea className="description input" value={description} onChange={onChangeDescription} placeholder="수업 내용"/>
                    </div>
                    <div className="profile-myClass-create-inputBox">
                        <div onClick={onClickCreateClass} className="create input">{classStore.isCreateClassLoading?"만드는 중..":"수업 만들기"}</div>
                    </div>
                </div>

                <div className="profile-myClass-info">
                    <div className="profile-myClass-info-title">
                        내가 만든 수업들
                    </div>
                    {classStore.myClasses.map(v=><ClassCard onClickGoToClassAbout={createOnClickGoToClassAbout(v.id)} key={v.id} className="profile-create-class-card" classInfo={v} />)}
                </div>

            </div>

        </div>
    )
}

export default observer(Profile);

// 
// 
//  observer 안되는 버그 고치기
// 
// 