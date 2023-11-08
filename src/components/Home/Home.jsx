import React, { useState, useLayoutEffect } from "react";
import SearchBox from "../SeachBox/SearchBox";
import { fetchAllSourceData, filterNewsByKey, filterDataByDate } from "../../utils/functions";
import NewsListing from "../Home/NewsListing";
import "./styles/_home.scss";
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import Filter from "../Filter/Filter";

const Home = () => {
    const [newsData, setnewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [dateValue, setdateValue] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [isDataFound, setDataFound] = useState(true);

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
        const _newsData = [...newsData];
        const delay = 1000;
        let timerId;
        const inputValue = e.target.value;
        setSearchValue(inputValue);
        clearTimeout(timerId);
        if (inputValue.length > 3) {
            timerId = setTimeout(() => {
                fetchAllSourceData(inputValue)
                    .then((combinedNewsData) => {
                        if (combinedNewsData) {
                            setnewsData(combinedNewsData)
                        }
                    })
                    .catch((error) => setLoading(false))
            }, delay);
        }
        else {
            setnewsData(_newsData);
            setLoading(false)
        }
    };

    const onCalenderChange = (value) => {
        setdateValue(value);
        if (value) {
            const filterbyDateData = filterDataByDate(filteredData?.length > 0 ? filteredData : newsData, value);
            if (filterbyDateData.length > 0) {
                setFilteredData(filterbyDateData);
                setDataFound(true)
            }
            else setDataFound(false)
        }
        else {
            setFilteredData([]);
            setDataFound(true)
        }
    }

    const onSourceCategoryFilter = (e, key) => {
        const { value } = e.target;
        if (value) {
            const filteredCatData = filterNewsByKey(filteredData?.length > 0 ? filteredData : newsData, key, value);
            if (filteredCatData.length > 0) {
                setFilteredData(filteredCatData);
                setDataFound(true)
            }
            else setDataFound(false)
        }
        else {
            setFilteredData([]);
            setDataFound(true)
        }
    }

    return (
        loading ? <FullPageLoader />
            : <div className="page-wrapper">
                <SearchBox searchValue={searchValue} handleSearchChange={handleSearchChange} />
                <Filter newsData={newsData} dateValue={dateValue} onCalenderChange={onCalenderChange} onSourceCategoryFilter={onSourceCategoryFilter} />
                <NewsListing listingData={filteredData.length > 0 ? filteredData : newsData} isDataFound={isDataFound} />
            </div>
    )
}

export default Home