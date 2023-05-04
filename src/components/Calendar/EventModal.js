import React, { useContext, useState, useMemo, useCallback } from 'react'
import GlobalContext from '../../context/GlobalContext'
import AddCourtTime from './AddCourtTime'
import Attendees from './Attendees'
import './../../css/Calendar.css'

const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

export default function EventModal() {
    const {setShowEventModal, daySelected} = useContext(GlobalContext);
    const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);
    const [displayedComponent, setDisplayedComponent] = useState("attendees");
        
  return (
    <div onClick={() => setShowEventModal(false)} className={`h-screen w-full fixed left-0 top-0 flex justify-center items-center event-modal-overlay`}>{/* Overlay */}
        <div onClick={e => e.stopPropagation()} className="bg-white rounded-lg shadow-2xl event-w modal-container">
            <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
                <h3 className="attendee-date-heading">{daySelected.format("dddd, MMMM DD")}</h3>
                <button onClick={() => setShowEventModal(false)}>
                    <span className="material-icons-outlined eventModalClose">
                        close
                    </span>
                </button>
            </header>

            <div className="event-toggle-container">
                <button type="button" 
                    onClick={() => setDisplayedComponent("attendees")} 
                    className={`attendees-btn ${displayedComponent == "attendees" && `active-event-modal-btn`}`}
                >Attendees</button>
                <button type="button" 
                    onClick={() => setDisplayedComponent("addcourttime")} 
                    className={`addCourtTime-btn ${displayedComponent === "addcourttime" && `active-event-modal-btn`}`}
                >Add Court Time</button>
            </div>

            <div className="event-modal-body">
                {displayedComponent == "attendees" ? <Attendees /> : <AddCourtTime />} 
            </div>
        </div>
    </div>
  )
}