import NewsCard from "./NewsCard";
import "./styles/_newsListing.scss"

const NewsListing = (props) => {
    const { listingData = [] } = props;
    return (
        listingData?.length > 0 ?
            <div className="newsListing">
                {listingData.map((data, index) => {
                    return <NewsCard cardData={data} index={index} />
                })}
            </div>
            : 'Not Found'
    )
}

export default NewsListing
