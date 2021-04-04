import React from 'react';
import "./SubjectItem.scss"

const SubjectItem = ({subject}) => {

    return (
        <div className="subjectItem">
            <article className="subjectItem-article">
                <header>{subject.title}</header>
                <aside>조회수 : {subject.click_count}</aside>
            </article>
        </div>
    )
}

export default SubjectItem;