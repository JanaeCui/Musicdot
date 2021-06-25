import React from 'react';
import "./EventVenuePage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

import { useSearchBar } from '../../context/SearchBarContext';

function EventVenuePage() {
    const {searchTerm} = useSearchBar();

    const dispatch = useDispatch();
    let events = useSelector((state) => Object.values(state.events));
    const sessionUser = useSelector((state)=> state.session.user);
    const venues = events.map(event => event.Venue.name);

    const dynamicSearch = ()=>{
        return events.filter(event=> event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    events = dynamicSearch();

    useEffect(() => {
        if(sessionUser){
            dispatch(getEvents());
        }
      }, [dispatch, sessionUser]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }



    const eventVenueGroup = (venue)=>{

            return events.map((event) =>{

                if(event.Venue.name === venue){
                 return  <>
                             <EventCard event={event} className="eventCard" />
                         </>

                 }
                 else{
                     return null;
                 }

             })

    }

    return(
        <>
             <div className="eventGenreOuterDiv">
                <img className= "eventsCD" src={CD} alt="CD"/>
                <div className="eventTitleAndSearchBar">
                    <div className="eventGenreTitle">
                        LIST BY VENUES
                    </div>
                    <SearchBar className="searchBarInEventsPage"/>
                </div>
                {!searchTerm &&  venues.includes("America") && <div className="eventGenre">AMERICA</div>}
                {eventVenueGroup("America")}
                {!searchTerm &&  venues.includes("Asia") && <div className="eventGenre">ASIA</div>}
                {eventVenueGroup("Asia")}
                {!searchTerm &&  venues.includes("South America") && <div className="eventGenre">SOUTH AMERICA</div>}
                {eventVenueGroup("South America")}
                {!searchTerm &&  venues.includes("Europe") && <div className="eventGenre">EUROPE</div>}
                {eventVenueGroup("Europe")}
                {!searchTerm &&  venues.includes("Africa") && <div className="eventGenre">AFRICA</div>}
                {eventVenueGroup("Africa")}
                {/* <div className="bottomSpace"></div> */}
            </div>

        </>

    )

}

export default EventVenuePage;
