import React, { useState, useContext } from 'react'
import GlobalContext from '../../context/GlobalContext'

export default function WidgetFilter() {
  const {filters, setFilters} = useContext(GlobalContext);

  const updateFiltersAndStorage = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters));
  };

  const handleCourtTypeChange = (event) => {
    const { name, checked } = event.target;
    const court_type = filters.court_type;

    if (checked) {
      updateFiltersAndStorage({...filters, court_type: [...court_type, name]});
    } else {
      updateFiltersAndStorage({...filters, court_type: court_type.filter((court) => court !== name)});
    }
  };

  /*const handleCityChange = (event) => {
    const { name, checked } = event.target;
    const cities = filters.cities;
    if (checked) {
      updateFiltersAndStorage({...filters, cities: [...cities, name]});
    } else {
      updateFiltersAndStorage({...filters, cities: cities.filter((city) => city !== name)});
    }
  };*/
  const handleCityChange = (event) => {
    // grab the values of the target checkbox
    const { name, checked } = event.target;
    // grab the cities object from the filters object
    const cities = { ...filters.cities };

    if (checked) {
      cities[name] = { city: name, hidden: false };
      updateFiltersAndStorage({...filters, cities })
    } else {
      delete cities[name];
      updateFiltersAndStorage({...filters, cities})
    }
  };


  return (
    <div className="widgetWrapper">
        <h2 className="widgetTitle">Filters</h2>
        {/* 
        <label className="widgetLabel">Display Court Types</label>
        <ul>
          <li>
          <input 
            type="checkbox" 
            name="Provincial Court" 
            id="filterProvincialCourt" 
            value="filterProvincialCourt" 
            checked={filters.court_type && filters.court_type.includes('Provincial Court')}
            onChange={handleCourtTypeChange}
          />
            Provincial Court</li>
          <li>
            <input 
            type="checkbox" 
            name="Kings Bench" 
            id="filterKingsBench" 
            value="filterKingsBench" 
            checked={filters.court_type && filters.court_type.includes('Kings Bench')}
            onChange={handleCourtTypeChange}
          />
            Court of King's Bench</li>
          <li>
            <input 
            type="checkbox" 
            name="Appeal Court" 
            id="filterAppealCourt" 
            value="filterAppealCourt"
            checked={filters.court_type && filters.court_type.includes('Appeal Court')}
            onChange={handleCourtTypeChange}
          />
            Appeal Court</li>
        </ul>*/}

        <label className="widgetLabel">Cities</label>
        <ul className="cityList">
          <li>
            <input 
              type="checkbox" 
              name="Estevan" 
              id="Estevan"
              value="Estevan"
              checked={filters.cities && Object.keys(filters.cities).includes("Estevan")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Estevan"><span className="spacer"></span>Estevan</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Kindersley" 
              id="Kindersley"
              value="Kindersley"
              checked={filters.cities && Object.keys(filters.cities).includes("Kindersley")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Kindersley"><span className="spacer"></span>Kindersley</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Melville" 
              id="Melville"
              value="Melville"
              checked={filters.cities && Object.keys(filters.cities).includes("Melville")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Melville"><span className="spacer"></span>Melville</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Moose Jaw" 
              id="Moose Jaw"
              value="Moose Jaw"
              checked={filters.cities && Object.keys(filters.cities).includes("Moose Jaw")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Moose Jaw"><span className="spacer"></span>Moose Jaw</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="North Battlefords" 
              id="North Battlefords"
              value="North Battlefords"
              checked={filters.cities && Object.keys(filters.cities).includes("North Battlefords")}
              onChange={handleCityChange} 
            />
            <label htmlFor="North Battlefords"><span className="spacer"></span>North Battlefords</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Prince Albert" 
              id="Prince Albert"
              value="Prince Albert"
              checked={filters.cities && Object.keys(filters.cities).includes("Prince Albert")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Prince Albert"><span className="spacer"></span>Prince Albert</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Regina" 
              id="Regina" 
              checked={filters.cities && Object.keys(filters.cities).includes("Regina")}
              value="Regina"
              onChange={handleCityChange}
            />
            <label htmlFor="Regina"><span className="spacer"></span>Regina</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Saskatoon" 
              id="Saskatoon"
              value="Saskatoon"
              checked={filters.cities && Object.keys(filters.cities).includes("Saskatoon")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Saskatoon"><span className="spacer"></span>Saskatoon</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Swift Current" 
              id="Swift Current"
              value="Swift Current"
              checked={filters.cities && Object.keys(filters.cities).includes("Swift Current")}
              onChange={handleCityChange} 
            />
            <label htmlFor="Swift Current"><span className="spacer"></span>Swift Current</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Warman" 
              id="Warman"
              value="Warman"
              checked={filters.cities && Object.keys(filters.cities).includes("Warman")}
            onChange={handleCityChange} 
            />
            <label htmlFor="Warman"><span className="spacer"></span>Warman</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Weyburn" 
              id="Weyburn"
              value="Weyburn"
              checked={filters.cities && Object.keys(filters.cities).includes("Weyburn")}
            onChange={handleCityChange} 
            />
            <label htmlFor="Weyburn"><span className="spacer"></span>Weyburn</label>
          </li>
          <li>
            <input 
              type="checkbox" 
              name="Yorkton" 
              id="Yorkton"
              value="Yorkton"
              checked={filters.cities && Object.keys(filters.cities).includes("Yorkton")}
            onChange={handleCityChange} 
            />
            <label htmlFor="Yorkton"><span className="spacer"></span>Yorkton</label>
          </li>
        </ul>
    </div>
  )
}

/* Filters 
(Radio) Only show my court dates (checked by default)
--> When it's checked, you can still view court times on hover
(Checkbox) Select Cities
(Checkbox) Court Types: Provincial Court, Court of King's Bench, Appeal Court





*/