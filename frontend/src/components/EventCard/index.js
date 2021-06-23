import React,{useEffect, useState} from 'react';
import "./EventCard.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import {  useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import {useBookmarkIcon} from "../../context/BookmarkIconContext"

function EventCard({event}) {
    const {bookmarkIconState} = useBookmarkIcon();

    const [contentCard, setContentCard] = useState("")

    const [price, setPrice] = useState("")

    useEffect(()=>{
        if(event.id % 2 === 0){
            setContentCard("contentCard2")
        }else{
            setContentCard("contentCard1")
        }
    },[event.id])

    useEffect(()=>{
        if(event.id % 2 === 0){
            setPrice("price2")
        }else{
            setPrice("price1")
        }
    },[event.id])

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
                            <i className={bookmarkIconState} style={{display:"display"}}></i>
                            <i className="fas fa-cart-plus" style={{display:"display"}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;
