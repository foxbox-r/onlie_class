import React from 'react';
import "./ClassAbout.scss";

const ClassAbout = () => {

    return (
        <div className="classAbout">
            <div className="classAbout-wrapper">
                <header className="classAbout-wrapper-header">
                    <h1>Welcome to my class.</h1>
                </header>
                <article className="classAbout-wrapper-article">
                    <nav className="classAbout-wrapper-article-nav">
                        <p>nav</p>
                    </nav>
                    <article className="classAbout-wrapper-article-article">
                        <div className="create">
                            <div className="create-profile">pro</div>
                            <div className="create-input">새로운 과제를 만들어 보세요.</div>
                        </div>
                        <div className="subjects">subjects</div>
                    </article>
                </article>
            </div>
        </div>
    )
}

export default ClassAbout;