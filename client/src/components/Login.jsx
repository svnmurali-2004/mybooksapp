import React,{useState} from 'react'
import "./Login.css";
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
const Login = ({setShowsignout}) => {
    const [loginDetails,setLoginDetails]=useState({email:"",password:""})
    const {email,password}=loginDetails
    const navigate=useNavigate()
    const changeHandler=(e)=>{
        const {name,value}=e.target
        setLoginDetails({...loginDetails,[name]:value})
    }
    const submitHandler=async(e)=>{
        e.preventDefault()
        console.log(loginDetails)
        const respo1=await axios.post("http://localhost:3001/api/signin",loginDetails)
        if (respo1.data.acknowledged){
            alert ('login success')
            sessionStorage.setItem('loginDetails',JSON.stringify(loginDetails))
            sessionStorage.setItem('islogin',JSON.stringify(true))
            setShowsignout(prev=>!prev)
            navigate("/books")
        }else if (respo1.data.acknowledged===false){
            alert(respo1.data.des)
            
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
