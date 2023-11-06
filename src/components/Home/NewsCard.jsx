import React from "react";
import "./styles/_newsCard.scss"
import {formatDate} from "../../utils/functions"

const NewsCard = (props) => {
    const { cardData = {}, index } = props;
    return (
        <div className="news-card" index={`${cardData.id}_${index}`}>
            <a href={cardData?.link} target="_blank" className="news-card__card-link"></a>
            <img src={cardData?.imageUrl} alt="" className="news-card__image" />
            <div className="news-card__text-wrapper">
                <h2 className="news-card__title">{cardData?.title}</h2>
                <div className="news-card__post-date">{formatDate(cardData?.publishDate)}</div>
                {/* <div className="news-card__details-wrapper">
                    <p className="news-card__excerpt">Lorem ipsum dolor sit amet consectetur adipisicing elit. Est pariatur nemo tempore repellat? Ullam sed officia iure architecto deserunt distinctio, pariatur&hellip;</p>
                    <a href="#" className="news-card__read-more">Read more <i className="fas fa-long-arrow-alt-right"></i></a>
                </div> */}
            </div>
        </div>
    )
}

export default NewsCard;
