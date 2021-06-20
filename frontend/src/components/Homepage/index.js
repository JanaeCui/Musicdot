import React from 'react';
import CD from '../../images/CD.png'
import RectangleRight from '../../images/RectangleRight.png'
import homepagePicRight from '../../images/homepagePicRight.png'
import RectangleLeft from '../../images/RectangleLeft.png'
import homepagePicLeft from '../../images/homepagePicLeft.png'
import homepagePicMiddle from '../../images/homepagePicMiddle.png'
import "./Homepage.css"
import {useHomepageAnimation} from "../../context/HomepageAnimationContext"
import { NavLink } from 'react-router-dom';
function Homepage() {
    const {active} = useHomepageAnimation();
    console.log("active", active);
    return(
        <>
            <img className= "CD" id={active + "0"} src={CD} />
            <img className= "RectangleRight" id={active + "1"} src={RectangleRight} />
            <div className={active + "8"}><NavLink to="events/dates" className={active + "Text"}>Show Events By Venus</NavLink></div>
            <img className= "homepagePicRight" id={active + "2"} src={homepagePicRight} />
            <img className= "RectangleLeft" id={active +"3"} src={RectangleLeft} />
            <div className={active + "7"}><NavLink to="events/dates" className={active + "Text"}>Show Events By Dates</NavLink></div>
            <img className= "homepagePicLeft" id={active+ "4"} src={homepagePicLeft} />
            <div className={active + "6"}><NavLink to="events/genres" className={active + "Text"}>Show Events By Genres</NavLink></div>
            <img className= "homepagePicMiddle" id={active + "5"} src={homepagePicMiddle} />

        </>
    )
}

export default Homepage;
