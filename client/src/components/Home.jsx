import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to our Bookstore</h1>
      <div className="search-container">
        <input type="text" className="search-box" placeholder="Search books..." />
        <button className="search-btn">Search</button>
      </div>

      <div className="auth-buttons">
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
        {/* <Link to="/book"><button>Books</button></Link> */}
        
      </div>
      <div>
        {/* <img src="./assets/background.jpg" alt="background image" /> */}
      </div>
    </div>
  );
};

export default Home;

