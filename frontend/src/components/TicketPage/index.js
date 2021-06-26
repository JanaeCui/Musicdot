import React from 'react';
import "./TicketPage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import EventCard from '../EventCard';
import CD from '../../images/CD.png'
import SearchBar from "../../components/SearchBar"

import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getTickets } from '../../store/tickets';

import { useSearchBar } from '../../context/SearchBarContext';

function TicketPage() {

    const {searchTerm} = useSearchBar();

    const dispatch = useDispatch();
    let tickets = useSelector((state) => Object.values(state.tickets));

    const sessionUser = useSelector((state)=> state.session.user);

    const dynamicSearch = ()=>{
        return tickets.filter(ticket=> {
            // TODO: empty ticket
            return ticket.Event && ticket.Event.title.toLowerCase().includes(searchTerm.toLowerCase())
        })
    }

    tickets = dynamicSearch();

    useEffect(() => {
        if(sessionUser){
            dispatch(getTickets(sessionUser.id));

        }
      }, [dispatch, sessionUser]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }




    const ticketGroup = ()=>{
            let eventsMap = {};
            // const events = tickets.Event;
            for(let ticket of tickets){
                if(eventsMap[ticket.Event.id] === undefined){
                    eventsMap[ticket.Event.id] = ticket.Event;
                }

            }


            const eventsMapArray = Object.values(eventsMap)

           return eventsMapArray.map((event)=>{
                return  <>
                          <EventCard event={event} ticket ={tickets} displaySolidCart={true} className="eventCard" />
                        </>
            })


            // return tickets.map((ticket) =>{

            //      return  <>
            //                  <EventCard event={ticket.Event} ticket ={tickets} displaySolidCart={true} className="eventCard" />

            //              </>
            //  })

    }

    return(
        <>
             <div className="eventGenreOuterDiv">
                <img className= "eventsCD" src={CD} alt="CD"/>
                <div className="eventTitleAndSearchBar">

                    <div className="eventGenreTitle">
                        TICKETS
                    </div>
                    <SearchBar className="searchBarInEventsPage"/>
                </div>

                {ticketGroup()}
            </div>

        </>

    )

}

export default TicketPage;
