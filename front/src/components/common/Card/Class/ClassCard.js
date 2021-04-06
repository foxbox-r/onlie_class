import React from 'react';
import "./ClassCard.scss"

const ClassCard = ({
    className,
    classInfo,
    onClickGoToClassAbout,
}) => {
    const {title,description,owner,code} = classInfo;
    const {grade,number,name} = owner;
    return (
        <div className={"classCard "+(className.length?className:"")}>
            <header onClick={onClickGoToClassAbout} className="classCard-header" >
                <h3>{title}</h3>
                <p>{grade}학년 {owner.class}반 {number}번 {name}</p>
            </header>
            <article  className="classCard-article">
                {description}
            </article>
            <footer className="classCard-footer">
                수업코드 : {code}
            </footer>
        </div>
    )
}

export default ClassCard;