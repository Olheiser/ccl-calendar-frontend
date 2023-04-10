import React, { useState, useContext } from 'react'
import GlobalContext from '../context/GlobalContext';
import './../css/DropdownMenu.css'

export default function AccountDropdown() {
    const [showAccount, setShowAccount] = useState(false);
    const {loggedIn, setStatus} = useContext(GlobalContext);
    const [showAccountMenu, setShowAccountMenu] = useState(false);
  
    return (
        <div 
            className={`account-dropdown-container`}
            onMouseEnter={() => setShowAccountMenu(true)}
            onMouseLeave={() => setShowAccountMenu(false)}
        >
            <i className="fa-solid fa-circle-user"></i>
            <ul className={`account-dropdown-menu ${showAccountMenu && `displayAccountDropdown`}`}>
                <li className="accountLink" onClick={() => setShowAccount(true)}>Account Settings</li>
                <li className="accountLink" onClick={() => setStatus(false)}>Logout</li>
            </ul>
        </div>
    )
}
