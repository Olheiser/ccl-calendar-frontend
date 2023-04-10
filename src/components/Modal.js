import React, { useState, useEffect } from 'react';
import './../css/Modal.css';

/* When a use clicks on 'login', it opens the Modal and passes 'login' to display the login form, vice versa for Register */
const Modal = (props) => {
    if (!props.show) {
        return null;
    }
    
    /* Define State Variables 
    const [modalOpen] = useState(false);
    const [loginForm] = useState(false);
    const [registerForm] = useState(false);

    /* Assign Functions to Update State 
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);*/

    /* Define Handler Functions */
    console.log(props);
    return (
        <div className="modal" onClick={props.onClose}>
            {/* stopPropogation prevents clicks inside the content area from closing the modal.*/}
            <div className="modal-container" onClick={e => e.stopPropagation()}>
                {/* Button to close the modal */}
                
                <div className="modal-header">
                    <div className="modal-header-row">
                        <i className="fas fa-times hide"></i>
                        <h2 className="modal-title">Login Form</h2>
                        {/* Bind the close button event */}
                        <i className="fas fa-times" id="close-modal" onClick={props.onClose}></i>
                    </div>
                    
                    <div className="form-toggle-container">
                        <button className="loginButton">Login</button>
                        <button className="registerButton">Register</button>
                    </div>
                </div>
                <div className="modal-body">
                    <input type="email" name="email" className="textInput" />
                    <input type="password" name="password" className="textInput" />
                    <a href="https://canadacriminallawyer.ca">Forgot Password?</a>
                </div>
                <div className="modal-footer">
                    <button>Login</button>
                    <p>Not a member?<a href="https://canadacriminallawyer.ca"> Signup now!</a></p>
                </div>
            </div>
        </div>
    )
}

export default Modal;

/* 




*/