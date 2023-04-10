import React, { useContext, useState } from 'react';
import './../css/DesktopNav.css';
import DesktopLogo from './../assets/ccl-logo.png';
import DropdownMenu from './DropdownMenu';
import {faq, penaltiesAndSentencing, blog, criminalOffences, resources } from './Sitemap';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import AccountModal from './AccountModal';
import GlobalContext from '../context/GlobalContext';

const DesktopNavigation = () => {
    const { loggedIn, setStatus, showLogin, setShowLogin, showRegister, setShowRegister, showForgotPassword, setShowForgotPassword, setUserID, setUserCourtDates, setFilters } = useContext(GlobalContext);
    
    const [showAccount, setShowAccount] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    console.log(`loggedIn is equal to ${loggedIn}`);
    return (
        
        <section id="desktopNavContainer" className="page-row">
            <a href="https://canadacriminallawyer.ca">
                <img className="desktop-logo" src={DesktopLogo} alt="Canada Criminal Lawyer Logo" width="150px"/>
            </a>
            
            <div className="menuContainer">
                <ul id="desktopMenu">
                    <li><a className="desktop-nav-link" href="https://canadacriminallawyer.ca/about/"><button className="dropdown-btn">About</button></a></li>
                   
                    <li><DropdownMenu parentText="FAQ" parentLink="https://canadacriminallawyer.ca/faq/" menuLinks={faq} submenu={penaltiesAndSentencing}/></li>
                    <li><DropdownMenu parentText="Blog & Media" parentLink="https://canadacriminallawyer.ca/blog/" menuLinks={blog} subMenu={penaltiesAndSentencing}/></li>
                    <li><DropdownMenu parentText="Criminal Offences" parentLink="https://canadacriminallawyer.ca/criminal-offences/" menuLinks={criminalOffences} /></li>
                    <li><DropdownMenu parentText="Resources" parentLink="https://canadacriminallawyer.ca/legal-resources/" menuLinks={resources} /></li>
                    
                    
                    {(loggedIn == false) ? (
                        <React.Fragment>
                            <li><i class="fa fa-user-plus" aria-hidden="true" onClick={() => setShowRegister(true)}></i></li>
                            <li><i class="fa fa-sign-in" aria-hidden="true" onClick={() => setShowLogin(true)}></i></li>
                        </React.Fragment>
                    ) : (
                        <li>
                            <div 
                                className={`account-dropdown-container`}
                                onMouseEnter={() => setShowAccountMenu(true)}
                                onMouseLeave={() => setShowAccountMenu(false)}
                            >
                                <i className="fa-solid fa-circle-user"></i>
                                <ul className={`account-dropdown-menu ${showAccountMenu && `displayAccountDropdown`}`}>
                                    <li className="accountLink" onClick={() => setShowAccount(true)}>Account Settings</li>
                                    <li className="accountLink" onClick={() => {
                                        localStorage.removeItem("sessionToken");
                                        localStorage.removeItem("filters");
                                        localStorage.removeItem("userCourtDateToken");
                                        setStatus(false)
                                        setUserID({});
                                        setUserCourtDates([]);
                                        setFilters({});
                                        }}>Logout</li>
                                </ul>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
            
            <AccountModal onClose={() => setShowAccount(false)} showAccount={showAccount}/>
            <LoginModal onClose={() => setShowLogin(false)} showLogin={showLogin} />
            <RegisterModal onRegisterClose={() => setShowRegister(false)} showRegister={showRegister} />
            <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} showForgotPassword={showForgotPassword} />
        </section>
    )
}

export default DesktopNavigation;