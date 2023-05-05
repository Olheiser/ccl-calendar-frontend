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
  const { monthIndex, showEventModal, baseURL, setCourtDates, userID } = useContext(GlobalContext)

  // This is the state we want to react to
  // Reading the context here
  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex])

  useEffect(() => {
    getCourtSittings();
  }, [])

  // Add the useEffect hook for requesting push notification permission
  useEffect(() => {
    // Request user permission for push notifications
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // Subscribe to push notifications
        navigator.serviceWorker.ready.then((registration) => {
          const vapidPublicKey = "BNHrFmrPekpQ41LpNo7guRKSxTbfa9go30u1kwNchFLug1LTWckYfdxRz80XG-wmxluFvnkXGDsBtPyCocgtUH4";
          const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
          registration.pushManager
            .subscribe({
              userVisibleOnly: true,
              applicationServerKey: convertedVapidKey,
            })
            .then((subscription) => {
              // Send the subscription object to your server to save it
              // for the user
              fetch(`${baseURL}${userID}/push-subscription`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(subscription),
              });
            });
        });
      }
    });
  }, []); // Empty dependency array ensures this runs only once, when the component mounts


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

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default App;
