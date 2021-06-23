import React from 'react';
import "./BookmarkPage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getBookmarks } from '../../store/bookmarks';

import { useSearchBar } from '../../context/SearchBarContext';

function EventGenrePage() {
    const {searchTerm} = useSearchBar();

    const dispatch = useDispatch();
    let bookmarks = useSelector((state) => Object.values(state.bookmarks));
    console.log("bookmarks", bookmarks);
    const sessionUser = useSelector((state)=> state.session.user);

    const dynamicSearch = ()=>{
        return bookmarks.filter(bookmark=> bookmark.Event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    bookmarks = dynamicSearch();

    useEffect(() => {
        if(sessionUser){
            dispatch(getBookmarks());
        }
      }, [dispatch, sessionUser]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }



    const eventGenreGroup = ()=>{

            return bookmarks.map((bookmark) =>{

                 return  <>
                             <EventCard event={bookmark.Event} className="eventCard" />
                         </>
             })

    }

    return(
        <>
             <div className="eventGenreOuterDiv">
                <img className= "eventsCD" src={CD} alt="CD"/>
                <div className="eventTitleAndSearchBar">

                    <div className="eventGenreTitle">
                        BOOKMARKS
                    </div>
                    <SearchBar className="searchBarInEventsPage"/>
                </div>

                {eventGenreGroup()}
            </div>

        </>

    )

}

export default EventGenrePage;
