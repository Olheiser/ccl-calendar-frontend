import React, { useState, useEffect } from 'react'
import GlobalContext from './GlobalContext'
import dayjs from 'dayjs'

/* This component wraps our entire application, we provide the context to the wrapper so 
all the children can access the context. */
export default function ContextWrapper(props) {
    
    const [monthIndex, setMonthIndex] = useState(dayjs().month()) 
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [screenSize, setScreenSize] = useState('');
    const [loggedIn, setStatus] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [dummyVar, setDummyVar] = useState(false);
    const [baseURL, setBaseURL] = useState('http://localhost:8000/'); //http://localhost:8000/ // https://api.canadacriminallawyer.ca/ // https://ccl-calendar-backend.onrender.com/
    const [userID, setUserID] = useState({});
    const [userCourtDates, setUserCourtDates] = useState([]);
    const [courtDates, setCourtDates] = useState([]);
    const [activeWidgetComponent, setWidgetComponent] = useState("addEvent");

    const localStorageFilters = JSON.parse(localStorage.getItem("filters"));
    
    // If there are no filters or the cities property is not an array, set default filters
    const defaultFilters = {
      court_type: ["Provincial Court", "Kings Bench"],
      cities: {
        Regina: {
          city: "Regina",
          hidden: false
        },
        Saskatoon: {
          city: "Saskatoon",
          hidden: false
        },
        Weyburn: {
          city: "Weyburn",
          hidden: false
        }
      }
    };

    const initialFilters = localStorageFilters && typeof localStorageFilters.cities === "object"
      ? localStorageFilters
      : defaultFilters;

    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            
            if (width >= 1250) {
              setScreenSize('large');
            } else if (width >= 900) {
              setScreenSize('medium');
            } else {
              setScreenSize('small');
            }
          };

          handleResize();
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
      const token = localStorage.getItem("sessionToken");
      const userCourtDateToken = localStorage.getItem("userCourtDateToken");
      const userFilters = localStorage.getItem("filters");
      const courtDatesToken = localStorage.getItem("courtDates");

      if (courtDatesToken) {
        setCourtDates(JSON.parse(courtDatesToken))
      }

      if (token) {
        setStatus(true);
        setUserID(JSON.parse(token));

        if (userCourtDateToken) {
          setUserCourtDates(JSON.parse(userCourtDateToken));
        }

        if (userFilters) {
          setFilters(JSON.parse(userFilters));
        }

        

      } else {
        setStatus(false);
      }
    }, []);

  return (
    <GlobalContext.Provider 
        value={{
            monthIndex, 
            setMonthIndex,
            daySelected,
            setDaySelected,
            showEventModal,
            setShowEventModal,
            screenSize,
            setScreenSize,
            loggedIn,
            setStatus,
            showLogin,
            setShowLogin,
            showRegister,
            setShowRegister,
            showForgotPassword, 
            setShowForgotPassword,
            dummyVar,
            setDummyVar,
            baseURL,
            userID,
            setUserID,
            userCourtDates,
            setUserCourtDates,
            filters,
            setFilters,
            courtDates,
            setCourtDates,
            activeWidgetComponent, 
            setWidgetComponent
        }}>
        {props.children}
    </GlobalContext.Provider>
  )
}