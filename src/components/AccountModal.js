import React, { useState, useContext } from 'react';
import GlobalContext from '../context/GlobalContext';
import './../css/AccountModal.css';
import './../css/Modal.css';

const AccountModal = (props) => {
    const [firstNameEditMode, setFirstNameEditMode] = useState(false);
    const [lastNameEditMode, setLastNameEditMode] = useState(false);
    const [cityEditMode, setCityEditMode] = useState(false);
    const [provinceEditMode, setProvinceEditMode] = useState(false);
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [phoneEditMode, setPhoneEditMode] = useState(false);
    const [passwordEditMode, setPasswordEditMode] = useState(false);

    const [successMessage, showSuccessMessage] = useState(false);
    const [errorMessage, showErrorMessage] = useState(false);
    const {baseURL, userID, setUserID} = useContext(GlobalContext);

    const [formData, setFormData] = useState({
        first_name: userID.first_name,
        last_name: userID.last_name,
        province: userID.province,
        city: userID.city,
        email: userID.email,
        phone_number: userID.phone_number && userID.phone_number,
        password: "",
        confirm_password: ""
    });

    const handleCancelEdit = (fieldName, setEditMode) => {
        setEditMode(false);
        setFormData({ ...formData, [fieldName]: userID[fieldName] });

        if (fieldName === 'province') {
            document.getElementById(`account_${fieldName}`).value = userID.province;
        } else if (fieldName === 'password') {
            document.getElementById(`account_password`).value = "";
            document.getElementById(`account_confirm_password`).value = "";
            document.getElementById(`account_password`).setAttribute('placeholder', "");
            document.getElementById(`account_confirm_password`).setAttribute('placeholder', "Confirm Password");
        } else {
            document.getElementById(`account_${fieldName}`).value="";

            if (userID[fieldName] !== undefined) document.getElementById(`account_${fieldName}`).setAttribute('placeholder', userID[fieldName])
            
        }
        showErrorMessage(false);
        showSuccessMessage(false);
    }

    const handleEditClick = (fieldName, setEditMode) => {
        setEditMode(true);
        const inputElement = document.getElementById(`account_${fieldName}`);
        
        if (userID[fieldName] !== undefined) {
            inputElement.value = userID[fieldName];
        } 

        //inputElement.focus();
        showErrorMessage(false);
        showSuccessMessage(false);
    }


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
        showErrorMessage(false);
        showSuccessMessage(false);
      };

    // PATCH Request
    function handleSubmit(event) {
    if (!event.target.checkValidity()) {
        // If the form is not valid, show the native validation error message
        event.preventDefault();
        event.stopPropagation();
        return;
    }

    showSuccessMessage(false);
    showErrorMessage(false);
    event.preventDefault();

    
    if (formData.password !== formData.confirm_password) {
        console.error("Error: Passwords do not match.");
        return;
    }

    fetch(`${baseURL}users/${userID._id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
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
        // Reset Values
        showErrorMessage(false);
        setLastNameEditMode(false);
        setCityEditMode(false);
        setProvinceEditMode(false);
        setEmailEditMode(false);
        setPhoneEditMode(false);
        setPasswordEditMode(false);

        // Update State and Local Storage
        setUserID(data);
        localStorage.setItem("sessionToken", JSON.stringify(data));
        console.log("Account information updated successfully:", data);
    })
    .catch(error => {
        console.error("Error updating account information user:", error);
    });
    }

    if (!props.showAccount) {
        return null;
    }
    return (
        <div className="modal" onClick={props.onClose}>
            {/* stopPropogation prevents clicks inside the content area from closing the modal.*/}
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {/* Button to close the modal */}
                
                <div className="modal-header">
                    <div className="modal-header-row">
                        <i className="fas fa-times hide"></i>
                        <h2 className="modal-title">Account Information</h2>
                        {/* Bind the close button event */}
                        <i className="fas fa-times" id="close-modal" onClick={props.onClose}></i>
                    </div>
                </div>
                <form className="modal-body" onSubmit={handleSubmit}>
                    <div className="account-row">
                        <label htmlFor="firstName">First Name</label>
                        <div className="input-container account-input-container">
                            <input 
                                className="inputField account-input" 
                                type="text" 
                                placeholder={userID.first_name} 
                                name="first_name" 
                                id="account_first_name" 
                                readOnly={!firstNameEditMode}
                                onChange={handleChange}
                            />
                            {firstNameEditMode == false ? (
                                <button type="button" className="pencilBtn" onClick={() => handleEditClick("first_name", setFirstNameEditMode)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            ) : (
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("first_name", setFirstNameEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            )}
                        </div>
                    </div>

                    <div className="account-row">
                        <label htmlFor="lastName">Last Name</label>
                        <div className="input-container account-input-container">
                            <input 
                                className="inputField account-input" 
                                type="text" 
                                placeholder={userID.last_name} 
                                name="last_name" 
                                id="account_last_name" 
                                readOnly={!lastNameEditMode}
                                onChange={handleChange}
                            />
                            
                            {lastNameEditMode == false ? (
                                <button type="button" className="pencilBtn" onClick={() => handleEditClick("last_name", setLastNameEditMode)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            ) : (
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("last_name", setLastNameEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            )}
                        </div>
                    </div>

                    <div className="account-row">
                        <label htmlFor="city">City</label>
                        <div className="input-container account-input-container">
                            <input 
                                className="inputField account-input" 
                                type="text" 
                                placeholder={userID.city} 
                                name="city" 
                                id="account_city" 
                                readOnly={!cityEditMode}
                                onChange={handleChange}
                            />
                            {cityEditMode == false ? (
                                <button type="button" className="pencilBtn" onClick={() => handleEditClick("city", setCityEditMode)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            ) : (
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("city", setCityEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            )}
                        </div>
                    </div>

                    <div className="account-row">
                        <label htmlFor="provinces">Province</label>
                        <div className="input-container account-input-container">
                            <select 
                                className="selectInput" 
                                id="account_province" 
                                name="province" 
                                disabled={!provinceEditMode}
                                onChange={handleChange}
                            >
                                {userID.province && <option value="">Select a province</option>}
                                <option value="AB" selected={userID.province === "AB"}>Alberta</option>
                                <option value="BC" selected={userID.province === "BC"}>British Columbia</option>
                                <option value="MB" selected={userID.province === "MB"}>Manitoba</option>
                                <option value="NB" selected={userID.province === "NB"}>New Brunswick</option>
                                <option value="NL" selected={userID.province === "NL"}>Newfoundland and Labrador</option>
                                <option value="NS" selected={userID.province === "NS"}>Nova Scotia</option>
                                <option value="NT" selected={userID.province === "NT"}>Northwest Territories</option>
                                <option value="NU" selected={userID.province === "NU"}>Nunavut</option>
                                <option value="ON" selected={userID.province === "ON"}>Ontario</option>
                                <option value="PE" selected={userID.province === "PE"}>Prince Edward Island</option>
                                <option value="QC" selected={userID.province === "QC"}>Quebec</option>
                                <option value="SK" selected={userID.province === "SK"}>Saskatchewan</option>
                                <option value="YT" selected={userID.province === "YT"}>Yukon</option>
                            </select>
                            {provinceEditMode == false ? (
                                <button type="button" className="pencilBtn" onClick={() => setProvinceEditMode(true)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            ) : (
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("province", setProvinceEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            )}
                        </div>
                    </div>

                    <div className="account-row">
                        <label htmlFor="email">Email Address</label>
                        <div className="input-container account-input-container">
                            <input 
                                className="inputField account-input" 
                                type="email" 
                                placeholder={userID.email} 
                                name="email" 
                                id="account_email" 
                                readOnly={!emailEditMode}
                                onChange={handleChange}
                            />
                            {emailEditMode == false ? (
                                <button type="button" className="pencilBtn" onClick={() => handleEditClick("email", setEmailEditMode)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            ) : (
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("email", setEmailEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            )}
                        </div>
                    </div>

                    <div className="account-row">
                        <label htmlFor="phone">Phone Number</label>
                        <div className="input-container account-input-container">
                            <input 
                                className="inputField account-input" 
                                type="tel" 
                                placeholder={userID.phone_number ? userID.phone_number : 'Phone Number'} 
                                name="phone_number" 
                                id="account_phone_number" 
                                readOnly={!phoneEditMode}
                                onChange={handleChange}
                            />  
                            {phoneEditMode == false ? (
                                <button type="button" className="pencilBtn" onClick={() => handleEditClick("phone_number", setPhoneEditMode)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            ) : (
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("phone_number", setPhoneEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            )}
                        </div>
                    </div>

                    <div className="account-row">
                        <label htmlFor="passworda">{passwordEditMode == false ? `Password` : `New Password`}</label>
                        <div className="input-container account-input-container">
                            <input 
                                className="inputField account-input" 
                                type="password" 
                                placeholder={!passwordEditMode ? "" : "New Password"} 
                                name="password" 
                                id="account_password" 
                                readOnly={!passwordEditMode}
                                onChange={handleChange}
                            />
                            {passwordEditMode == false && (
                                <button type="button" className="pencilBtn" onClick={() => handleEditClick("password", setPasswordEditMode)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                            )}
                        </div>
                    </div>
                    
                    {passwordEditMode && (
                        <div className="account-row">
                            <label htmlFor="passwordb">Confirm Password</label> {/* The string length displaces items*/}
                            <div className="input-container account-input-container">
                                <input 
                                    className="inputField account-input" 
                                    type="password" 
                                    placeholder="Confirm Password" 
                                    name="password" 
                                    id="account_confirm_password"
                                    onChange={handleChange}
                                />
                                <button type="button" className="pencilBtn" onClick={() => handleCancelEdit("password", setPasswordEditMode)}><i className="fas fa-times cancelEdit" ></i></button>
                            </div>
                        </div>
                    )}
                    <div className="modal-footer">
                        <button type="submit" className="modal-footer-btn">Save Changes</button>
                        {successMessage && (
                            <p>Information Updated!</p>
                        )}
                        {errorMessage && (
                            <p>Failed to update information.</p>
                        )}
                    </div>
                    
                </form>
                
            </div>
        </div>
    )
}

export default AccountModal;