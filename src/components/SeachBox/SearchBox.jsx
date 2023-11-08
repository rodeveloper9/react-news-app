import React from "react";
import "./styles/_searchBox.scss";

const SearchBox = (props) => {
    const { searchValue, handleSearchChange } = props;
    return (
        <div className="searchBar">
            <input type="text" className="searchBar_field" placeholder="Search" value={searchValue} onChange={(e) => handleSearchChange(e)} />
        </div>
    )
}

export default SearchBox
