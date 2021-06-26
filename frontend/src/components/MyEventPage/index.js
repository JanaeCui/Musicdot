import React from 'react';
import "./MyEventPage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getMyEvents } from '../../store/myEvents';

import { useSearchBar } from '../../context/SearchBarContext';

function MyEventPage() {

    const {searchTerm} = useSearchBar();

    const dispatch = useDispatch();
    let events = useSelector((state) => Object.values(state.myEvents));
    console.log(events, "I'm events");
    const sessionUser = useSelector((state)=> state.session.user);

    const dynamicSearch = ()=>{
        return events.filter(event=> {
            // TODO: empty event
            return event && event.title.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    events = dynamicSearch();

    useEffect(() => {
        if(sessionUser){

            dispatch(getMyEvents(sessionUser.id));
            console.log("_______");

        }
      }, [dispatch, sessionUser]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }




    const myEventGroup = ()=>{
        //     let eventsMap = {};
        //         console.log("########", tickets);
        //     // const events = tickets.Event;
        //     for(let ticket of tickets){
        //         if(eventsMap[ticket.Event.id] === undefined){
        //             eventsMap[ticket.Event.id] = ticket.Event;
        //         }

        //     }


        //     const eventsMapArray = Object.values(eventsMap)

        //    return eventsMapArray.map((event)=>{
        //         return  <>
        //                   <EventCard event={event} ticket ={tickets} displaySolidCart={true} className="eventCard" />
        //                 </>
        //     })


            return events.map((event) =>{
                console.log("map events", events);
                 return  <>
                             <EventCard event={event} className="eventCard" />

                         </>
             })

    }
    console.log("rendering")
    return(
        <>
             <div className="eventGenreOuterDiv">
                <img className= "eventsCD" src={CD} alt="CD"/>
                <div className="eventTitleAndSearchBar">

                    <div className="eventGenreTitle">
                        MY EVENTS
                    </div>
                    <SearchBar className="searchBarInEventsPage"/>
                </div>

                {myEventGroup()}
            </div>

        </>

    )

}

export default MyEventPage;
