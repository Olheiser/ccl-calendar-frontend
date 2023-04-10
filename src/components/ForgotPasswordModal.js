import React, { useState } from 'react'
import './../css/Modal.css'

const ForgotPasswordModal = (props) => {
    if (!props.showForgotPassword) {
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
                        <h2 className="modal-title">Reset Password</h2>
                        {/* Bind the close button event */}
                        <i className="fas fa-times" id="close-modal" onClick={props.onClose}></i>
                    </div>
                    
                    <div className="form-toggle-container">
                        <button className="loginButton">Login</button>
                        <button className="registerButton">Register</button>
                    </div>
                </div>
                <div className="modal-body">
                    <label for="email">Email Address</label>
                    <input className="inputField" type="email" placeholder="Enter your Email Address" name="email" id="email" required/>
                </div>
                <div className="modal-footer">
                    <button className="modal-footer-btn">Send Password Reset Link</button>
                </div>
            </div>
        </div>
    )
}

export default ForgotPasswordModal;