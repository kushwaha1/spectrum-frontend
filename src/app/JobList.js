import React, { useState, useEffect, useContext } from 'react';
import api, { updateJob } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    customerName: '',
    siteLocation: '',
    productType: '',
    jobType: '',
  });
  const [showModal, setShowModal] = useState(false);
  const { user } = useContext(AuthContext) || {};

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

  const handleUpdate = (job) => {
    setSelectedJob(job);
    setUpdateForm({
      customerName: job.customerName,
      siteLocation: job.siteLocation,
      productType: job.productType,
      jobType: job.jobType,
    });
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateJob(selectedJob._id, updateForm);
      setShowModal(false);
      fetchJobs(); // Refresh the job list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update job');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Orders</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="max-h-[70vh] overflow-y-auto">
        <table className="w-full text-left bg-white shadow-md rounded">
          <thead className="sticky top-0 bg-gray-200">
            <tr className="bg-gray-100">
              <th className="p-4">Customer</th>
              <th className="p-4">Site</th>
              <th className="p-4">Product</th>
              <th className="p-4">Job Type</th>
              <th className="p-4">Created</th>
              {user.role === 'admin' && <th className="p-4">Actions</th>}
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
                {user.role === 'admin' && (
                  <td className="p-3 space-x-2">
                    <button
                      onClick={() => handleUpdate(job)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Update Job Order</h2>
            <form onSubmit={handleSubmitUpdate} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={updateForm.customerName}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Site Location</label>
                <input
                  type="text"
                  name="siteLocation"
                  value={updateForm.siteLocation}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Product Type</label>
                <input
                  type="text"
                  name="productType"
                  value={updateForm.productType}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Job Type</label>
                <input
                  type="text"
                  name="jobType"
                  value={updateForm.jobType}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;