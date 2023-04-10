import React, { useContext } from 'react';
import GlobalContext from '../../context/GlobalContext';
import './../../css/Calendar.css';
import dayjs from 'dayjs';
import CreateEventButton from './CreateEventButton';


const CalendarHeader = () => {
    const { monthIndex, setMonthIndex } = useContext(GlobalContext);

    function handlePrevMonth() {
        setMonthIndex(monthIndex - 1)
    }

    function handleNextMonth() {
        setMonthIndex(monthIndex + 1)
    }

    function handleReset() {
        setMonthIndex(dayjs().month())
    }
    return (
        <React.Fragment >
            <div className="px-4 py-2 flex items-center calendarHdr">
                <button onClick={handleReset} className="border rounded py-2 px-4 mr-5 todayButton">
                    Today
                </button>
                <h2 className="ml-4 text-xl text-gray-500 font-bold monthTitle">
                    {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
                </h2>
                <div className="calNavContainer">
                    <button onClick={handlePrevMonth} className="calNavBtn calPrevBtn">
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 calNavTxt">
                            chevron_left
                        </span>
                    </button>
                    <button onClick={handleNextMonth} className="calNavBtn calNextBtn">
                        <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2 calNavTxt">
                            chevron_right
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-5 grid-rows-1 dayCol">
                <p>Monday</p>
                <p>Tuesday</p>
                <p>Wednesday</p>
                <p>Thursday</p>
                <p>Friday</p>
            </div>
        </React.Fragment>
    )
}

export default CalendarHeader;