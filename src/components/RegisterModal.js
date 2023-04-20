import React, { useState, useContext } from 'react';
import './../css/Modal.css';
import LoginModal from './LoginModal';
import GlobalContext from "../context/GlobalContext";

const RegisterModal = (props) => {
    const [showLogin, setShowLogin] = useState(false);
    const [errorMessage, showErrorMessage] = useState(true);
    const {baseURL} = useContext(GlobalContext);
    const [successMessage, showSuccessMessage] = useState(false);

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        province: "",
        city: "",
        email: "",
        phone_number: "",
        password: "",
        confirm_password: ""
    });

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };
    
    function handleShowLogin() {
        setShowLogin(true);
        props.onRegisterClose();
    }

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

        fetch(`${baseURL}auth/register`, {
            method: "POST",
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
            showSuccessMessage(true);
            console.log("User registered successfully:", data);
          })
          .catch(error => {
            console.error("Error registering user:", error);
          });
    }

    if (!props.showRegister) {
        return null;
    }

    return (
        <div className="modal" onClick={() => {
                showErrorMessage(false);
                showSuccessMessage(false);
                props.onRegisterClose();
            }}>
            {/* stopPropogation prevents clicks inside the content area from closing the modal.*/}
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {/* Button to close the modal */}
                <div className="modal-header">
                    <div className="modal-header-row">
                        <i className="fas fa-times hide"></i>
                        <h2 className="modal-title">Sign Up Form</h2>
                        {/* Bind the close button event */}
                        <i className="fas fa-times" id="close-modal" onClick={() => {
                                showErrorMessage(false);
                                showSuccessMessage(false);
                                props.onRegisterClose();
                            }}
                        ></i>
                    </div>
                    
                    <div className="form-toggle-container">
                        <button className="loginButton" onClick={handleShowLogin}>Login</button>
                        <button className="registerButton active-modal-btn">Register</button>
                    </div>
                </div>
                <form className="modal-body" onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name</label>
                    <input 
                        className="inputField modal-input" 
                        type="text" 
                        placeholder="Enter your First Name" 
                        name="first_name" 
                        id="first_name"
                        value={formData.first_name}
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="last_name">Last Name</label>
                    <input 
                        className="inputField modal-input" 
                        type="text" 
                        placeholder="Enter your Last Name" 
                        name="last_name" 
                        id="last_name"
                        value={formData.last_name}
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="city">City</label>
                    <input 
                        className="inputField modal-input" 
                        type="text" 
                        placeholder="Enter your City" 
                        name="city" 
                        id="city"
                        value={formData.city}
                        onChange={handleChange} 
                        required
                    />                
                    
                    <label htmlFor="province">Province</label>
                    <select 
                        className="selectInput" 
                        id="province" 
                        name="province" 
                        value={formData.province}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select a province</option>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                    </select>
                   
                    <label htmlFor="email">Email Address</label>
                    <input 
                        className="inputField modal-input" 
                        type="email" 
                        placeholder="Enter your Email Address" 
                        name="email" 
                        id="email"
                        value={formData.email}
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="phone_number">Phone Number</label>
                    <input 
                        className="inputField modal-input" 
                        type="tel" 
                        placeholder="Enter your Phone Number" 
                        name="phone_number" 
                        id="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange} 
                    />

                    <label htmlFor="password">Password</label>
                    <input 
                        className="inputField modal-input" 
                        type="password" 
                        placeholder="Enter your password" 
                        name="password" 
                        id="password"
                        value={formData.password}
                        onChange={handleChange} 
                        required
                    />

                    <label htmlFor="confirm_password">Confirm Password</label>
                    <input 
                        className="inputField modal-input" 
                        type="password" 
                        placeholder="Confirm your password" 
                        name="confirm_password" 
                        id="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange} 
                        required
                    />

                    <div className="modal-footer">
                        {/*<button onClick={handleSubmit} type="submit" className="modal-footer-btn">Register</button>*/}
                        <button type="submit" className="modal-footer-btn">Register</button>
                        {successMessage && (
                            <p>Registration successful!</p>
                        )}
                        <p className="modalInterlink">Alreay have an account? <span className="modal-context-link" onClick={() => setShowLogin(true)}>Login</span></p>
                    </div>
                </form>
                
            </div>
            <LoginModal onLoginClose={() => setShowLogin(false)} showLogin={showLogin} />
        </div>
    )
}

/* When a use clicks on 'login', it opens the Modal and passes 'login' to display the login form, vice versa for Register */


export default RegisterModal;

/* 




*/