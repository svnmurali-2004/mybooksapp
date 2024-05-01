import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

const Register = () => {
    const [loginDetails, setLoginDetails] = useState({
        name: "",
        gender: "male",
        interests: "",
        email: "",
        phone: "",
        password: ""
    });

    const changeHandler = (e) => {
        const { name, value } = e.target;
    
        // For regular input fields
        if (name !== "gender") {
            setLoginDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // For gender select input
            setLoginDetails(prevState => ({
                ...prevState,
                gender: value
            }));
        }
    }
    

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(loginDetails)
        try {
            const response = await axios.post("http://localhost:3001/api/signup", loginDetails);
            if (response.data.acknowledged) {
                sessionStorage.setItem('loginDetails', JSON.stringify(response.data.loginDetails));
                sessionStorage.setItem('islogin', JSON.stringify(true));
                alert("Account created successfully!");
            } else {
                alert(response.data.des);
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again later.");
        }
    }

    return (
        <div className="container">
            <h2>Registration</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={loginDetails.name || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={loginDetails.gender || ''} onChange={changeHandler} required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="interests">Special Interests/Themes for Books:</label>
                    <input type="text" id="interests" name="interests" value={loginDetails.interests || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={loginDetails.email || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={loginDetails.phone || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={loginDetails.password || ''} onChange={changeHandler} required />
                </div>
                <button type="submit" className="btn">Register</button>
            </form>
            <div className="login-link">
                <span>Already a user? </span><Link to="/login">Click here to login</Link>
            </div>
        </div>
    );
}

export default Register;
