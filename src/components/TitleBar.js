import React from 'react';
import './../css/TitleBar.css';
import Instagram from './../assets/instagram-ftr.png'
import YouTube from './../assets/youtube-ftr.png'
import LinkedIn from './../assets/linkedin-ftr.png'

const TitleBar = () => {
    return (
        <section className="flex-row page-row" id="titlebar">
            <div className="titleCTA">
                <p className="titleType">Join our network to get client leads <a className="titleLink" target="_blank" href="https://canadacriminallawyer.ca/network"><button type="button" className="titleButton">Learn More</button></a></p>
            </div>

            <div className="titleSocials">
                <ul className="titleUL">
                    <li><a href="https://www.instagram.com/canadacriminallawyer"><img className="hdr-icon" src={Instagram} alt="Canada Criminal Lawyer Instagram" width="23px" /></a></li>
                    <li><a href="https://www.youtube.com/channel/UCABALDoDJE9Aqj9kSpxMQyg"><img className="hdr-icon" src={YouTube} alt="Canada Criminal Lawyer YouTube" width="29px" /></a></li>
                    <li><a href="https://www.linkedin.com/company/42823021"><img src={LinkedIn} className="hdr-icon" alt="Canada Criminal Lawyer LinkedIn" width="25px" /></a></li>
                    <li><p className="titleP">Licensed Criminal Defence Lawyers Across Canada - <a className="widgetPhoneNumber titleLink" href="tel:8555851777">{`(855) 585-1777`}</a></p></li>
                </ul>
            </div>  
        </section>
    );
}

export default TitleBar;