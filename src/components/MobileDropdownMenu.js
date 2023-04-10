import React, { useState } from "react";
import './../css/MobileDropdown.css';
import Submenu from "./Submenu";

function MobileDropdownMenu(props) {
    // define the state variable menuOpen, the function to update state - setMenuOpen
    // Also set the default value of state (false)

    const [menuOpen, setMenuOpen] = useState(false);
    const { menuLinks } = props;

    // Menu Handler functions
    function handleMouseClick() {
        setMenuOpen(!menuOpen);
    }

    return (
        <div className="mobile-dropdown-container">
            <div className="mobile-parent-container">
                <a className="mobile-parent-link" href={props.parentLink}><button className="mobile-dropdown-btn">{props.parentText}</button></a>
                {/*<i className="fa fa-angle-down mobile-angle-down" onClick={handleMouseClick}></i>*/}
                <i className={!menuOpen ? "fa fa-angle-down mobile-angle-down" : "fas fa-angle-up mobile-angle-up"} onClick={handleMouseClick}></i>
            </div>
            {menuOpen && (
                <ul className="mobile-dropdown-menu">
                    {/* Map Function */}
                    {menuLinks.map((item, index) => (
                        /* Conditionally Render Nested Submenu */
                        item.submenu == false ?
                        <li className="mobile-submenu-li" key={index}>
                            <a className="mobile-submenu-link" href={item.link}>{`> ${item.page}`}</a>
                        </li>
                        :
                        <Submenu submenuLink={item.link} submenuPage={item.page} submenuList={props.submenu}/>
                    ))}
                </ul>
            )}
        </div>
    )
}
//parentText="" parentLink="" menuLinks
export default MobileDropdownMenu;