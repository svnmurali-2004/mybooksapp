import React from 'react';
import {NavLink}  from 'react-router-dom';

const  Navbar=({showsignout,setShowsignout})=>{
  
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex justify-end space-x-4">
        <li>
          <NavLink className="text-white hover:text-gray-300" to="/books">Home </NavLink>
        </li>
        <li>
          <NavLink className="text-white hover:text-gray-300" to="/aboutus">About</NavLink>
        </li>
        {!showsignout&&
        <li>
        <NavLink className="text-white hover:text-gray-300" to="/" onClick={()=>{sessionStorage.removeItem('islogin');setShowsignout(prev=>!prev)}}>SignOut</NavLink>
      </li>}
        
       
       
      </ul>
    </nav>
  );
}

export default Navbar;
