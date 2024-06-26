import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Books from './components/Books';
import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs.jsx';
import { useState } from 'react';

import Loader from './components/Loader.jsx';
import { LoaderProvider } from './context/Context.js';
import BookUpload from './components/BookUpload.js';

function App() {
  const [showsignout,setShowsignout]=useState(false)

  return (
    <LoaderProvider>
    <Router><div className="App">
      <Loader/>
    <Navbar setShowsignout={setShowsignout} showsignout={showsignout}/>
      <Routes>
        <Route path="/" element={<Home showsignout={showsignout}/>} />
        <Route path="/login" element={<Login setShowsignout={setShowsignout}/>} />
        <Route path="/register" element={<Register setShowsignout={setShowsignout}/>} />
        <Route path="/books" element={<Books setShowsignout={setShowsignout} />} />
        <Route path="/card" element={<Card />} />
        <Route path='/aboutus' element={<AboutUs/>}/>
        <Route path='/bookupload' element={<BookUpload/>} />
      </Routes>
    
    
  </div></Router>
  </LoaderProvider>
    
  );
}

export default App;
  
