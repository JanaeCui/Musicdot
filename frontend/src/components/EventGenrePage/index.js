import React from 'react';
import "./EventGenrePage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

function EventGenrePage() {

    const dispatch = useDispatch();
    const events = useSelector((state) => Object.values(state.events));
    const sessionUser = useSelector((state)=> state.session.user);
    const categories = events.map(event => event.category);

    useEffect(() => {
        if(sessionUser){
            dispatch(getEvents());
        }
      }, [dispatch]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }



    const eventGenreGroup = (genre)=>{

            return events.map((event) =>{

                if(event.category === genre){
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
                        LIST BY GENRES
                    </div>
                    <SearchBar className="searchBarInEventsPage"/>
                </div>
                {categories.includes("pop") && <div className="eventGenre">POP</div>}
                {eventGenreGroup("pop")}
                {categories.includes("rock") && <div className="eventGenre">ROCK</div>}
                {eventGenreGroup("rock")}
                {categories.includes("country") && <div className="eventGenre">COUNTRY</div>}
                {eventGenreGroup("country")}
                {categories.includes("hip hop") && <div className="eventGenre">HIP POP</div>}
                {eventGenreGroup("hip hop")}
                {categories.includes("jazz") && <div className="eventGenre">JAZZ</div>}
                {eventGenreGroup("jazz")}
                {categories.includes("funk") && <div className="eventGenre">FUNK</div>}
                {eventGenreGroup("funk")}
                {categories.includes("blues") && <div className="eventGenre">BLUES</div>}
                {eventGenreGroup("blues")}
            </div>

        </>

    )

}

export default EventGenrePage;
