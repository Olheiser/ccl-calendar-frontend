import React, { useContext, useState } from "react";
import './../css/Submenu.css';
import GlobalContext from "../context/GlobalContext";

function Submenu(props) {
    const [submenuOpen, setSubmanuOpen] = useState(false);
    const {screenSize} = useContext(GlobalContext);

    // Menu Handler functions
    function handleMouseClick() {
        setSubmanuOpen(!submenuOpen);
    }

    //console.log(props);

    return (
        <React.Fragment>
            {screenSize !== 'large' ? (
                <div className="mobile-submenu-parent-container" onClick={handleMouseClick}> {/* Render link that has a submenu */}
            
                    <li className="mobile-submenu-parent-item">
                        <a className="mobile-submenu-link nested-submenu-link mobile-submenu-parent-link" href={props.submenuPage}>{`> ${props.submenuPage}`}</a>
                        <i className={!submenuOpen ? "fa fa-angle-down mobile-angle-down" : "fas fa-angle-up mobile-angle-up"} onClick={handleMouseClick}></i>
                    </li>
                    {/* Code to render the nested submenu*/}
                    {/* Display the submenu if the link is hovered and the list is contained in props*/}
                    {submenuOpen && props.submenuList && (
                        <div id="nested-submenu-container">
                            <ul className="nested-dropdown-menu">
                                {props.submenuList.map((subItem, subIndex) => (
                                    <li key={subIndex}><a className="nested-submenu-link nested-link" id="melink" href={subItem.link}>{`> ${subItem.page}`}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <div className="dropdown-container" onMouseEnter={() => setSubmanuOpen(true)} onMouseLeave={() => setSubmanuOpen(false)}> {/* Render link that has a submenu */}
            
                    <div className="desktop-submenu-wrapper" >
                        <a className={`desktop-submenu-link ${submenuOpen && `activeSubmenuLink`}`} href={props.submenuPage}>{props.submenuPage}</a>
                        <i className={`fas fa-angle-right desktop-rightArrow ${submenuOpen && `activeRightArrow`}`}></i>
                    </div>
                    {/* Code to render the nested submenu*/}
                    {/* Display the submenu if the link is hovered and the list is contained in props*/}
                    {submenuOpen && props.submenuList && (
                        <div id="nested-desktop-submenu-container">
                            <ul className="nested-desktop-dropdown-menu">
                                {props.submenuList.map((subItem, subIndex) => (
                                    <li key={subIndex}><a className="nested-desktop-submenu-link nested-link" href={subItem.link}>{subItem.page}</a></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            
        </React.Fragment>
        
    )
}

export default Submenu;

/* 
- Within <Submenu /> make sure .submenu-link is applied to penalties and sentencing

- Penalties & Sentencing needs a smaller font.
- It shouldn't be indented
- the down arrow should face right
- The submenu should open towards the right
*/