import React, { useState } from 'react'
import SKIcon from '../../assets/skIcon2.png';
import AppealIcon from '../../assets/measure.png';
import CrownIcon from '../../assets/crown.png';
import '../../css/Calendar.css'

export default function CityAttendees({city}) {
    const [cityDropdown, showCity] = useState(true);

    function getCourtIcon(court) {
        return (
            court === "Provincial Court" ? <div className="court-icon-container"><img src={SKIcon} alt="Provincial Court of Saskatchewan Icon" height="25px" /></div> : 
            court === "Kings Bench" ? <div className="court-icon-container"><img src={CrownIcon} alt="Court of King's Bench Saskatchewan Icon" height="5px" /></div> : 
            court === "Appeal Court" ? <div className="court-icon-container"><img src={AppealIcon} alt="Appeal Court Icon" height="25px" /></div> : ""
        );
    }

  return (
    <div className="attendee-wrapper">
        <div className="label-row " onClick={() => showCity(!cityDropdown)}>
            <h3 className="attendee-city-heading">{city.court_ID.city}</h3>
            <div>
                <span className="label-attendees">{city.courtAttendances.length}<i class="fas fa-user-friends"></i></span>
                <span className="label-dropdown"><i className={`${cityDropdown ? `fas fa-angle-up pplUp` : `fas fa-angle-down`}`}></i></span>
            </div>
        </div>{/* End City Heading*/}

        <ul className={`event-menu ${cityDropdown && `showReginaAttendeeMenu`}`}>
            {city.courtAttendances.map((person, key) => (
                <li key={key} className="attendee-row">
                    <div>
                        {`${person.user_ID.first_name} ${person.user_ID.last_name}`}
                    </div>
                    <div>
                        {`${person.timePeriod} `}
                        {person.court_type !== undefined && getCourtIcon(person.court_type)}
                        {` #${person.courtRoom}`}
                    </div>
                </li>
            ))}
        </ul>{/* End Dropdown Menu */}
    </div>
  )
}
