import React, { useState, useContext, useEffect } from 'react'
import dayjs from 'dayjs';
import './../../css/FilterWidget.css'
import { saskatchewan, skProvincialCourtOffices } from '../../util/cities';
import GlobalContext from '../../context/GlobalContext';

export default function WidgetSubmitDate() {
  const [errorMessage, showErrorMessage] = useState(false);
  const [successMessage, showSuccessMessage] = useState(false);
  const {baseURL, userID, courtDates, userCourtDates, setUserCourtDates, setCourtDates} = useContext(GlobalContext);
  const [selectedCity, setSelectedCity] = useState("");

  const [formData, setFormData] = useState({
    province: "",
    city: "",
    circuitPoint: "",
    date: "",
    court_type: "",
    timePeriod: "",
    time: "",
    courtRoom: 0,
    prosecutor: "",
    description: ""
  });

  useEffect(() => {
    if (formData.city !== "" && formData.circuitPoint === "") {
      setSelectedCity(formData.city);
    } else if (formData.city !== "" && formData.circuitPoint !== "") {
      setSelectedCity(formData.circuitPoint);
    } else {
      setSelectedCity("");
    }
  }, [formData]);

  const handleChange = (event) => {
    showErrorMessage(false);
    showSuccessMessage(false);
    
    if (event.target.name == "city") {
      setFormData({...formData, [event.target.name]: event.target.value, circuitPoint: ""})
    } else {
      setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    console.log(`formData: ${JSON.stringify(formData, null, 2)}`)
}

  function getUserCourtAttendance(userID) {
    fetch(`${baseURL}courtAttendance/user/${userID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    console.error("Error data:", data);
                    throw new Error("Network response was not ok");
                }
                return data;
            });
        })
        .then(data => {
            console.log("Data fetched:", data);
            setUserCourtDates(data);
            localStorage.setItem("userCourtDateToken", JSON.stringify(data));
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
}

function getCourtSittings() {
    fetch(`${baseURL}courtSittings/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        return response.json().then(data => {
            if (!response.ok) {
                console.error("Error data: ", data);
                throw new Error("Network response was not ok");
            }
            return data;
        });
    })
    .then(data => {
        console.log("Data fetched: ", data);
        setCourtDates(groupByCourtDate(data));
        localStorage.setItem("courtDates", JSON.stringify(groupByCourtDate(data)));
    })
    .catch(error => {
        console.error("Error fetching data: ", error);
    });
}

function groupByCourtDate(courtSittings) {
    const grouped = {};
  
    courtSittings.forEach(sitting => {
      const date = dayjs(sitting.courtDate).format("DD-MM-YY");
      const key = date;
  
      if (!grouped[key]) {
        grouped[key] = [];
      }
  
      grouped[key].push(sitting);
    });
  
    return grouped;
}

  async function handleSubmit (event) {
    if (!event.target.checkValidity()) {
      // If the form is not valid, show the native validation error message
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    console.log("Submit Action");
    event.preventDefault();
    showErrorMessage(false);
    showSuccessMessage(false);

    // Match the city to the city ID
    const court_ID = saskatchewan[selectedCity];
    console.log(`CourtID = ${court_ID}`)

    // Convert Date to something that can be converted to a date obj
    

    // First, I need to fetch all courtSittings for a specific city
    const courtSittingsResponse = await fetch(`${baseURL}courtSittings/city/${court_ID}`);
    const courtSittings = await courtSittingsResponse.json();
    console.log(`Court Sittings: ${courtSittings}`)

    // Second, I need to get the courtSitting_ID by matching the submitted date to the sitting date
    const [year, month, day] = formData.date.split('-').map(Number);
    const submittedDate = new Date(year, month -1, day);
    console.log(`Submitted date: ${submittedDate}`)
    const formattedDate = dayjs(submittedDate).format("DD-MM-YY");
    console.log(`Formatted date: ${formattedDate}`)
    const submittedDateWithoutTime = new Date(submittedDate.setHours(0, 0, 0, 0));

    const courtSitting = courtSittings.find(sitting => {
      const sittingDate = new Date(sitting.year, sitting.month - 1, sitting.day);
      const sittingDateWithoutTime = new Date(sittingDate.setHours(0,0,0,0));
      return submittedDateWithoutTime.getTime() === sittingDateWithoutTime.getTime();
    })

    console.log(`Court Sitting: ${courtSitting}`)

    // If a matching courtSitting is found, extract its ID, otherwise return an error message
    if (!courtSitting) {
      showErrorMessage(true);
      console.error("No matching court sitting found for the submitted date");
      return;
    }

    // Store the ID
    const courtSitting_ID = courtSitting._id;

    console.log(`courtSitting_ID: ${courtSitting_ID}`)

    // Might be worth storing sitting IDs in a date object

    // Third, I can create a POST request to submit the form
    // Make a POST request to submit the form
    const courtAttendanceResponse = await fetch(`${baseURL}courtAttendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courtSitting_ID,
        user_ID: userID,
        prosecutor: formData.prosecutor,
        description: formData.description,
        timePeriod: formData.timePeriod,
      }),
    });

    const courtAttendanceResult = await courtAttendanceResponse.json();

    // Update courtDates and userCourtDates in GlobalContext
    if (courtAttendanceResult) {
      showSuccessMessage(true);
      console.log(`courtAttendanceResult: ${JSON.stringify(courtAttendanceResult, null, 2)}`)
      console.log("Form submitted successfully");
      
      //updateCourtDates(courtDates, formattedDate, courtSitting_ID, createdCourtAttendance)
      getUserCourtAttendance(userID._id);
      getCourtSittings();
    } else {
      showErrorMessage(true);
        
      console.error("Error submitting form");
    }
  }

  return (
    <div className="widgetWrapper">
      <h2 className="widgetTitle">Add Court Appearance</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="city" className="widgetLabel">Select City</label>
        <div className="input-row">
        <select 
            className="widgetSelectInput" 
            id="submitProvince"
            name="province"
            value={formData.province}
            readOnly 
          >
            <option value="Saskatchewan">SK</option>
          </select>

          <select 
            className={`widgetSelectInput ${selectedCity === formData.city && formData.city !== "" && `selectedCity`}`} 
            id="submitCity" 
            name="city" 
            value={formData.city} 
            onChange={handleChange} 
            required
          >
            <option value="">Select a city</option>
            <option value="Estevan">Estevan</option>
            <option value="La Ronge">La Ronge</option>
            <option value="Lloydminster">Lloydminster</option>
            <option value="Moose Jaw">Moose Jaw</option>
            <option value="North Battlefords">North Battlefords</option>
            <option value="Prince Albert">Prince Albert</option>
            <option value="Regina">Regina</option>
            <option value="Saskatoon">Saskatoon</option>
            <option value="Swift Current">Swift Current</option>
            <option value="Meadow Lake">Meadow Lake</option>
            <option value="Melfort">Melfort</option>
            <option value="Yorkton">Yorkton</option>
            <option value="Wynyard">Wynyard</option>
        </select>

        <select
            className={`widgetSelectInput ${selectedCity === formData.circuitPoint && formData.circuitPoint !== "" && `selectedCity`}`} 
            id="submitCircuitPoint" 
            name="circuitPoint" 
            value={formData.circuitPoint} 
            onChange={handleChange} 
            required
        >
            {formData.city && skProvincialCourtOffices[formData.city] ? (
                <>
                    <option value="">{`${formData.city} Circuit Points`}</option>
                    {skProvincialCourtOffices[formData.city].map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </>
                ) : (
                    <option value="">You must select a city</option>
                )
            }
        </select>

        </div>

        {selectedCity && (<p>Selected city: {selectedCity}.</p>)}
        
        {selectedCity === formData.circuitPoint && formData.circuitPoint !== "" ? 
          <a onClick={() => {
            setFormData({...formData, circuitPoint: ""}); 
            setSelectedCity(formData.city)
          }}>{` Did you mean ${formData.city}?`}</a> : null}
        
        <div className="input-row">
          {/* A datepicker would be very useful here. */}
          <div className="flex-col">
            <label htmlFor="" className="widgetLabel">Select Date</label>
            <input 
              type="date" 
              id="submitDate" 
              value={formData.date} 
              onChange={handleChange} 
              name="date" 
              required
            />
          </div>
          
          <div className="flex-col timePeriodCol">
            <label htmlFor="timePeriod" className="widgetLabel">Time Period</label>
            <select
              className="selectInput"
              id="timePeriod"
              name="timePeriod"
              value={formData.timePeriod}
              onChange={handleChange}
              required
            >
              <option value="">Time Period</option>
              <option value="AM">Morning</option>
              <option value="PM">Afternoon</option>
              <option value="All Day">All Day</option>
            </select>
          </div>
          
        </div>

        {/* Must Select a City to Interact with This; readOnly unless city is selected */}
        <label htmlFor="" className="widgetLabel">{`Provide Court Information`}</label>
        <div className="input-row court-input-container">
          {/* Provincial Court, Court of King's Bench */}
          <label htmlFor="court_type" className="widgetLabel">Court</label>
          <select 
            className="selectInput mywidgetInput optional-court-input" 
            id="court_type" 
            name="court_type" 
            value={formData.court_type}
            onChange={handleChange}
            required
          >
            <option value="">Court</option>
            <option value="Provincial Court">Provincial Court</option>
            <option value="Kings Bench">Court of King's Bench</option>
            <option value="Appeal Court">Appeal Court</option>
          </select>
          {/* Only display when a city is selected*/}
          <label htmlFor="" className="widgetLabel">Prosecutor</label>
          <input 
            className="inputField mywidgetInput optional-court-input" 
            type="text" 
            placeholder="Prosecutor" 
            name="prosecutor" 
            id="prosecutor"
            value={formData.prosecutor}
            onChange={handleChange} 
          />
          
          <label htmlFor="" className="widgetLabel">Courtroom</label>
          <input 
            type="number"
            className="inputField mywidgetInput optional-court-input" 
            id="courtRoom" 
            name="courtRoom" 
            placeholder="Enter the courtroom number" 
            value={formData.courtRoom}
            onChange={handleChange}
          >
          </input>
        </div>

         {/* Must Select a City to Interact with This */}
         <label htmlFor="" className="widgetLabel">{`Description`}</label>
          <div className="input-row">
            {/* Provincial Court, Court of King's Bench */}
            <textarea id="description" className="widgetInput" type="textarea" placeholder="This is a description that is only visible to you." />
          </div>
          <div className="input-row-footer">
            <button type="submit" className="modal-footer-btn">Submit</button>
            
          </div>
          <div className="input-row-footer">
            { errorMessage && successMessage == false && (<p className="centerP">Form submission failed.</p>)}
            { successMessage && errorMessage == false && (<p className="centerP">Your date has been added.</p>)}
          </div>
            
      </form>
    </div>
  )
}

/* Functional Guidelines 
  1. User selects a city from the dropdown menu
  2. User selects a valid date
  --> When a valid date is selected, pull data from MongoDB and render it below 'Court Dates'
  3. When a user selects either a court or a courtroom, it filters the data
 
  Rendered Data:
  4. <p>
      <span>{City} {Court Abbreviation} #{Courtroom number} {Time} {Date}</span>
      <span>{People} {RSVP Button}</span>
     </p>
  5. Clicking on the people icon should let me see all the people in court at that time
  6. Clicking the RSVP Button should add the current user to that event IF they are not already currently RSVP'd

*/
