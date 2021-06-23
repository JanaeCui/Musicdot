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
    let events = useSelector((state) => state.events);
    const sessionUser = useSelector((state)=> state.session.user);
    const venues = Object.values(events).map(event =>{if(event.Venue){return event.Venue.name }} );

    const dynamicSearch = ()=>{
        return Object.values(events).filter(event=> {if (event.title){return event.title.toLowerCase().includes(searchTerm.toLowerCase())}})
    }

    events = dynamicSearch();

    useEffect(() => {
        if(sessionUser){
            dispatch(getEvents());
        }
      }, [dispatch, sessionUser]);

    useEffect(()=>{
        console.log("current events", events);
    },[events])

    if(!sessionUser){
        return <Redirect to="/signup" />
    }



    const eventGenreGroup = (venue)=>{
            console.log("events", events);
            return events.list.map((event) =>{

                if(events[event].Venue.name === venue){
                 return  <>
                             <EventCard event={events[event]} className="eventCard" />
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
                {events.length !== 0 && eventGenreGroup("America")}
                {!searchTerm &&  venues.includes("Asia") && <div className="eventGenre">ASIA</div>}
                {events.length !== 0 && eventGenreGroup("Asia")}
                {!searchTerm &&  venues.includes("South America") && <div className="eventGenre">SOUTH AMERICA</div>}
                {events.length !== 0 && eventGenreGroup("South America")}
                {!searchTerm &&  venues.includes("Europe") && <div className="eventGenre">EUROPE</div>}
                {events.length !== 0 && eventGenreGroup("Europe")}
                {!searchTerm &&  venues.includes("Africa") && <div className="eventGenre">AFRICA</div>}
                {events.length !== 0 && eventGenreGroup("Africa")}
                {searchTerm && <div className="bottomSpace"></div>}
            </div>

        </>

    )

}

export default EventVenuePage;
