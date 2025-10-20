import React, { useState, useEffect } from 'react';
import JobList from '../components/JobList';
import JobDetail from '../components/JobDetail';
import apiService from '../services/api';


function JobSearch() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await apiService.getJobs();
        setJobs(response.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // This function is passed down to JobList -> JobCard
  const handleJobSelect = (job) => {
    setSelectedJob(job);
    window.scrollTo(0, 0);
  };

  // This function is passed down to JobDetail
  const handleBackToList = () => {
    setSelectedJob(null);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {selectedJob ? (
          <JobDetail job={selectedJob} onBack={handleBackToList} />
        ) : (
          <JobList jobs={jobs} onJobSelect={handleJobSelect} />
        )}
      </div>
    </div>
  );
}

export default JobSearch;