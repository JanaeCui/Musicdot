import React from 'react';
import "./EventGenrePage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

function EventGenrePage() {

    const dispatch = useDispatch();
    let events = useSelector((state) => Object.values(state.bookmarks.Event));
    const sessionUser = useSelector((state)=> state.session.user);


    useEffect(() => {
        if(sessionUser){
            dispatch(getEvents());
        }
      }, [dispatch, sessionUser]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }



    const eventGenreGroup = ()=>{

            return events.map((event) =>{

                 return  <>
                             <EventCard event={event} className="eventCard" />
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
                </div>

                {eventGenreGroup()}

                <div className="bottomSpace"></div>
            </div>

        </>

    )

}

export default EventGenrePage;
