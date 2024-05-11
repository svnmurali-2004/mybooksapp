import React, { useEffect } from 'react';
import {NavLink}  from 'react-router-dom';
import { useLoader } from '../context/Context.js'; 
const  Navbar=({showsignout,setShowsignout})=>{
  const {loginDetails,loginDetailsDispatcher} =useLoader()
  useEffect(()=>{console.log(loginDetails)},[])
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-end space-x-4">
        <li>
          <NavLink className="text-white hover:text-gray-300" to="/books">Home </NavLink>
        </li>
        <li>
          <NavLink className="text-white hover:text-gray-300" to="/aboutus">About</NavLink>
        </li>
        {
          loginDetails.isAdmin&&
          <li>
          <NavLink className="text-white hover:text-gray-300 active:text-red-400" to={"/bookupload"} >Bookupload</NavLink>
          </li>
        }
        {loginDetails.email&&<>
          
       
          <li>
        <NavLink className="text-white hover:text-gray-300" to="/" onClick={()=>{sessionStorage.removeItem('islogin');loginDetailsDispatcher({type:"RESET_LOGINDETAILS",payload:{}})}}>SignOut</NavLink>
      </li>
      
        </>
        
      }
        
       
       
      </ul>
    </nav>
  );
}

export default Navbar;
