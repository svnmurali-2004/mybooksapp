import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Books from './components/Books';
import './App.css';
import Card from './components/Card';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/book" element={<Books />} />
          <Route path="/Card" element={<Card />} />
          
        </Routes>
      </Router>
      <card />
    </div>
  );
}

export default App;
  
