import React from 'react';

import "./EventDetailPage.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
import CD from '../../images/CD.png'
import eventDetailCDCover from '../../images/eventDetailCDCover.jpeg'

import { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Redirect} from "react-router-dom";

import { getEvents } from '../../store/events';

import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'

import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Marker from './Marker';

function EventDetailPage() {
    const eventForDetail = JSON.parse(localStorage.getItem('eventForDetail'))
    const sessionUser = useSelector((state)=> state.session.user);

//---------------------------------------------------------------------------
    const containerStyle = {
        width: '1800px',
        height: '400px'
      };

      const center = {
        lat: parseInt(eventForDetail.Venue.lat) ,
        lng: parseInt(eventForDetail.Venue.lng)
      };

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDf5NQg8wuPgIVXyc0c4PMC7w7_QKVa6Ag"
      })

      const [map, setMap] = React.useState(null)

      const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
      }, [])

      const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
      }, [])
//----------------------------------------------------------------------------------




    if(!sessionUser){
        return <Redirect to="/signup" />
    }

    return isLoaded ?(
        <>
        <div>
            <img className= "eventDetailBackgroundPic" src={eventForDetail.Image.eventImageUrl} alt="eventDetailBackgroundPic" />
            <img className= "eventDetailCD" src={CD} alt="CD"/>
            <img className= "eventDetailCoverPic" src={eventDetailCDCover} alt="eventDetailBackgroundPic" />
            <iframe className="musicTrack" width="30%" height="130" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/48748778&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
        </div>
        <div className="eventDetailMiddleBackground">
            <a href="/eventDetail"  className="title">{eventForDetail.title}</a>
            <div className="date">{format(new Date(eventForDetail.date), 'dd MMM yyyy', { locale: enGB })}</div>
            <div className="price1">Starts at ${eventForDetail.price}</div>
            <div className="capacity">Capacity: {eventForDetail.capacity} people</div>
        </div>
        <div className="eventDetailBottomBackground">
            <a href="/eventDetail"  className="title">DESCRIPTION</a>
            <div className="eventDetailDescription">{eventForDetail.description}</div>
        </div>
        <div>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
             <Marker
            lat={parseInt(eventForDetail.Venue.lat)}
            lng={parseInt(eventForDetail.Venue.lng)}
            name="My Marker"
            color= "#DB2E38"
          />
        </GoogleMap>
        {/* Async script executes immediately and must be after any DOM elements used in callback. */}
        </div>
        </>
    ): <></>

}

export default EventDetailPage;
