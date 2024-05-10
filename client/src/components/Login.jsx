import React,{useEffect, useState} from 'react'
import "./Login.css";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { useLoader } from '../context/Context'; 
const Login = ({setShowsignout}) => {
    const {loader,loaderDispatcher,loginDetailsDispatcher,loginDetails} =useLoader()
    const [loginDetails1,setLoginDetails1,]=useState({email:"",password:""})
    const {email,password}=loginDetails1
    const navigate=useNavigate()
    const changeHandler=(e)=>{
        const {name,value}=e.target
        setLoginDetails1({...loginDetails1,[name]:value})

    }
    // navigating to books after successfull login
    useEffect(()=>{
        console.log("useeffect executed",loginDetails.xtoken)
        if(loginDetails.xtoken){
            
            navigate("/books")
        }
    },[loginDetails])
    const submitHandler=async(e)=>{
        try{
        e.preventDefault()
        console.log(loginDetails1)
        loaderDispatcher({type:"FETCH_INIT",payload:"fetching started"})
        console.log("fetchexecuted")
        
        const respo1=await axios.post("http://localhost:3001/api/signin",loginDetails1)
        if (respo1.data.acknowledged){
            
            sessionStorage.setItem('loginDetails',JSON.stringify({...loginDetails1,xtoken:respo1.data.xtoken}))
            sessionStorage.setItem('islogin',JSON.stringify(true))
            setShowsignout(prev=>!prev)
            loginDetailsDispatcher({type:"SET_LOGINDETAILS",payload:{...loginDetails1,xtoken:respo1.data.xtoken}})
            setLoginDetails1((prev)=>({...prev,xtoken:respo1.data.xtoken}))
            console.log(respo1.data.xtoken)
           
        }else if (respo1.data.acknowledged===false){
            alert(respo1.data.des)
            
        }
        loaderDispatcher({type:"FETCH_SUCCESS",payload:"fetch success"})
    
    }catch(err){
        loaderDispatcher({type:"FETCH_ERROR",payload:"error occured"})
        console.log(err)
    }
    }
    return (
        <div>
            <div className="container">
                <h2>Login</h2>
                <form  onSubmit={submitHandler}>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        <input type="email" id="email" name="email" value={email} required onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" value={password} required onChange={changeHandler}/>
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <div className="register-link">
                    <span>Not yet registered? </span><Link to="../register">Register here!</Link>
                </div>
            </div>
        </div>
    )
}

export default Login
