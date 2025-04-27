import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Card from '../components/Card';
import api from '../services/api';

const Dashboard = () => {
  const { user } = useContext(AuthContext) || {};
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch jobs');
    }
  };

  const handleDelete = async (id) => {
    if (user.role !== 'admin') return;
    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete job');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Job Orders Completed"
          value="42"
          icon={<i className="fas fa-check-circle"></i>}
        />
        <Card
          title="Total Customers"
          value="127"
          icon={<i className="fas fa-users"></i>}
        />
        <Card
          title="Pending Jobs"
          value="15"
          icon={<i className="fas fa-hourglass-half"></i>}
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 mt-6">Job Orders</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="card overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-4">Customer</th>
              <th className="p-4">Site</th>
              <th className="p-4">Product</th>
              <th className="p-4">Job Type</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id} className="border-b">
                <td className="p-4">{job.customerName}</td>
                <td className="p-4">{job.siteLocation}</td>
                <td className="p-4">{job.productType}</td>
                <td className="p-4">{job.jobType}</td>
                <td className="p-4">{new Date(job.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;