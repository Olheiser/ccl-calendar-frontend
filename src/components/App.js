import React, { useState, useContext, useEffect } from 'react';
import NavigationBar from './Navbar'; // import react component
import MobileNavigation from './MobileNav';
import Footer from './Footer';
import Calendar from './Calendar/Calendar';
import { getMonth } from './../util';
import GlobalContext from '../context/GlobalContext';
import EventModal from './Calendar/EventModal';
import dayjs from 'dayjs';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal, baseURL, setCourtDates } = useContext(GlobalContext)

  // This is the state we want to react to
  // Reading the context here
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex])

  useEffect(() => {
    getCourtSittings();
  }, [])

  function getCourtSittings() {
    fetch(`${baseURL}courtSittings/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                console.error("Error data: ", data);
                throw new Error("Network response was not ok");
            }
            return data;
        });
    })
    .then(data => {
        console.log("Data fetched: ", data);
        setCourtDates(groupByCourtDate(data));
        localStorage.setItem("courtDates", JSON.stringify(groupByCourtDate(data)));
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
    });
}

  function groupByCourtDate(courtSittings) {
      const grouped = {};
    
      courtSittings.forEach(sitting => {
        const date = dayjs(sitting.courtDate).format("DD-MM-YY");
        const key = date;
    
        if (!grouped[key]) {
          grouped[key] = [];
        }
    
        grouped[key].push(sitting);
      });
    
      return grouped;
  }

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
