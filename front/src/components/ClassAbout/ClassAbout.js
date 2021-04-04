import React from 'react';
import "./ClassAbout.scss";
import {observer} from "mobx-react";
import SubjectItem from "../common/SubjectItem"
import CustomInput from '../common/CustomInput';

const ClassAbout = ({
    aboutClass,
    subjects,
    createSubjectMode,
    title,setTitle,
    onClickToggleChangeCreateMode,titleEnterEvenet,
}) => {
    return (
        <div className="classAbout">
            <div className="classAbout-wrapper">
                <header className="classAbout-wrapper-header">
                    <h1>{aboutClass.title}</h1>
                </header>
                <article className="classAbout-wrapper-article">
                    <nav className="classAbout-wrapper-article-nav">
                        <p>nav</p>
                    </nav>
                    <article className="classAbout-wrapper-article-article">
                        <div className="create">
                            <div className="create-profile">{aboutClass.owner.name[0].toUpperCase()}</div>
                            {createSubjectMode
                            ?<div className="create-input">
                                <div className="create-input-text"><CustomInput enterEvent={titleEnterEvenet} value={title} setValue={setTitle} placeholder="제목을 입력하세요." /></div>
                                <div className="create-input-button" onClick={onClickToggleChangeCreateMode}>취소</div>
                            </div>
                            :<div onClick={onClickToggleChangeCreateMode} className="create-text">새로운 과제를 만들어 보세요.</div>}
                        </div>
                        <div className="subjects">{subjects.length?subjects.map(v=><SubjectItem subject={v} />):<h1>수업을 만드세요</h1>}</div>
                    </article>
                </article>
            </div>
        </div>
    )
}

export default observer(ClassAbout);