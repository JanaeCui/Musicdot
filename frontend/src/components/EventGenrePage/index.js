import React from 'react';
import "./EventGenrePage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

function EventGenrePage() {
    return(
        <div className="eventGenreOuterDiv">
            <img className= "eventsCD" src={CD} alt="CD"/>
            <div className="eventTitleAndSearchBar">
                <div className="eventGenreTitle">
                    LIST BY GENRES
                </div>
                <SearchBar className="searchBarInEventsPage"/>
            </div>
            <div className="eventGenre">POP</div>
            <EventCard className="eventCard" />
            <EventCard className="eventCard"/>

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
        </div>

    )

}

export default EventGenrePage;
