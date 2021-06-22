import React from 'react';
import "./EventGenrePage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

function EventGenrePage() {

    const dispatch = useDispatch();
    const events = useSelector((state) => Object.values(state.events));
    const sessionUser = useSelector((state)=> state.session.user);

    useEffect(() => {
        if(sessionUser){
            dispatch(getEvents());
        }
      }, [dispatch]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }

    const eventGenrePopGroup =()=>{
        events.map((event) =>{if(event.category === "pop"){
            return <div className="eventGenreOuterDiv">
                        <img className= "eventsCD" src={CD} alt="CD"/>
                        <div className="eventTitleAndSearchBar">
                            <div className="eventGenreTitle">
                                LIST BY GENRES
                            </div>
                            <SearchBar className="searchBarInEventsPage"/>
                        </div>
                        <div className="eventGenre">{event.category}</div>
                        <EventCard event={event} className="eventCard" />
                    </div>
        }})
    }


    return(
        <>
            {eventGenrePopGroup()}
        </>

        // <div className="eventGenreOuterDiv">
        //     <img className= "eventsCD" src={CD} alt="CD"/>
        //     <div className="eventTitleAndSearchBar">
        //         <div className="eventGenreTitle">
        //             LIST BY GENRES
        //         </div>
        //         <SearchBar className="searchBarInEventsPage"/>
        //     </div>
        //     <div className="eventGenre">{event.category}</div>
        //     <EventCard className="eventCard" />

        //     <div className="eventGenre">ROCK</div>
        //     <EventCard className="eventCard"/>

        //     <div className="eventGenre">COUNTRY</div>
        //     <EventCard className="eventCard"/>

        //     <div className="eventGenre">HIP HOP</div>
        //     <EventCard className="eventCard"/>

        //     <div className="eventGenre">JAZZ</div>
        //     <EventCard className="eventCard"/>

        //     <div className="eventGenre">FUNK</div>
        //     <EventCard className="eventCard"/>

        //     <div className="eventGenre">BLUES</div>
        //     <EventCard className="eventCard"/>
        // </div>

    )

}

export default EventGenrePage;

{/* <div className="eventGenreOuterDiv">
    <img className= "eventsCD" src={CD} alt="CD"/>
    <div className="eventTitleAndSearchBar">
        <div className="eventGenreTitle">
            LIST BY GENRES
        </div>
        <SearchBar className="searchBarInEventsPage"/>
    </div>
    <div className="eventGenre">{event.category}</div>
    <EventCard className="eventCard" />

    <div className="eventGenre">ROCK</div>
    <EventCard className="eventCard"/>

    <div className="eventGenre">COUNTRY</div>
    <EventCard className="eventCard"/>

    <div className="eventGenre">HIP HOP</div>
    <EventCard className="eventCard"/>

    <div className="eventGenre">JAZZ</div>
    <EventCard className="eventCard"/>

    <div className="eventGenre">FUNK</div>
    <EventCard className="eventCard"/>

    <div className="eventGenre">BLUES</div>
    <EventCard className="eventCard"/>
</div> */}
