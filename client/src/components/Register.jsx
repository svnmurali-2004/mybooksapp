import React, { useState,useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from "axios";
import { useLoader } from '../context/Context.js';
const Register = ({setShowlogindetails}) => {
    const navigate=useNavigate()
    const {loginDetailsDispatcher,loginDetails}=useLoader()
    const {loader,loaderDispatcher}=useLoader()
    const [loginDetails1, setLoginDetails1] = useState({
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
            setLoginDetails1(prevState => ({
                ...prevState,
                [name]: value
            }));
        } else {
            // For gender select input
            setLoginDetails1(prevState => ({
                ...prevState,
                gender: value
            }));
        }
    }
    
    useEffect(()=>{
        if (loginDetails.xtoken){
            navigate("/books")
        }
    },[loginDetails])
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            loaderDispatcher({type:"FETCH_INIT",payload:"fetch started successfully"})
            const response = await axios.post("http://localhost:3001/api/signup", loginDetails1);
            if (response.data.acknowledged) {
                sessionStorage.setItem('loginDetails', JSON.stringify(response.data.loginDetails));
                sessionStorage.setItem('islogin', JSON.stringify(true));
                // setShowlogindetails(prev=>!prev)
                loginDetailsDispatcher({type:"SET_LOGINDETAILS",payload:{...response.data.loginDetails}})
                alert("Account created successfully!");
                
            } else {
                console.log(response.data.des);
            }
            loaderDispatcher({type:"FETCH_SUCCESS",payload:"fetched successfully"})
        } catch (error) {
            loaderDispatcher({type:"FETCH_ERROR",payload:"error occured"})
            console.error("Error during registration:", error);
            
        }
    }

    return (
        <div className="container">
            <h2>Registration</h2>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={loginDetails1.name || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={loginDetails1.gender || ''} onChange={changeHandler} required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="interests">Special Interests/Themes for Books:</label>
                    <input type="text" id="interests" name="interests" value={loginDetails1.interests || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={loginDetails1.email || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" id="phone" name="phone" value={loginDetails1.phone || ''} onChange={changeHandler} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={loginDetails1.password || ''} onChange={changeHandler} required />
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
