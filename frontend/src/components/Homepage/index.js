import React from 'react';
import CD from '../../images/CD.png'
import RectangleRight from '../../images/RectangleRight.png'
import homepagePicRight from '../../images/homepagePicRight.png'
import RectangleLeft from '../../images/RectangleLeft.png'
import homepagePicLeft from '../../images/homepagePicLeft.png'
import homepagePicMiddle from '../../images/homepagePicMiddle.png'
import "./Homepage.css"
function Homepage() {

    return(
        <>
            <img className= "CD" src={CD} />
            <img className= "RectangleRight" src={RectangleRight} />
            <img className= "homepagePicRight" src={homepagePicRight} />
            <img className= "RectangleLeft" src={RectangleLeft} />
            <img className= "homepagePicLeft" src={homepagePicLeft} />
            <img className= "homepagePicMiddle" src={homepagePicMiddle} />
        </>
    )
}

export default Homepage;
