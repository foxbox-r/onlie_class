import React from 'react';
import "./ClassCardWithDetail.scss"

const ClassCardWithDetail = ({
    _class,
}) => {
    const {title,description,owner,code} = _class;
    const {name,grade,number,profile_img} = owner;

    return (
        <div className="ClassCardWithDetail">
            <header className="ClassCardWithDetail-header">
                <div className="ClassCardWithDetail-header-info">
                    <h2>{title}</h2>
                    <p>{grade}학년 {owner.class}반 {number}번 {name}</p>
                </div>
                <div className="ClassCardWithDetail-header-profile">
                    <div>
                        {profile_img?<img src={profile_img} />:<div>{name[0].toUpperCase()}</div>}
                    </div>
                </div>
            </header>
            <article className="ClassCardWithDetail-article">
                <p>{description}</p>
            </article>
            <footer className="ClassCardWithDetail-footer">
                <p><b>수업코드 : {code}</b></p>
            </footer>
        </div>
    )
}

export default ClassCardWithDetail;