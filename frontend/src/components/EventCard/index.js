import React from 'react';
import "./EventCard.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'


function EventCard({event}) {

    // const dispatch = useDispatch();
    // const events = useSelector((state) => Object.values(state.events));
    const sessionUser = useSelector((state)=> state.session.user);

    // useEffect(() => {
    //     if(sessionUser){
    //         dispatch(getEvents());
    //     }
    //   }, [dispatch]);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }

    return(
        <>
        {/* {events.map((event) =>{ */}
            return <div className="eventCard">
                <img className= "eventCardPic" src={event.Image.eventImageUrl} alt="eventCardPic" />
                <div className="contentCard1">
                    <div className="content">
                        <div className="title">{event.title}</div>
                        <div className="date">{format(new Date(event.date), 'dd MMM yyyy', { locale: enGB })}</div>
                        <div className="price1">Starts at ${event.price}</div>
                        <div className="capacity">Capacity: {event.capacity} people</div>
                        <div className="iconsGroup" style={{display:"display"}}>
                            <i className="far fa-bookmark" style={{display:"display"}}></i>
                            <i className="fas fa-cart-plus" style={{display:"display"}}></i>
                        </div>
                    </div>
                </div>
            </div>
        {/* } */}
        )
        {/* } */}
        </>
    )

}

export default EventCard;



{/* <div className="eventCard">
    <img className= "eventCardPic" src="/images/eventCardPic1.png" alt="eventCardPic" />
    <div className="contentCard1">
        <div className="content">
            <div className="title">COACHELLA</div>
            <div className="date">Thu, Jul 15, 2021 10:30 AM PDT</div>
            <div className="price1">Starts at $3.00</div>
            <div className="capacity">Capacity: 25 people</div>
            <div className="iconsGroup" style={{display:"display"}}>
                <i className="far fa-bookmark" style={{display:"display"}}></i>
                <i className="fas fa-cart-plus" style={{display:"display"}}></i>
            </div>
        </div>
    </div>
</div> */}
