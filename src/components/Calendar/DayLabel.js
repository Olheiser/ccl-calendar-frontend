import React, { useState, useContext } from 'react';
import '../../css/DayLabel.css';
import GlobalContext from '../../context/GlobalContext';
import { eventWrapper } from '@testing-library/user-event/dist/utils';
import SKIcon from '../../assets/skIcon2.png';
import AppealIcon from '../../assets/measure.png';
import CrownIcon from '../../assets/crown.png';

/* Data Required:
    -- City
    -- AM vs PM
    -- # of people in court that day
    -- Array of people to list

    Apply background color to Regina
*/

export default function DayLabel({courtAppearance, city}) {
    const [labelOpen, setLabelOpen] = useState(false);
    const {screenSize, filters, userID} = useContext(GlobalContext);
    
    function handleClick(event) {
        event.stopPropagation();
        setLabelOpen(!labelOpen);
    }

    function isUserInCourt() {
        for (const attendance of courtAppearance.courtAttendances) {
            if (attendance.user_ID._id === userID._id) return true
        }

        return false
    }

    function getUserAttendanceInfo() {
        for (const attendance of courtAppearance.courtAttendances) {
            //console.log(`Attendance: ${JSON.stringify(attendance, null, 2)}`)
            if (attendance.user_ID._id === userID._id) return attendance
        }

        return false
    }

    function getCourtIcon(court) {
        return (
            court === "Provincial Court" ? <div className="court-icon-container"><img src={SKIcon} alt="Provincial Court of Saskatchewan Icon" height="25px" /></div> : 
            court === "Kings Bench" ? <div className="court-icon-container"><img src={CrownIcon} alt="Court of King's Bench Saskatchewan Icon" height="5px" /></div> : 
            court === "Appeal Court" ? <div className="court-icon-container"><img src={AppealIcon} alt="Appeal Court Icon" height="25px" /></div> : ""
        );
    }

    return (
    <div className={`label-wrapper ${filters.cities[city].hidden && `hide-city-label`}`}>
        <div className="label-row regina" onClick={screenSize == 'small' ? () => setLabelOpen(!labelOpen) : handleClick}>
        <div>
            <p>
                {courtAppearance.court_ID.city}
                {isUserInCourt() && `, ${getUserAttendanceInfo().timePeriod}`}
                {getUserAttendanceInfo()?.court_type !== undefined && getCourtIcon(getUserAttendanceInfo()?.court_type)}
                {getUserAttendanceInfo()?.courtRoom && `#${getUserAttendanceInfo()?.courtRoom}`}
            </p>
        </div>
            <div>
                <span className="label-attendees">{courtAppearance.courtAttendances.length}<i class="fas fa-user-friends"></i></span>
                {screenSize !== 'small' && (
                    <span className="label-dropdown">
                        <i className={`${labelOpen ? `fas fa-angle-up pplUp` : `fas fa-angle-down`}`}></i>
                    </span>
                )}
                
            </div>
        </div>

        {screenSize !== 'small' && (
            <ul className={`label-menu ${labelOpen && `showLabelMenu`}`}>
            {
                courtAppearance?.courtAttendances.map((appearance, i) => (
                    
                    <li key={i}>{appearance?.user_ID?.first_name} {appearance?.user_ID?.last_name}, {appearance?.timePeriod} {getCourtIcon(appearance?.court_type)} {appearance?.courtRoom && `#${appearance?.courtRoom}`}</li>
                ))
            }
            </ul>
        )}

        
    </div>
  )
}
