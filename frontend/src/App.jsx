// src/App.jsx

import './index.css'; // Import the CSS file where Tailwind is configured
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import HomePage from './components/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';


const App = () => {
  return(
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/home" element={<ProtectedRoute><HomePage/></ProtectedRoute>} />
      </Routes>
    </Router>
  )
};

export default App;
