import React from 'react';
import "./Footer.css"
import '../../../node_modules/font-awesome/css/font-awesome.min.css';
function Footer() {
    return(
        <div className= "footer">
            <div className="footerWebName">MUSIC DOT</div>
            <div className="footerIcons">
                <i className="fab fa-twitter"></i>
                <i className="fab fa-vimeo"></i>
                <i className="fab fa-facebook-f"></i>
                <i className="fab fa-youtube"></i>
                <i className="fab fa-snapchat-ghost"></i>
            </div>
            <div className="footerCopyRight">© 2021 music dot copy right</div>
        </div>
    )
}

export default Footer;
