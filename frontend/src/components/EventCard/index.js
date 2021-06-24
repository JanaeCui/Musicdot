import React,{useEffect, useState} from 'react';
import "./EventCard.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import {  useSelector,useDispatch, } from 'react-redux';
import {Redirect, useHistory} from "react-router-dom";

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import {useBookmarkIcon} from "../../context/BookmarkIconContext"
import { addBookmarks } from '../../store/bookmarks';

function EventCard({event, bookmark}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { setBookmarkState} = useBookmarkIcon();


    const [liked, setLiked] = useState(false);
    localStorage.setItem('likedKey', liked);
    const storageLiked = localStorage.getItem('likedKey');

    const [contentCard, setContentCard] = useState("")

    const [price, setPrice] = useState("")
    const [bookmarkClassName, setBookmarkClassName] = useState("")
    const [savedBookmarkState,setSavedBookmarkState ] = useState();

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

    // const createdBookmark={};

    const eventId = event.id;
    const userId = sessionUser.id;
    const handleBookmarkClick = async ()=>{
        const payload = {
            eventId,
            userId
        }
        const createdBookmark = await dispatch(addBookmarks(payload, eventId));
        console.log("createdBookmark", createdBookmark);

        if(createdBookmark.bookmarkState){
            setBookmarkClassName(true)

        }
        if (typeof window !== 'undefined') {
            localStorage.setItem("savedBookmarkState", true);
        }
    }
    useEffect(()=>{
        setSavedBookmarkState (typeof window !== 'undefined' ? localStorage.getItem('savedBookmarkState') : null)
    },[])

    // console.log("savedBookmarkState",savedBookmarkState);

    // const toggle=()=>{

    //     // setLiked(bookmarkState);
    //     let localLiked = liked;
    //     localLiked = !localLiked;
    //     setLiked(localLiked)
    // }


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
                        <div className="iconsGroup" onClick={handleBookmarkClick}  style={{display:"display"}}>
                            <i className={bookmarkClassName === true || savedBookmarkState === true ? "fas fa-bookmark" : "far fa-bookmark"} style={{display:`display`}}></i>
                            {/* <i className="far fa-bookmark"  style={{display:`${bookmarkDisplay1}`}}></i>
                            <i className="fas fa-bookmark" onClick={handleBookmarkClick} style={{display:`${bookmarkDisplay2}`}}></i> */}
                            <i className="fas fa-cart-plus" style={{display:"display"}}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;
