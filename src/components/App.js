import React, { useState, useContext, useEffect } from 'react';
import NavigationBar from './Navbar'; // import react component
import MobileNavigation from './MobileNav';
import Footer from './Footer';
import Calendar from './Calendar/Calendar';
import { getMonth } from './../util';
import GlobalContext from '../context/GlobalContext';
import EventModal from './Calendar/EventModal';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext)

  // This is the state we want to react to
  // Reading the context here
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex])

  //console.table(getMonth());
  return (
    <div className="App">
      {showEventModal && <EventModal />}
      
      <header className="App-header">
        <NavigationBar />
      </header>
      <Calendar curMonth={currentMonth}/>
      
      <Footer />
    </div>
  );
}

export default App;
