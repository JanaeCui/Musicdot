import React from 'react';
import "./EventCard.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';

function EventCard() {
    return(
        <div className="eventCard">
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
        </div>
    )

}

export default EventCard;
