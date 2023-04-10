import React, { useContext } from 'react'
import './../../css/Calendar.css'
import Day from './Day'
import GlobalContext from '../../context/GlobalContext'
import CalendarHeader from './CalendarHeader'

export default function Month({month}) {
  const {screenSize} = useContext(GlobalContext);

  function determineOffMonth(day, index) {
    if ((index == 0 && day.date() > 10) || (index == 4 && day.date() < 10)) return true 
    else return false
}

  return (
    <React.Fragment>
    {screenSize === 'small' &&
        <CalendarHeader />
    }
    <div className="flex-1 grid grid-cols-5 grid-rows-5 monthContainer">{/* className="flex-1 grid grid-cols-7 grid-rows-5" */}
        {/* Mapping an array, map through the month where each item of the first dimension is a row that represents the week.
        Reading the row and the index of that row. */}
        {month.map((row, i) => (
            <React.Fragment key={i}>
                {/* Mapping through the row, which has every day of the week */}
                {row.map((day, idx) => (
                    (idx !== 0 && idx !== 6) ? <Day day={day} key={idx} rowIdx={i} isOffMonth={determineOffMonth(day, i)}/> : null
                
                ))}
            </React.Fragment>
        ))}
    </div>
    </React.Fragment>
  )
}
