import React, { useEffect, useState, useLayoutEffect } from "react";
import { useFetch } from "../../utils/hooks/useFetch";
import SearchBox from "../SeachBox/SearchBox";
import { fetchAllSourceData, filterNewsByKeyword } from "../../utils/functions";
import NewsListing from "../Home/NewsListing";
import "./styles/_home.scss";
import FullPageLoader from "../FullPageLoader/FullPageLoader";

const Home = () => {
    const [newsData, setnewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('')

    useLayoutEffect(() => {
        fetchAllSourceData()
            .then((combinedNewsData) => {
                if (combinedNewsData) {
                    setLoading(false)
                    setnewsData(combinedNewsData)
                }
            })
            .catch((error) => setLoading(false))
    }, [])

    const handleSearchChange = (e) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue)
        if (inputValue.length > 3) {
            fetchAllSourceData(inputValue)
            .then((combinedNewsData) => {
                if (combinedNewsData) {
                    setLoading(false)
                    setnewsData(combinedNewsData)
                }
            })
            .catch((error) => setLoading(false))
        }
    }

    return (
        loading ? <FullPageLoader />
            : <div className="page-wrapper">
                <SearchBox searchValue={searchValue} handleSearchChange={handleSearchChange} />
                <NewsListing listingData={newsData} />
            </div>
    )
}

export default Home