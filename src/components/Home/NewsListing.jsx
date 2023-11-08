import NewsCard from "./NewsCard";
import "./styles/_newsListing.scss"

const NewsListing = (props) => {
    const { listingData = [], isDataFound } = props;
    return (
        (listingData?.length > 0 && isDataFound) ?
            <div className="newsListing">
                {listingData.map((data, index) => {
                    return <NewsCard cardData={data} key={index} />
                })}
            </div>
            : 'No Data Found'
    )
}

export default NewsListing
