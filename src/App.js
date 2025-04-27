import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Login from './app/Login';
import Dashboard from './app/Dashboard';
import JobForm from './app/JobForm';
import JobList from './app/JobList';
import Navbar from './components/Navbar';

function App() {
  const { user } = useContext(AuthContext) || {};

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/jobs/new" element={user ? <JobForm /> : <Navigate to="/jobs/new" />} />
        <Route path="/jobs" element={user ? <JobList /> : <Navigate to="/jobs" />} />
        <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;