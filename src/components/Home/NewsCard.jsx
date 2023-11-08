import React from "react";
import "./styles/_newsCard.scss"
import {formatDate} from "../../utils/functions"

const NewsCard = (props) => {
    const { cardData = {}, index } = props;
    return (
        <div className="news-card" key={`${cardData.id}_${index}`}>
            <a href={cardData?.link} target="_blank" title={cardData?.title} className="news-card__card-link"></a>
            <img src={cardData?.imageUrl} alt="" className="news-card__image" />
            <div className="news-card__text-wrapper">
                <h2 className="news-card__title">{cardData?.title}</h2>
                <div className="news-card__post-date">{formatDate(cardData?.publishDate)}</div>
            </div>
        </div>
    )
}

export default NewsCard;
