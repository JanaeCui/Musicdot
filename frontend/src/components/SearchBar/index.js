import React from 'react';
import "./SearchBar.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import { useSearchBar } from '../../context/SearchBarContext';

function SearchBar() {
    const {searchTerm, setSearchTerm} = useSearchBar();
    const editSearch = (e)=>{
        setSearchTerm(e.target.value)
    }
    return(
        <>
            <input type="search" value={searchTerm} onChange={editSearch} className="eventsSearchBar" placeholder="Search"></input>
            <i className="fas fa-search"></i>
        </>
    )
}

export default SearchBar;
