import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <img src={logo} alt="Spectrum Diagnostics" className="h-8" />
          <span className="text-xl font-bold">Spectrum Diagnostics</span>
        </Link>
        <div className="space-x-6">
          <Link to="/dashboard" className="hover:text-secondary">Dashboard</Link>
          <Link to="/jobs" className="hover:text-secondary">Job Orders</Link>
          <Link to="/jobs/new" className="hover:text-secondary">New Job</Link>
          {user.role === 'admin' && (
            <Link to="/admin" className="hover:text-secondary">Admin</Link>
          )}
          <button onClick={handleLogout} className="hover:text-secondary">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;