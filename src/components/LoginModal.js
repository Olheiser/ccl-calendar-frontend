import React, { useState, useEffect, useContext } from 'react';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import './../css/Modal.css';
import GlobalContext from "../context/GlobalContext";
import dayjs from 'dayjs';
import { getUserCourtAttendance, getCourtSittings, groupByCourtDate } from '../util/helpers';

/* When a use clicks on 'login', it opens the Modal and passes 'login' to display the login form, vice versa for Register */
const LoginModal = (props) => {
    const [showRegister, setShowRegister] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [errorMessage, showErrorMessage] = useState(false);
    const {baseURL, loggedIn, setStatus, userID, setUserID, userCourtDates, setUserCourtDates, courtDates, setCourtDates} = useContext(GlobalContext);

    const initialFormData = {
        email: "",
        password: "",
    };

    const resetFormData = () => {
        setFormData(initialFormData);
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
      };

    function handleSubmit(event) {
        if (!event.target.checkValidity()) {
            // If the form is not valid, show the native validation error message
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        showErrorMessage(false);
        event.preventDefault();

        fetch(`${baseURL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    showErrorMessage(true);
                    console.error("Error data:", data);
                    throw new Error("Network response was not ok");
                }
                return data;
            });
        })
          .then(data => {

            console.log("User logged in successfully:", data);
            setUserID(data);
            localStorage.setItem("sessionToken", JSON.stringify(data));
            setStatus(true);
            
            showErrorMessage(false);
            resetFormData();
            props.onClose();
            getUserCourtAttendance(data._id);
          })
          .catch(error => {
            showErrorMessage(true);
            console.error("Error logging in user:", error);
          });
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
      
      // Sample data
      //const courtSittings = [ /* Your data array here */ ];
      
      // Usage
      //const groupedCourtSittings = groupByCourtDate(courtSittings);
      //console.log(groupedCourtSittings);

    if (!props.showLogin) {
        return null;
    }

    return (
        <div className="modal" onClick={(event) => {
                resetFormData();
                showErrorMessage(false);
                props.onClose();
        }}>
            {/* stopPropogation prevents clicks inside the content area from closing the modal.*/}
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {/* Button to close the modal */}
                
                <div className="modal-header">
                    <div className="modal-header-row">
                        <i className="fas fa-times hide"></i>
                        <h2 className="modal-title">Login Form</h2>
                        {/* Bind the close button event */}
                        <i className="fas fa-times" id="close-modal" onClick={(event) => {
                            resetFormData();
                            showErrorMessage(false);
                            props.onClose();
                        }}></i>
                    </div>
                    
                    <div className="form-toggle-container">
                        <button className="loginButton active-modal-btn">Login</button>
                        <button className="registerButton" onClick={() => setShowRegister(true)}>Register</button>
                    </div>
                </div>
                <form className="modal-body" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="loginEmail" 
                        className="inputField modal-input" 
                        placeholder='Please enter your email address'
                        onChange={handleChange}
                        value={formData.email}
                        required 
                    />
                    
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="loginPassword" 
                        className="inputField modal-input" 
                        placeholder='Please enter your password'
                        onChange={handleChange}
                        value={formData.password}
                        required
                    />
                    <p className="modal-context-link" onClick={() => setShowForgotPassword(true)}>Forgot your password?</p>
                
                    <div className="modal-footer">
                    <button type="submit" className="modal-footer-btn">Login</button>

                    {errorMessage && (
                        <p>Login unsuccessful.</p>
                    )}

                    <p className="modalInterlink">Not a member?<span className="modal-context-link" onClick={() => setShowRegister(true)}> Signup now!</span></p>
                </div>
                </form>
                
            </div>
            <RegisterModal onRegisterClose={() => setShowRegister(false)} showRegister={showRegister} />
            <ForgotPasswordModal onForgotPasswordClose={() => setShowForgotPassword(false)} showForgotPassword={showForgotPassword} />
        </div>
        
    )
}

export default LoginModal;

/* 




*/