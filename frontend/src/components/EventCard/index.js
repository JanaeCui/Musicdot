import React,{useEffect, useState} from 'react';
import "./EventCard.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import {  useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'


function EventCard({event}) {
    const [contentCard, setContentCard] = useState("")

    const [price, setPrice] = useState("")

    useEffect(()=>{
        if(event.id % 2 === 0){
            console.log(event.id);
            setContentCard("contentCard2")
        }else{
            setContentCard("contentCard1")
        }
    },[])

    useEffect(()=>{
        if(event.id % 2 === 0){
            console.log(event.id);
            setPrice("price2")
        }else{
            setPrice("price1")
        }
    },[])

    const sessionUser = useSelector((state)=> state.session.user);

    if(!sessionUser){
        return <Redirect to="/signup" />
    }

    return(
        <>
            <div className="eventCard">
                <img className= "eventCardPic" src={event.Image.eventImageUrl} alt="eventCardPic" />
                <div className={contentCard}>
                    <div className="content">
                        <div className="title">{event.title}</div>
                        <div className="date">{format(new Date(event.date), 'dd MMM yyyy', { locale: enGB })}</div>
                        <div className={price}>Starts at ${event.price}</div>
                        <div className="capacity">Capacity: {event.capacity} people</div>
                        <div className="iconsGroup" style={{display:"display"}}>
                            <i className="far fa-bookmark" style={{display:"display"}}></i>
                            <i className="fas fa-cart-plus" style={{display:"display"}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;
