import React, { useState } from 'react'
import '../../css/Calendar.css'

export default function CityAttendees({city}) {
    const [cityDropdown, showCity] = useState(true);
  return (
    <div className="attendee-wrapper">
        <div className="label-row " onClick={() => showCity(!cityDropdown)}>
            <h3>{city.court_ID.city}</h3>
            <div>
                <span className="label-attendees">{city.courtAttendances.length}<i class="fas fa-user-friends"></i></span>
                <span className="label-dropdown"><i className={`${cityDropdown ? `fas fa-angle-up pplUp` : `fas fa-angle-down`}`}></i></span>
            </div>
        </div>{/* End City Heading*/}

        <ul className={`event-menu ${cityDropdown && `showReginaAttendeeMenu`}`}>
            {city.courtAttendances.map((person, key) => (
                <li key={key}>{`${person.user_ID.first_name} ${person.user_ID.last_name}, ${person.timePeriod}`}</li>
            ))}
        </ul>{/* End Dropdown Menu */}
    </div>
  )
}
