import React,{useEffect, useState, useReducer} from 'react';
import "./EventCard.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

import {  useSelector,useDispatch, } from 'react-redux';
import {Redirect, useHistory} from "react-router-dom";

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { addBookmarks } from '../../store/bookmarks';
import { addTickets } from "../../store/tickets";
import {deleteBookmarks} from "../../store/bookmarks";
import {deleteTickets} from "../../store/tickets"
import {deleteMyEvents} from "../../store/myEvents"

import {csrfFetch} from "../../store/csrf";

function EventCard({event, displayPencil, displaySolidCart, bookmark}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const [contentCard, setContentCard] = useState("")

    const [price, setPrice] = useState("")
    const [savedBookmarkState,setSavedBookmarkState ] = useState(true);
    const [savedTicketState, setSavedTicketState] = useState(true);
    const [display1, setDisplay1] = useState("display");
    const [display2, setDisplay2] = useState("none");
    let [counter, setCounter]=useState(0);
    const [isDeletedEvent, setIsDeletedEvent] = useState(false)




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


//--------------------------------------------------------------------------------------
//--------------------------------------bookmarks click handler-----------------------------------------


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

        // if(createdBookmark.bookmarkState){
            setSavedBookmarkState(true)

        // }
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem("savedBookmarkState", false);
        // }
        // window.location.reload();


        console.log("handleBookmarkClick", savedBookmarkState);
    }

    const handleBookmarkDelete = async ()=>{

        const deleteBookmark = await dispatch(deleteBookmarks(eventId));


        // if(deleteBookmark.bookmarkState){
            setSavedBookmarkState(false)
        // }
        // if (typeof window !== 'undefined') {
        //     localStorage.setItem("savedBookmarkState", true);
        // }
        // window.location.reload();

        console.log("deleted");
    }



    const toggle =()=>{

        if( savedBookmarkState === false ){
            handleBookmarkClick();
        }else if (savedBookmarkState === true){
            handleBookmarkDelete();
        }

    }


    useEffect(()=>{
        setSavedBookmarkState (typeof window !== 'undefined' ? localStorage.getItem('savedBookmarkState') : null)
    },[])

    useEffect(async()=>{

        const response = await csrfFetch(`/api/bookmarks/isBookmarked`,{
         method: 'POST',
             headers:{
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify({userId, eventId})
        });
        if(response.ok){
            const isBookmarked = await response.json();
            console.log("isBookmarked", isBookmarked);
            setSavedBookmarkState(isBookmarked);
            console.log("savedBookmarkState",savedBookmarkState);
        }
     }, [savedBookmarkState])

//----------------------------------------------------------------------------------------------------
//--------------------------------------tickets click handler-----------------------------------------


const handleTicketClick = async ()=>{

    const payload = {
        eventId,
        userId
    }
    const createdTicket = await dispatch(addTickets(payload, eventId));
    console.log("createdTicket.count", createdTicket.count);

        let counter1 = counter +1
        console.log(counter1);
        setSavedTicketState(true)
        setCounter(counter1)

        // if (typeof window !== 'undefined') {
        //     localStorage.setItem("counter", counter++);
        // }

        // setCounter (typeof window !== 'undefined' ? localStorage.getItem('counter') : null)
    console.log("counter", counter);

    console.log("handleTicketClick", savedTicketState);
}

console.log("outside counter", counter);

const handleTicketDelete = async ()=>{
    console.log("handleTicketDelete")

    let counter2 = counter -1

    console.log("ticket count: " + counter);
    if(counter > 0){


        const deleteTicket= await dispatch(deleteTickets(eventId, userId));
        setCounter(counter2)
        setSavedTicketState(false)
    }
    console.log("deleted2");
}

//----------------------------------------------------------------------------------------------------
//--------------------------------------myEvents click handler-----------------------------------------
const handleMyEventDelete = async ()=>{


        const deleteMyEvent= await dispatch(deleteMyEvents(eventId, userId));
        console.log("=====deleteMyEvent", deleteMyEvent);
        setIsDeletedEvent(deleteMyEvent.isDeletedMyEvent);


}

const handleMyEventUpload = ()=>{

    history.push("/uploadMyEvent");

}

const handleMyEventEdit = ()=>{
    history.push("/edit");
}


useEffect(()=>{
    console.log("status");
    setSavedTicketState (typeof window !== 'undefined' ? localStorage.getItem('savedTicketState') : null)
},[])

useEffect(async()=>{

    const response = await csrfFetch(`/api/tickets/isTicketed`,{
     method: 'POST',
         headers:{
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({userId, eventId})
    });
    if(response.ok){
        // const {isTicketed}= await response.json();
        const counter = await response.json();
        setCounter(counter);
        // console.log("isTicketed", isTicketed);
        // setSavedTicketState(isTicketed);
        console.log("savedTicketState",savedTicketState);
    }
 }, [])


console.log("-----final savedTicketState", savedTicketState);


    if(!sessionUser){
        return <Redirect to="/signup" />
    }


    let displayStyle = "eventCard";

    if (isDeletedEvent || (displaySolidCart && counter < 1)) {
        displayStyle = "eventCard2"
    }

    return(
        <>
            <div className={displayStyle} >
                <img className= "eventCardPic" src={event.Image.eventImageUrl} alt="eventCardPic" />
                <div className={contentCard}>
                    <div className="content">
                        <div className="title">{event.title}</div>
                        <div className="date">{format(new Date(event.date), 'dd MMM yyyy', { locale: enGB })}</div>
                        <div className={price}>Starts at ${event.price}</div>
                        <div className="capacity">Capacity: {event.capacity} people</div>
                        <div className="iconsGroup"  style={{display:"display"}}>

                            <i onClick={toggle} className={savedBookmarkState === true ? "fas fa-bookmark" : "far fa-bookmark"} style={{display: !displayPencil ? 'display' : 'none' }}></i>
                            {/* <i className="far fa-bookmark"  style={{display:`${bookmarkDisplay1}`}}></i>
                            <i className="fas fa-bookmark" onClick={handleBookmarkClick} style={{display:`${bookmarkDisplay2}`}}></i> */}
                            {/* <i className="fas fa-cart-plus" style={{display:"display"}}></i> */}
                            <i onClick={handleTicketDelete} className= "fas fa-shopping-cart" style={{display: (displaySolidCart && !displayPencil) ? 'display' : 'none' }}><span className="counterNumber">{counter}</span></i>
                            {/* <i onClick={handleTicketDelete} className= "fas fa-shopping-cart" style={{display: displaySolidCart ? 'display' : 'none' }}></i> */}
                            <i onClick={handleTicketClick} className= "fas fa-cart-plus" style={{display: displaySolidCart || displayPencil? 'none' : 'display' }}><span className="counterNumber">{counter}</span></i>
                            {/* <i onClick={handleTicketClick} className= "fas fa-cart-plus" style={{display: displaySolidCart ? 'none' : 'display' }}></i> */}

                            <i onClick={handleMyEventDelete} className= "fas fa-trash-alt" style={{display: displayPencil ? 'display' : 'none' }}></i>
                            <i onClick={handleMyEventUpload} className= "fas fa-upload" style={{display: displayPencil ? 'display' : 'none' }}></i>
                            <i onClick={handleMyEventEdit} className= "fas fa-pencil-alt" style={{display: displayPencil ? 'display' : 'none' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard;
