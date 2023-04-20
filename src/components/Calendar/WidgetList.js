import React, { useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'
import './../../css/FilterWidget.css'

function UserCourtDates({ courtAttendances }) {

  const options = {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  };

  return (
    <React.Fragment>
      {courtAttendances.map((attendance, index) => {
        
        const dateString = attendance.courtSitting_ID.courtDate 
        const dateObj = new Date(dateString)
        const formattedDate = new Intl.DateTimeFormat('en-US', options).format(dateObj);
        
        return (
          <p key={index}>{`${attendance.courtSitting_ID.court_ID.city} ${attendance.timePeriod} ${formattedDate}`}</p>
        )
      })}
    </React.Fragment>
  );
}

export default function WidgetList() {
  const {userCourtDates} = useContext(GlobalContext);

  return (
    <div className="widgetWrapper cntr-overflow">
        {/* Sort functionality to include: Chronological, by City, Court Type*/}
        <h2 className="widgetTitle">Your Court Dates</h2>
        <UserCourtDates courtAttendances={userCourtDates}/>
    </div>
  )
}
