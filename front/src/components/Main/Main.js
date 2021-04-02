import React from 'react';
import "./Main.scss"
import TitleCard from "../common/Card/Title"

const Main = () => {

    return (
        <article className="main">
            <header className="main-header">
                <div className="article-wrapper">
                    <article>
                        <p>대구소프트웨어마이스터고등학교</p>
                        <p>2021 FOXBOXR</p>
                        <button>Fox</button>
                    </article>
                </div>
            </header>
            <article className="main-article">
                <div className="article-wrapper">
                    <div className="main-article-card-container">
                        <div className="card-container">
                            <TitleCard
                                title="류수아"
                            >
                                <h4>2 - 3 - 8</h4>
                                <p>저는 류수아입니다.</p>
                            </TitleCard>
                            <TitleCard
                                title="CNS"
                            >
                                <h4>Care And Service</h4>
                                <p>CSN는 신입생관리프로젝트 동아리입니다.</p>
                            </TitleCard>
                        </div>
                        <div className="card-container">
                            <TitleCard
                                title="FOXBOXR"
                            >
                                <h4>foxbox r</h4>
                                <p>foxbox r은 저의 유튜브닉네임입니다.</p>
                            </TitleCard>
                        </div>
                    </div>
                </div>
            </article>
            <footer className="main-footer">
                <div className="footer-wrapper">
                    <p>이메일 : foxboxr@gmail.com</p>
                    <p>유튜브 : foxboxr</p>
                </div>
            </footer>
        </article> 
    )
}

export default Main;