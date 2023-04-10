import React, { useContext } from 'react';
import './../css/Navbar.css';
import TitleBar from './TitleBar';
//import DesktopNavigation from './DesktopNav';
import MobileNavigation from './MobileNav';
import DesktopNavigation from './DesktopNav';
import Modal from './Modal';
import GlobalContext from '../context/GlobalContext';

// import { Link } from 'react-router-dom';

// Display the logo on the left
// Have two components for the right: mobile & desktop

const NavigationBar = () => {
    const {screenSize} = useContext(GlobalContext);

    return (
      <nav>
        <TitleBar />
        {screenSize === 'large' ? <DesktopNavigation /> : <MobileNavigation />}    
      </nav>
       
    );
}

export default NavigationBar;