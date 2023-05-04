import React, { useContext } from 'react'
import dayjs from 'dayjs'
import GlobalContext from '../../context/GlobalContext';
import DayLabel from './DayLabel';
import './../../css/Calendar.css'

export default function Day({ day, isOffMonth }) {
    const {daySelected, setDaySelected, setShowEventModal, filters, courtDates} = useContext(GlobalContext);
    const cityFilters = Object.keys(filters.cities);

    function getCurrentDayClass() {
        // comparing the value of day in this component to the current day using dayjs
        // passing nothing to dayjs() defaults to present day
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") 
            ? 'currentDay' 
            : '';
    }

    function getSelectedDayClass() {
        return day.format("DD-MM-YY") === daySelected.format("DD-MM-YY")
            ? 'indDay'
            : '';
    }

    function getSumOfAttendees() {
        let totalAttendees = 0;

        if (courtDates[day.format("DD-MM-YY")] && Array.isArray(courtDates[day.format("DD-MM-YY")])) {
            for (const sitting of courtDates[day.format("DD-MM-YY")]) {
                for (const city of cityFilters) {
                    if (city == sitting.court_ID.city) totalAttendees += sitting.courtAttendances.length;
                }
            }
        }
        
        return totalAttendees;
    }

    function hasAttendees(citySitting) {
        return citySitting.courtAttendances && citySitting.courtAttendances.length > 0
    }

    function getCityIndex(city, citySittings) {
        const index = citySittings.findIndex((citySitting) => citySitting.court_ID.city === city);
        return index;
      }

  return (
    
    <div onClick={() => {
        // the value of day is correct
        setDaySelected(day);
        setShowEventModal(true);
    }} 
        className={`dayWrapper border border-gray-200 flex flex-col ${getSelectedDayClass()}`}>
    {/* This is an instance of dayjs, so we can use the format method for that day */}
        <div className="flex flex-col">
            <p className={`calDD ${getCurrentDayClass()} ${isOffMonth && `dayOffMonth`}`}>
                {day.format('DD')}
            </p>
        </div>

        <div className="flex-1 cursor-pointer label-container">
            {/* I want to create a label for each city, under specific conditions. */}
            {courtDates && courtDates[day.format("DD-MM-YY")] && cityFilters.map((city) => {
                const courtAppearances = courtDates[day.format("DD-MM-YY")];
                const cityIndex = getCityIndex(city, courtAppearances);
                const courtAppearance = courtAppearances[cityIndex];
                
                // check to see if the city has attendees. To do this I need to loop over courtDates[DD-MM-YY]
                if (courtAppearance && hasAttendees(courtAppearance)) {
                    return <DayLabel courtAppearance={courtAppearance} city={city} />;
                } else {
                    return null;
                }
            })}
        </div>

        {/* Where I display the sum of all attendees */}
        {/* onClick should open the attendee modal */}
        {getSumOfAttendees() !== 0 &&
            <div className="sum-attendees-container">
                <span className="sum-attendees-count">{getSumOfAttendees()}<i class="fas fa-user-friends sum-attendees-icon"></i></span>
            </div>
        }
    </div>
  )
}

/* Triggering multiple functions from one click event
onClick={() => {
    setSmallCalendarMonth(currentMonthIdx);
    setDaySelected(day);
}}

<div onClick={setDaySelected(day)} className={`border border-gray-200 flex flex-col ${getSelectedDayClass()}`}>

bg-blue-600 text-white rounded-full w-7 
*/