import React, { useContext, useState } from 'react'
import './../../css/Calendar.css'
import Month from './Month'
import CalendarHeader from './CalendarHeader'
import { getMonth } from './../../util'
import CalendarWidget from './CalendarWidget'
import GlobalContext from '../../context/GlobalContext'

export default function Calendar({curMonth}) {
    //const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {screenSize} = useContext(GlobalContext);
    console.log(screenSize);
    return (
        (screenSize === 'small') ? (
            <div className="mobileFilterWidgetContainer">
                <CalendarWidget month={curMonth} />
            </div>
        ) : (
            <div className='page-row calendar-row'>
                <div className="calendarContainer">
                    <CalendarHeader />
                    <Month month={curMonth} />
                </div>
                <div className="filterWidgetContainer">
                    <CalendarWidget /> 
                </div>
            </div>
        )
    )
}