import React, { useState, useContext, useEffect } from 'react'
import GlobalContext from '../../context/GlobalContext';
import dayjs from 'dayjs';
import CityAttendees from './CityAttendees';
import "../../css/Calendar.css"

export default function Attendees() {
    const {filters, daySelected, userID, courtDates} = useContext(GlobalContext)
    const selectedDaySittings = courtDates[dayjs(daySelected).format("DD-MM-YY")];
    const [hasCityAttendees, setHasCityAttendees] = useState(false);
    let filteredCourtSittings = [];

    if (selectedDaySittings) {
        filteredCourtSittings = selectedDaySittings.filter(appearance => filters.cities.includes(appearance.court_ID.city));
        console.log(`Filtered Sittings: ${JSON.stringify(filteredCourtSittings)}`);
    }

    return (
        <div id="attendeeBody">
            {filteredCourtSittings.map((sitting, key) => {
                if (sitting.courtAttendances.length > 0) {
                    if (!hasCityAttendees) {
                        setHasCityAttendees(true);
                    }
                    
                    return <CityAttendees city={sitting} key={key}/> 
                } else {
                    return null;
                }
                 
            })}

            {!hasCityAttendees && (
                <p className="noAttendees">There are no attendees listed in your chosen cities on {dayjs(daySelected).format("dddd, MMMM D, YYYY")}.</p>
            ) }
        </div>
    )
}
