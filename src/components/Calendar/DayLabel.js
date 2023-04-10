import React, { useState, useContext } from 'react';
import '../../css/DayLabel.css';
import GlobalContext from '../../context/GlobalContext';
import { eventWrapper } from '@testing-library/user-event/dist/utils';

/* Data Required:
    -- City
    -- AM vs PM
    -- # of people in court that day
    -- Array of people to list

    Apply background color to Regina
*/

export default function DayLabel({courtAppearance}) {
    const [labelOpen, setLabelOpen] = useState(false);
    const {screenSize} = useContext(GlobalContext);
    
    function handleClick(event) {
        event.stopPropagation();
        setLabelOpen(!labelOpen);
    }

    return (
    <div className="label-wrapper">
        <div className="label-row regina" onClick={screenSize == 'small' ? () => setLabelOpen(!labelOpen) : handleClick}>
            <div ><p>{courtAppearance.courtSitting_ID.court_ID.city}, {courtAppearance.timePeriod}</p></div>
            <div>
                <span className="label-attendees">{courtAppearance.courtSitting_ID.courtAttendances.length}<i class="fas fa-user-friends"></i></span>
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
                courtAppearance.courtSitting_ID.courtAttendances.map((appearance, i) => (
                    <li key={i}>{appearance.user_ID.first_name} {appearance.user_ID.last_name}, {appearance.timePeriod}</li>
                ))
            }
            </ul>
        )}

        
    </div>
  )
}
