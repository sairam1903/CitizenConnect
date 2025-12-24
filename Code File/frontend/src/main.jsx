import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Home from './signin/home.jsx';
import Login from './signin/login.jsx'
import Dashboard from './admin/dashboard.jsx';
import Signin from './signin/signin.jsx';
import Complaint from './users/complaint.jsx';
import ComplaintDetail from './admin/complaintdetail.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
         <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/complaint" element={<Complaint />} />
        <Route path="/complaints/:id" element={<ComplaintDetail />} />
      </Routes>
    </Router>
  </StrictMode>
);
