import React, {useState} from 'react';
import "./MyEventsUploadPage.css"
import CD from '../../images/CD.png'

import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import {creatMyEvents} from "../../store/myEvents"
import {Redirect, useHistory} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

function MyEventsUploadPage() {


    const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };
//-----------------------------------------------------------------------------------------------------
    const history = useHistory();
    const dispatch = useDispatch();
    const eventCategories = ["pop", "rock", "country", "hip hop", "jazz", "funk", "others"]
    const names = ["America", "Asia", "South America", "Europe", "Africa"]

    const [eventTitle, setEventTitle] = useState("");
    const [eventCategory, setEventCategory] = useState(eventCategories[0]);
    const [price, setPrice] = useState(0);
    const [capacity,setCapacity] = useState(0);
    const [venueName, setVenueName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity]= useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("")
    const [lat, setLat] = useState(0.00);
    const [lng, setLng] = useState(0.00);
    const [eventImageUrl, setEventImageUrl] = useState("");
    const [musicTitle, setMusicTitle] = useState("");
    const [eventMusicUrl, setEventMusicUrl] = useState("");
    const [description, setDescription] = useState("");

    const sessionUser = useSelector((state)=> state.session.user);
    const userId = sessionUser.id

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            eventImageUrl,
            venueName,
            address,
            city,
            state,
            zipCode,
            lat,
            lng,
            musicTitle,
            eventMusicUrl,
            eventCategory,
            eventTitle,
            selectedDate,
            price,
            capacity,
            description
        };

        let createdEvent = await dispatch(creatMyEvents(payload,userId));
        if (createdEvent) {
          history.push(`/myEvents`);
        }
      };


    if(!sessionUser){
        return <Redirect to="/signup" />
    }


    return(
        <section className="uploadPageContainer">
            <img className= "eventsCD" src={CD} alt="CD"/>
            <div className="FormTitle">UPLOAD EVENT</div>
            <form onSubmit={handleSubmit}>
               <div className="subTitle basicInfo">BASIC INFO</div>
               <div className="uploadInputGroup">
                <label className="uploadLabel">
                        EVENT TITLE
                        <input
                            className="uploadInput eventTitle"
                            type="text"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        EVENT CATEGORY
                        <select className="uploadSelect" onChange={(e) => setEventCategory(e.target.value)}>
                            {eventCategories.map(eventCategory =>
                            <option key={eventCategory}>{eventCategory}</option>
                            )}
                        </select>
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabelDate">
                        DATE
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <div className="dateContainer">
                            <Grid container justify="space-between">
                                <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                />
                                {/* <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dialog"
                                label="Date picker dialog"
                                format="MM/dd/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                /> */}
                                <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                />
                            </Grid>
                        </div>
                        </MuiPickersUtilsProvider>
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        PRICE
                        <input
                        className="uploadInput price"
                        type="number"
                        placeholder="Number"
                        min="1"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)} />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        CAPACITY
                        <input
                        className="uploadInput uploadCapacity"
                        type="number"
                        placeholder="Number"
                        min="1"
                        required
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)} />
                    </label>
                </div>
                <div className= "subTitle venueTitle">VENUE</div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        VENUE NAME
                        {/* <input
                            className="uploadInput venueName"
                            type="text"
                            value={venueName}
                            onChange={(e) => setVenueName(e.target.value)}
                            required
                        /> */}
                        <select className="uploadSelect2" onChange={(e) => setVenueName(e.target.value)}>
                            {names.map(venueName =>
                            <option key={venueName}>{venueName}</option>
                            )}
                        </select>
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        ADDRESS
                        <input
                            className="uploadInput address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        CITY
                        <input
                            className="uploadInput city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        STATE
                        <input
                            className="uploadInput state"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        ZIP CODE
                        <input
                            className="uploadInput zipCode"
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        LATITUDE
                        <input
                        className="uploadInput lat"
                        type="number"
                        placeholder="Decimal"
                        step="0.01"
                        required
                        value={lat}
                        onChange={(e) => setLat(e.target.value)} />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        LONGITUDE
                        <input
                        className="uploadInput lng"
                        type="number"
                        placeholder="Decimal"
                        step="0.01"
                        required
                        value={lng}
                        onChange={(e) => setLng(e.target.value)} />
                    </label>
                </div>
                <div className= "subTitle imageTitle">IMAGE</div>
                <div className="uploadInputGroup2">
                    <label className="uploadLabel">
                        Url
                    </label>

                    <input
                        className="uploadInput eventImageUrl"
                        type="text"
                        value={eventImageUrl}
                        onChange={(e) => setEventImageUrl(e.target.value)}
                        required
                    />


                </div>
                <div className= "subTitle imageTitle">MUSIC</div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel ">
                        MUSIC TITLE
                        <input
                            className="uploadInput musicTitle"
                            type="text"
                            value={musicTitle}
                            onChange={(e) => setMusicTitle(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="uploadInputGroup">
                    <label className="uploadLabel">
                        Url
                        <input
                            className="uploadInput eventMusicUrl"
                            type="text"
                            value={eventMusicUrl}
                            onChange={(e) => setEventMusicUrl(e.target.value)}
                            required
                        />
                    </label>
                </div>
                <div className="subTitle descriptionTitle">DESCRIPTION</div>
                <div className="uploadInputGroup">
                    <label>
                        <textarea className="uploadTextArea" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                </div>
                <div className="uploadButtonDiv">
                    <button className="uploadButton" type="submit">SUBMIT</button>
                </div>
            </form>
            

      </section>
    )
}

export default MyEventsUploadPage;
