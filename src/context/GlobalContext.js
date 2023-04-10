import React from 'react'

// this object keeps all of our state
const GlobalContext = React.createContext({
    monthIndex: 0,
    setMonthIndex: (index) => {},
    daySelected: null,
    setDaySelected: (day) => {},
    showEventModal: false,
    setShowEventModal: () => {},
    screenSize: '',
    setScreenSize: () => {},
    // Modals
    showLogin: false,
    setShowLogin: () => {},
    showRegister: false,
    setShowRegister: () => {},
    showForgotPassword: false, 
    setShowForgotPassword: () => {},
    dummyVar: false,
    setDummyVar: () => {},
    // 
    loggedIn: false,
    
    setStatus: () => {},
    baseURL: '',
    userID: {},
    setUserID: () => {},
    userCourtDates: [],
    setUserCourtDates: () => {},
    filters: {},
    setFilters: () => {},
    courtDates: {},
    setCourtDates: () => {},
//
activeWidgetComponent: '', 
setWidgetComponent: () => {}

})

export default GlobalContext