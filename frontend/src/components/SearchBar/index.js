import React from 'react';
import "./SearchBar.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

function SearchBar() {
    return(
        <>
            <input type="search" className="eventsSearchBar" placeholder="Search"></input>
            <i className="fas fa-search"></i>
        </>
    )
}

export default SearchBar;
