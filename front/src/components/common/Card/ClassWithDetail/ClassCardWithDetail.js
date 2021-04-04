import React from 'react';
import "./ClassCardWithDetail.scss";
import {useHistory} from "react-router-dom";

const ClassCardWithDetail = ({
    _class,
}) => {
    const history = useHistory();
    const {title,description,owner,code} = _class;
    const {name,grade,number,profile_img} = owner;

    const onClickAbuotClassTitle = ()=>{ 
        history.push(`/class/about/${_class.id}`);
    }

    return (
        <div className="ClassCardWithDetail">
            <header onClick={onClickAbuotClassTitle} className="ClassCardWithDetail-header">
                <div className="ClassCardWithDetail-header-info">
                    <h2>{title}</h2>
                    <p>{grade}학년 {owner.class}반 {number}번 {name}</p>
                </div>
                <div className="ClassCardWithDetail-header-profile">
                    <div>
                        {profile_img?<img alt="img" src={profile_img} />:<div>{name[0].toUpperCase()}</div>}
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