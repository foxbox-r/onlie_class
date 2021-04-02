import React from 'react';
import "./TitleCard.scss"

const TitleCard = ({title,children}) => {

    return (
        <div className="title-card">
            <header className="title-card-header">{title}</header>
            <article className="title-card-article">{children}</article>
        </div>
    )
}

export default TitleCard;