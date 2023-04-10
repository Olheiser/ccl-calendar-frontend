import React, { useContext, useState } from "react";
import './../css/MobileNav.css';
import LogoMobile from './../assets/ccl-logo-mobilel.png'
import MobileDropdownMenu from "./MobileDropdownMenu";
import {faq, penaltiesAndSentencing, blog, criminalOffences, resources } from './Sitemap';
import GlobalContext from "../context/GlobalContext";
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import AccountModal from './AccountModal';

const MobileNavigation = () => {
    const { loggedIn, setStatus, showLogin, setShowLogin, showRegister, setShowRegister, showForgotPassword, setShowForgotPassword, setUserID, setUserCourtDates, setFilters } = useContext(GlobalContext);

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const [showAccount, setShowAccount] = useState(false);
    const [showAccountMenu, setShowAccountMenu] = useState(false);

    return (
        <div className="mobile-nav-container page-row">
            <a className="mobile-logo" href="https://canadacriminallawyer.ca">
                <img src={LogoMobile} className="mobile-nav-logo" alt="Canada Criminal Lawyer Mobile Logo" />
            </a>

            <div className={click ? "mobileContainer activeMobileContainer" : "mobileContainer"}> 
                <ul className={click ? "mobile-nav-menu activeMenu" : "mobile-nav-menu"}>
                    {/*<li className="navItem"><a className="nav-links" onClick={handleClick} href="https://canadacriminallawyer.ca">About</a></li>*/}
                    
                    <div className="mobile-dropdown-container" id="mobile-about">
                        <div className="mobile-parent-container">
                            <a className="mobile-parent-link" href="https://canadacriminallawyer.ca/about/"><button className="mobile-dropdown-btn">About</button></a>
                            <i className="fa fa-angle-down mobile-angle-down hidden-arrow"></i>
                        </div>
                    </div>

                    <li className="navItem"><MobileDropdownMenu parentText="FAQ" parentLink="https://canadacriminallawyer.ca/faq/" menuLinks={faq} submenu={penaltiesAndSentencing}/></li>
                    <li className="navItem"><MobileDropdownMenu parentText="Blog" parentLink="https://canadacriminallawyer.ca/blog" menuLinks={blog} /></li>
                    <li className="navItem"><MobileDropdownMenu parentText="Criminal Offences" parentLink="https://canadacriminallawyer.ca/criminal-offences" menuLinks={criminalOffences} /></li>
                    <li className="navItem"><MobileDropdownMenu parentText="Resources" parentLink="https://canadacriminallawyer.ca/resources" menuLinks={resources} /></li>
                </ul>
            </div>
            
            <div className="mobile-nav-icon mobile-nav-icon-row">
                <i className={click ? "fas fa-times" : "fas fa-bars"} onClick={handleClick}></i>
                {/* Conditionally Render Status */}
                {(loggedIn == false) ? (
                    <React.Fragment>
                        <i class="fa fa-user-plus" aria-hidden="true" onClick={() => setShowRegister(true)}></i>
                        <i class="fa fa-sign-in" aria-hidden="true" onClick={() => setShowLogin(true)}></i>
                    </React.Fragment>
                ) : (
                <div>
                    <div onClick={e => e.stopPropagation()}>
                        <i className="fa-solid fa-circle-user" onClick={() => setShowAccountMenu(true)}></i>
                        <ul className={`account-dropdown-menu ${showAccountMenu && `displayAccountDropdown`}`}>
                            <li id="closeAccountFirstItem">
                                <i className="fas fa-times closeAccountMenu" onClick={() => setShowAccountMenu(false)}></i>
                            </li>
                            <li className="accountLink" id="mobileAccountSettingsLink" onClick={() => setShowAccount(true)}>
                                Account Settings
                            </li>
                            <li className="accountLink" onClick={() => {
                                localStorage.removeItem("sessionToken");
                                localStorage.removeItem("filters");
                                localStorage.removeItem("userCourtDateToken");
                                setStatus(false);
                                setUserID({});
                                setUserCourtDates([]);
                                setFilters({});
                            }}>
                                Logout</li>
                        </ul>
                    </div>
                </div>
            )}
            </div>
            <AccountModal onClose={() => setShowAccount(false)} showAccount={showAccount}/>
            <LoginModal onClose={() => setShowLogin(false)} showLogin={showLogin} />
            <RegisterModal onRegisterClose={() => setShowRegister(false)} showRegister={showRegister} />
            <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} showForgotPassword={showForgotPassword} />
        </div>
    )
}

export default MobileNavigation