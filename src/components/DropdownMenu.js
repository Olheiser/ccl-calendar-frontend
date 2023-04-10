import React, { useState } from "react";
import './../css/DropdownMenu.css';
import Submenu from "./Submenu";

function DropdownMenu(props) {
    // define the state variable menuOpen, the function to update state - setMenuOpen
    // Also set the default value of state (false)

    const [menuOpen, setMenuOpen] = useState(false);
    const { menuLinks } = props;

    // Menu Handler functions
    function handleMouseEnter() {
        setMenuOpen(true); // pass in the value that state should be set to
    }

    function handleMouseLeave() {
        setMenuOpen(false);
    }
    
    return (
        <div
            className="dropdown-container"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <a href={props.parentLink}><button className="dropdown-btn">{props.parentText}<i className="fa fa-angle-down"></i></button></a>
            {menuOpen && (
                <ul className="dropdown-menu">
                    {/* Map Function */}
                    {menuLinks.map((item, index) => (
                        /* Conditionally Render Nested Submenu */
                        item.submenu == false ?
                        <li key={index}><a className="submenu-link" href={item.link}>{item.page}</a></li>
                        :
                        <Submenu submenuLink={item.link} submenuPage={item.page} submenuList={props.submenu}/>
                        
                    ))}
                </ul>
            )}
        </div>
    )
}
//parentText="" parentLink="" menuLinks
export default DropdownMenu;