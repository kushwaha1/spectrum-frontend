import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const JobForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    siteLocation: '',
    productType: '',
    jobType: '',
  });
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/jobs', formData);
      navigate('/jobs');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job order');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create Job Order</h1>
      <div className="card max-w-2xl mx-auto">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Site Location</label>
            <input
              type="text"
              name="siteLocation"
              value={formData.siteLocation}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Product Type</label>
            <input
              type="text"
              name="productType"
              value={formData.productType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Job Type</label>
            <input
              type="text"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Job Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobForm;