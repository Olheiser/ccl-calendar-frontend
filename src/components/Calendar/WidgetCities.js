import React, {useState, useContext} from 'react'
import '../../css/FilterWidget.css'
import GlobalContext from '../../context/GlobalContext'


export default function WidgetCities({addCityClick}) {
    const {filters, setFilters} = useContext(GlobalContext)
    

    function hideCity(event, city) {
        event.stopPropagation();
        const updatedFilters = {
          ...filters,
          cities: {
            ...filters.cities,
            [city]: {
              city: city,
              hidden: true,
            },
          },
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters))
        setFilters(updatedFilters);
      }

      function showCity(event, city) {
        event.stopPropagation();
        const updatedFilters = {
          ...filters,
          cities: {
            ...filters.cities,
            [city]: {
              city: city,
              hidden: false,
            },
          },
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters));
        setFilters(updatedFilters);
      }

    function removeCity(event, city) {
        event.stopPropagation();
        const updatedFilters = {
          ...filters,
          cities: Object.fromEntries(
            Object.entries(filters.cities)
              .filter(([key, value]) => key !== city)
          ),
        };
        localStorage.setItem("filters", JSON.stringify(updatedFilters))
        setFilters(updatedFilters);
      }

    // create desired filters object
    // pass that object into setFilters

    
  return (
    <div className="widgetFooter">
        <h3><span>Cities Displayed</span><span onClick={() => addCityClick("filter")} className="material-symbols-outlined addCity">add_box</span></h3>
        {/* Loop over my filters.cities object to render City components */}
        {/* Object.keys(filters.cities).map(city => <City key={city} city={city}/>) */}
        <div className="grid-container">
        {Object.keys(filters.cities).map(city => (
            <div key={city} className='city-flex-row'>
                <p className='city-label'>{city}</p>
                <div className='icon-container'>
                    {/* Conditionally display an eye open and eye closed icon for hidden*/}
                    <i className="fa-solid fa-eye cityIcon" onClick={(event) => hideCity(event, city)}></i>
                    <i className="fa-solid fa-eye-low-vision cityIcon" onClick={(event) => showCity(event, city)}></i>
                    <i className="fa fa-trash cityIcon" aria-hidden="true" onClick={(event) => removeCity(event, city)}></i>
                </div>
        </div>
        ))}
        </div>
    </div>
  )
}
