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
  
  let deferredPrompt;
  const [installButton, setInstallButton] = useState(null);
  
  useEffect(() => {
    const button = document.getElementById('install-button');
    setInstallButton(button);
  }, []);

  useEffect(() => {
    if (installButton) {
      installButton.addEventListener('click', async () => {
        // Hide the button
        installButton.hidden = true;
    
        // Show the prompt
        if (deferredPrompt) {
          deferredPrompt.prompt();
    
          // Wait for the user's response
          const { outcome } = await deferredPrompt.userChoice;
          console.log(`User response: ${outcome}`);
    
          // Clear the stored prompt
          deferredPrompt = null;
        }
      });
    }
  }, [installButton]);

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default prompt on older browsers
    e.preventDefault();
    // Store the event so it can be triggered later
    deferredPrompt = e;
    // Show the "Add to Home Screen" button
    if (installButton) {
      installButton.hidden = false;
    }
  });
  
  window.addEventListener('appinstalled', () => {
    console.log('App installed successfully');
  });






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
        <div id="install-container">
          <button type="button" id="install-button" hidden="true">Add to Home Screen</button>
        </div>
      </header>
      <Calendar curMonth={currentMonth}/>
      
      <Footer />
    </div>
  );
}

export default App;
