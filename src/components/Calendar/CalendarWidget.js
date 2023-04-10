import React, { useContext, useState } from 'react'
import './../../css/FilterWidget.css'
import WidgetFilter from './WidgetFilter';
import WidgetList from './WidgetList';
import WidgetSubmitDate from './WidgetSubmitDate';
import Month from './Month';
import GlobalContext from '../../context/GlobalContext';

export default function CalendarWidget({month}) {
    const {screenSize} = useContext(GlobalContext)
    const [activeWidgetComponent, setWidgetComponent] = useState('addEvent');
    let componentToDisplay;

    switch(activeWidgetComponent) {
        case "calendar":
            componentToDisplay = <Month month={month}/>;
            break;
        case "addEvent":
            componentToDisplay = <WidgetSubmitDate />;
            break;
        case "list":
            componentToDisplay = <WidgetList />;
            break;
        case "filter":
            componentToDisplay = <WidgetFilter />;
            break;
        default:
            componentToDisplay = <WidgetSubmitDate />;
            break;
    }

  return (
    <div className="widgetContainer">
        <div className="widgetHeader">
            <button onClick={() => setWidgetComponent("calendar")} className={`widgetButton ${activeWidgetComponent == 'calendar' ? 'activeWidgetBtn' : ''}`}><span className="material-symbols-outlined widgetIcon">calendar_month</span></button>
            <button onClick={() => setWidgetComponent("addEvent")} className={`widgetButton ${activeWidgetComponent == 'addEvent' ? 'activeWidgetBtn' : ''}`}><span className="material-symbols-outlined widgetIcon">add_circle</span></button>
            <button onClick={() => setWidgetComponent("list")} className={`widgetButton ${activeWidgetComponent == 'list' ? 'activeWidgetBtn' : ''}`}><span className="widgetIcon listIcon"><i class="fa fa-list" aria-hidden="true"></i></span></button>
            <button onClick={() => setWidgetComponent("filter")} className={`widgetButton ${activeWidgetComponent == 'filter' ? 'activeWidgetBtn' : ''}`}><span className="material-symbols-outlined widgetIcon">filter_alt</span></button>
        </div>
        <div className="widgetBody">
            {componentToDisplay}
        </div>
        {screenSize !== 'small' && (
            <div className="widgetFooter">
                <h3><span>Cities Displayed</span><span onClick={() => setWidgetComponent("filter")} className="material-symbols-outlined addCity">add_box</span></h3>
                {/* Icons: Remove, Hide/View */}
                <p>Regina</p>
                <p>Saskatoon</p>
            </div>
        )}
        
    </div>
  )
}

{/*<span className="material-symbols-outlined widgetIcon">list</span>*/}