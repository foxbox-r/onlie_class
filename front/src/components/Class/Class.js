import React from 'react';
import "./Class.scss"
import CustomInput from "../common/CustomInput";
import ClassCardWithDetail from "../common/Card/ClassWithDetail";
import {observer} from "mobx-react";

const Class = ({
    classStore,
    code,setCode,
    isOpenAddClassWindow,
    onClickAddClassButton,
    onClickJoinClassButton,
}) => {
    console.log(classStore);
    return (
        <>
            <div className="class">
                <article className="class-article">
                    
                    <div className="class-title">
                        <div className="class-title-line-first class-title-line"><span></span></div>
                        <div className="class-title-text">내가 참여한 수업</div>
                        <div className="class-title-line-second class-title-line"><span></span></div>
                    </div>
                    <div className="other-class classes">
                        {classStore.joinedMyClasses.map(v=><ClassCardWithDetail key={v.id} _class={v}/>)}
                    </div>
                    <div className="class-title">
                        <div className="class-title-line-first class-title-line"><span></span></div>
                        <div className="class-title-text">자신의 수업</div>
                        <div className="class-title-line-second class-title-line"><span></span></div>
                    </div>
                    <div className="my-class classes">
                        
                        {classStore.myClasses.map(v=><ClassCardWithDetail key={v.id} _class={v}/>)}
                    </div>
                </article>
                
                <div onClick={onClickAddClassButton} className={"class-addClassButton"+(isOpenAddClassWindow?" class-addClassButton-open":"")}>
                    <div>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            {isOpenAddClassWindow && (
                <div className="addClassWindow">
                    <header className="addClassWindow-header">
                        <article>
                            <p>수업에 참여하기</p>
                            <p>수업코드를 넣어 수업에 참여하세요.</p>
                        </article>
                    </header>
                    <article className="addClassWindow-article">
                        <header>코드입력</header>
                        <article className="article-input">
                            <div className="article-input-inputBox">
                                <CustomInput type="text" value={code} setValue={setCode} placeholder="수업코드" />
                            </div>
                            <div onClick={onClickJoinClassButton} className="article-input-inputBox joinButton">
                                {classStore.isJoinClassLoading?"참여하는중..":"참여하기"}
                            </div>
                        </article>
                    </article>
                    <footer className="addClassWindow-footer"></footer>
                </div>
                )
            }

        </>
    )
}

export default observer(Class);