import React from 'react';
import "./EventDatePage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

import { useSearchBar } from '../../context/SearchBarContext';


function EventDatePage() {
    const {searchTerm} = useSearchBar();

    const dispatch = useDispatch();
    let events = useSelector((state) => Object.values(state.events));
    const sessionUser = useSelector((state)=> state.session.user);

    const dynamicSearch = ()=>{
        return events.filter(event=> event.title.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    events = dynamicSearch();

    let yearMap = {};
    for(let event of events){
        let eventDate = new Date(event.date).getFullYear();
        if(yearMap[eventDate] === undefined){
            yearMap[eventDate] = [];
        }
        yearMap[eventDate].push(event);
    }


    useEffect(() => {
        if(sessionUser){
            dispatch(getEvents());
        }
      }, [dispatch, sessionUser]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }


    let years = Object.keys(yearMap);

    const eventDateGroup = ()=>{

        const ret = years.map((year)=>{
            let yearEvents = yearMap[year];
            const eventsCards = yearEvents.map(event =><EventCard event={event} displayPlusCart={false}className="eventCard" />);
            return  <>
                        <div className="eventGenre">{year}</div>
                        {eventsCards}
                    </>

        })
        return ret
    }


    return(
        <>
             <div className="eventGenreOuterDiv">
                <img className= "eventsCD" src={CD} alt="CD"/>
                <div className="eventTitleAndSearchBar">
                    <div className="eventGenreTitle">
                        LIST BY DATES
                    </div>
                    <SearchBar className="searchBarInEventsPage"/>
                </div>
                {eventDateGroup()}
                {/* <div className="bottomSpace"></div> */}
            </div>

        </>

    )

}

export default EventDatePage;
