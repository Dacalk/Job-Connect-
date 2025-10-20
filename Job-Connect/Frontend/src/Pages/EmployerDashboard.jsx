import React, { useState, useEffect } from "react";
import Header from '../components/Header'; // Adjust the import path as needed
import apiService from '../services/api';

// Reusable Section Component (copied from JobSeeker.jsx for consistency)
const Section = ({ title, description, children }) => (
  <div className="mb-8">
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

// Modal Component (adapted from JobSeeker.jsx)
const renderModal = (isOpen, onClose, title, children, actions) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white text-gray-800 border border-gray-200 rounded-lg shadow-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition transform hover:scale-105">✕</button>
        </div>
        {children}
        <div className="flex justify-end space-x-3 mt-6">{actions}</div>
      </div>
    </div>
  );
};

const EmployerDashboard = ({ user, onLogout, onDashboardClick, currentPage, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [jobFilter, setJobFilter] = useState("all");
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [showJobModal, setShowJobModal] = useState(false);
  const [showEditJobModal, setShowEditJobModal] = useState(false);
  const [showViewApplicantModal, setShowViewApplicantModal] = useState(false);
  const [viewingApplicant, setViewingApplicant] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [jobSearch, setJobSearch] = useState("");
  const [filteredJobId, setFilteredJobId] = useState(null);
  const [applicationSearch, setApplicationSearch] = useState("");
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    status: "Active",
    jobType: "Full-time",
    salaryRange: "",
    experienceLevel: "Entry",
    applicationDeadline: "",
  });

  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState(null);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      // Check if user is authenticated
      if (!user) {
        setJobsError('Please log in to view your jobs.');
        setJobsLoading(false);
        return;
      }

      try {
        setJobsLoading(true);
        setJobsError(null);
        console.log('Fetching jobs for user:', user);
        
        // Try to fetch user's jobs first
        try {
          const response = await apiService.request('/jobs/my-jobs');
          console.log('My jobs response:', response);
          setJobs(response.jobs || []);
        } catch (authError) {
          console.log('Authentication failed, trying to fetch all jobs:', authError);
          // If authentication fails, try to fetch all jobs and filter by user
          const allJobsResponse = await apiService.getJobs();
          console.log('All jobs response:', allJobsResponse);
          // Filter jobs by the current user (this is a fallback)
          const userJobs = (allJobsResponse.jobs || []).filter(job => 
            job.postedBy && (job.postedBy._id === user.id || job.postedBy.id === user.id)
          );
          setJobs(userJobs);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobsError(`Failed to load jobs. Error: ${error.message}`);
        setJobs([]); // Set empty array on error
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  const [applications, setApplications] = useState([]);
  const [applicationsLoading, setApplicationsLoading] = useState(false);
  const [applicationsError, setApplicationsError] = useState(null);

  // Fetch applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      // Check if user is authenticated
      if (!user) {
        setApplicationsError('Please log in to view applications.');
        setApplicationsLoading(false);
        return;
      }

      try {
        setApplicationsLoading(true);
        setApplicationsError(null);
        const response = await apiService.getMyJobApplications();
        setApplications(response.applications || []);
      } catch (error) {
        console.error('Error fetching applications:', error);
        if (error.message.includes('Authentication required') || error.message.includes('401')) {
          setApplicationsError('Please log in to view applications.');
        } else {
          setApplicationsError('Failed to load applications. Please try again.');
        }
        setApplications([]); // Set empty array on error
      } finally {
        setApplicationsLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  const [profile, setProfile] = useState({
    name: "TechCorp Solutions",
    description: "Leading technology company specializing in innovative software solutions for enterprise clients.",
    website: "https://techcorp.com",
    location: "San Francisco, CA",
    logoUrl: "/generic-company-logo.png",
  });

  const [logoFile, setLogoFile] = useState(null);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, logoUrl: url }));
    }
  };

  const renderStatusBadge = (status, isHired = false) => {
    const statusText = isHired && status === "Hired" ? "Interview Scheduled" : status;
    const colorClasses = {
      Active: "bg-green-100 text-green-800",
      Closed: "bg-gray-200 text-gray-800",
      Pending: "bg-yellow-100 text-yellow-800",
      Shortlisted: "bg-blue-100 text-blue-800",
      Hired: "bg-indigo-100 text-indigo-800",
      Rejected: "bg-red-100 text-red-800",
      "Under Review": "bg-yellow-100 text-yellow-800",
    };
     return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status] || "bg-gray-100 text-gray-800"}`}>
        {statusText}
      </span>
    );
  };

  const renderNavTab = (tabName, displayName) => (
    <button
      className={`px-4 py-2 rounded transition text-sm font-medium ${
        activeTab === tabName ? "bg-blue-600 text-white" : "hover:bg-gray-100 text-gray-600"
      }`}
      onClick={() => {
        setActiveTab(tabName);
        if (tabName === "applications") setFilteredJobId(null);
      }}
    >
      {displayName}
    </button>
  );

  const renderSearchInput = (value, onChange, placeholder, onSearch) => (
    <div className="flex">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white text-gray-800 border border-gray-300 border-r-0 rounded-l px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r text-sm font-medium h-10 border border-blue-600"
      >
        Search
      </button>
    </div>
  );

  const renderJobFormFields = (job, setJob) => {
    if (!job) return null;
    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Job Title</label>
          <input
            type="text"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
          <textarea
            value={job.description || ""}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            rows={3}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Job description and requirements..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Location</label>
          <input
            type="text"
            value={job.location || ""}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
          <select
            value={job.status}
            onChange={(e) => setJob({ ...job, status: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Job Type</label>
          <select
            value={job.jobType}
            onChange={(e) => setJob({ ...job, jobType: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Salary Range</label>
          <input
            type="text"
            value={job.salaryRange}
            onChange={(e) => setJob({ ...job, salaryRange: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. $50,000 - $70,000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Experience Level</label>
          <select
            value={job.experienceLevel}
            onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Entry">Entry</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Application Deadline</label>
          <input
            type="date"
            value={job.applicationDeadline}
            onChange={(e) => setJob({ ...job, applicationDeadline: e.target.value })}
            className="w-full bg-white text-gray-800 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    );
  };

  const renderApplicationActions = (app) => {
    const appId = app._id || app.id;
    return (
      <div className="flex space-x-2">
        <button
          onClick={() => handleViewApplicant(appId)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded text-sm"
        >
          View
        </button>
        {app.status === "Pending" && (
          <>
            <button
              onClick={() => handleApplicationAction(appId, "Shortlisted")}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
            >
              Shortlist
            </button>
            <button
              onClick={() => handleApplicationAction(appId, "Rejected")}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Reject
            </button>
          </>
        )}
        {app.status === "Shortlisted" && (
          <button
            onClick={() => handleApplicationAction(appId, "Hired")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
          >
            Hire
          </button>
        )}
      </div>
    );
  };

  const handleCreateJob = async () => {
    if (!user) {
      alert('Please log in to create jobs.');
      return;
    }

    if (newJob.title && newJob.description && newJob.location) {
      try {
        console.log('Creating job with data:', newJob);
        const jobData = {
          title: newJob.title,
          description: newJob.description,
          company: profile.name || "Your Company", // Use company name from profile
          location: newJob.location,
          salary: newJob.salaryRange ? parseInt(newJob.salaryRange.replace(/[^0-9]/g, '')) : undefined,
          isActive: newJob.status === "Active",
          applicationDeadline: newJob.applicationDeadline || undefined
        };
        
        console.log('Sending job data:', jobData);
        const response = await apiService.createJob(jobData);
        console.log('Job created successfully:', response);
        
        // Add the new job to the current list
        setJobs(prevJobs => [...prevJobs, response]);
        
        // Reset form
        setNewJob({ title: "", description: "", location: "", status: "Active", jobType: "Full-time", salaryRange: "", experienceLevel: "Entry", applicationDeadline: "" });
        setShowJobModal(false);
        alert('Job created successfully!');
      } catch (error) {
        console.error('Error creating job:', error);
        if (error.message.includes('Authentication required') || error.message.includes('401')) {
          alert('Please log in to create jobs.');
        } else {
          alert(`Failed to create job. Error: ${error.message}`);
        }
      }
    } else {
      alert('Please fill in all required fields (Title, Description, Location).');
    }
  };

  const handleEditJob = async () => {
    if (editingJob && editingJob.title && editingJob.description && editingJob.location) {
      try {
        console.log('Updating job:', editingJob);
        const jobData = {
          title: editingJob.title,
          description: editingJob.description,
          company: profile.name || "Your Company", // Use company name from profile
          location: editingJob.location,
          salary: editingJob.salaryRange ? parseInt(editingJob.salaryRange.replace(/[^0-9]/g, '')) : undefined,
          isActive: editingJob.status === "Active",
          applicationDeadline: editingJob.applicationDeadline || undefined
        };
        
        console.log('Sending update data:', jobData);
        const response = await apiService.updateJob(editingJob._id || editingJob.id, jobData);
        console.log('Job updated successfully:', response);
        
        // Update the job in the list
        setJobs(prevJobs => prevJobs.map((job) => (job._id === response._id || job.id === response.id ? response : job)));
        setEditingJob(null);
        setShowEditJobModal(false);
        alert('Job updated successfully!');
      } catch (error) {
        console.error('Error updating job:', error);
        alert(`Failed to update job. Error: ${error.message}`);
      }
    } else {
      alert('Please fill in all required fields (Title, Description, Location).');
    }
  };

  const handleJobAction = async (jobId, action) => {
    if (action === "close") {
      try {
        const job = jobs.find((job) => job._id === jobId || job.id === jobId);
        if (job) {
          console.log('Closing job:', job);
          await apiService.updateJob(job._id || job.id, { isActive: false });
          setJobs(prevJobs => prevJobs.map((job) => (job._id === jobId || job.id === jobId ? { ...job, status: "Closed", isActive: false } : job)));
          alert('Job closed successfully!');
        }
      } catch (error) {
        console.error('Error closing job:', error);
        alert(`Failed to close job. Error: ${error.message}`);
      }
    } else if (action === "delete") {
      if (confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
        try {
          console.log('Deleting job:', jobId);
          await apiService.deleteJob(jobId);
          setJobs(prevJobs => prevJobs.filter((job) => (job._id !== jobId && job.id !== jobId)));
          alert('Job deleted successfully!');
        } catch (error) {
          console.error('Error deleting job:', error);
          alert(`Failed to delete job. Error: ${error.message}`);
        }
      }
    } else if (action === "viewApplications") {
      setFilteredJobId(jobId);
      setActiveTab("applications");
      // Fetch applications for this specific job
      fetchJobApplications(jobId);
    } else if (action === "edit") {
      const jobToEdit = jobs.find((job) => job._id === jobId || job.id === jobId);
      if (jobToEdit) {
        console.log('Editing job:', jobToEdit);
        setEditingJob({
          ...jobToEdit,
          description: jobToEdit.description || "",
          location: jobToEdit.location || "",
          status: jobToEdit.isActive ? "Active" : "Closed",
          salaryRange: jobToEdit.salary ? `$${jobToEdit.salary}` : "",
        });
        setShowEditJobModal(true);
      }
    }
  };

  const handleApplicationAction = async (applicationId, action) => {
    try {
      await apiService.updateApplicationStatus(applicationId, action);
      setApplications(applications.map((app) => (app._id === applicationId || app.id === applicationId ? { ...app, status: action } : app)));
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Failed to update application status. Please try again.');
    }
  };

  const handleViewApplicant = (applicationId) => {
    const applicant = applications.find((app) => (app._id === applicationId || app.id === applicationId));
    if (applicant) {
      setViewingApplicant(applicant);
      setShowViewApplicantModal(true);
    }
  };

  const handleProfileUpdate = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  // Function to refresh jobs list
  const refreshJobs = async () => {
    if (!user) {
      setJobsError('Please log in to view your jobs.');
      return;
    }

    try {
      setJobsLoading(true);
      setJobsError(null);
      console.log('Refreshing jobs for user:', user);
      
      // Try to fetch user's jobs first
      try {
        const response = await apiService.request('/jobs/my-jobs');
        console.log('My jobs response:', response);
        setJobs(response.jobs || []);
      } catch (authError) {
        console.log('Authentication failed, trying to fetch all jobs:', authError);
        // If authentication fails, try to fetch all jobs and filter by user
        const allJobsResponse = await apiService.getJobs();
        console.log('All jobs response:', allJobsResponse);
        // Filter jobs by the current user (this is a fallback)
        const userJobs = (allJobsResponse.jobs || []).filter(job => 
          job.postedBy && (job.postedBy._id === user.id || job.postedBy.id === user.id)
        );
        setJobs(userJobs);
      }
    } catch (error) {
      console.error('Error refreshing jobs:', error);
      setJobsError(`Failed to load jobs. Error: ${error.message}`);
      setJobs([]);
    } finally {
      setJobsLoading(false);
    }
  };

  // Function to fetch applications for a specific job
  const fetchJobApplications = async (jobId) => {
    try {
      console.log('Fetching applications for job:', jobId);
      const response = await apiService.getJobApplicationsForJob(jobId);
      console.log('Job applications response:', response);
      setApplications(response.applications || []);
    } catch (error) {
      console.error('Error fetching job applications:', error);
      setApplicationsError(`Failed to load applications for this job. Error: ${error.message}`);
      setApplications([]);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    let matchesFilter = true;
    if (jobFilter !== "all") {
      const status = job.isActive ? "active" : "closed";
      matchesFilter = status === jobFilter.toLowerCase();
    }
    if (jobSearch.trim()) {
      const searchTerm = jobSearch.toLowerCase();
      matchesFilter = matchesFilter && job.title.toLowerCase().includes(searchTerm);
    }
    return matchesFilter;
  });

  const filteredApplications = applications.filter((app) => {
    let matchesFilter = true;
    if (applicationFilter !== "all") {
      matchesFilter = app.status.toLowerCase() === applicationFilter.toLowerCase();
    }
    if (filteredJobId) {
      const jobId = app.jobId._id || app.jobId.id || app.jobId;
      matchesFilter = matchesFilter && jobId === filteredJobId;
    }
    if (applicationSearch.trim()) {
      const searchTerm = applicationSearch.toLowerCase();
      const candidateName = app.applicantId?.username || app.candidateName || '';
      const jobTitle = app.jobId?.title || app.jobTitle || '';
      matchesFilter =
        matchesFilter &&
        (candidateName.toLowerCase().includes(searchTerm) || jobTitle.toLowerCase().includes(searchTerm));
    }
    return matchesFilter;
  });

  const totalApplications = jobs.reduce((sum, job) => sum + (job.applicantsCount || 0), 0);
  const hiredCandidates = applications.filter((app) => app.status === "Hired").length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header
        user={user}
        onLogout={onLogout}
        onDashboardClick={onDashboardClick}
        activePage={activeTab}
        setActivePage={setActiveTab}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        headerType="employerDashboard"
      />
      
      <main className="container mx-auto p-6 md:p-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => setCurrentPage && setCurrentPage('home')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        
        {activeTab === "overview" && (
          <Section title="Employer Dashboard Overview" description="A quick overview of your job postings and applications.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 border-l-4 border-l-blue-500">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Jobs Posted</h3>
                <p className="text-3xl font-bold text-gray-900">{jobs.length}</p>
                <p className="text-sm text-green-600 mt-1">{jobs.filter((j) => j.isActive).length} active</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 border-l-4 border-l-green-500">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Applications</h3>
                <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
                <p className="text-sm text-yellow-600 mt-1">
                  {applications.filter((a) => a.status === "Pending").length} pending review
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 border-l-4 border-l-purple-500">
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Hires</h3>
                <p className="text-3xl font-bold text-gray-900">{hiredCandidates}</p>
                <p className="text-sm text-blue-600 mt-1">
                  {applications.filter((a) => a.status === "Shortlisted").length} shortlisted
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Latest Posted Jobs</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {jobs.filter((j) => j.isActive).length} active
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                          Job Title
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                          Applications
                        </th>
                        <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-2">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobsLoading ? (
                        <tr>
                          <td colSpan="3" className="py-8 text-center">
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                              <span className="ml-2 text-gray-600">Loading jobs...</span>
                            </div>
                          </td>
                        </tr>
                      ) : jobsError ? (
                        <tr>
                          <td colSpan="3" className="py-8 text-center">
                            <p className="text-red-600">{jobsError}</p>
                            <button 
                              onClick={refreshJobs} 
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                            >
                              Try Again
                            </button>
                          </td>
                        </tr>
                      ) : jobs.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="py-8 text-center text-gray-600">
                            No jobs posted yet.
                          </td>
                        </tr>
                      ) : (
                        jobs.slice(0, 3).map((job) => (
                          <tr key={job._id || job.id} className="border-b border-gray-200 hover:bg-gray-50">
                            <td className="py-3 text-gray-800 font-medium">{job.title}</td>
                            <td className="py-3 text-gray-600">{job.applicantsCount || 0}</td>
                            <td className="py-3">{renderStatusBadge(job.isActive ? "Active" : "Closed")}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All Jobs →
                  </button>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">Recent Applications</h3>
                </div>
                <div className="space-y-3">
                  {applications.slice(0, 4).map((app) => (
                    <div
                      key={app.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div>
                        <div className="font-medium text-gray-800">{app.candidateName}</div>
                        <div className="text-sm text-gray-500">{app.jobTitle}</div>
                      </div>
                      <div className="text-right">
                        {app.status === "Hired" && (
                          <div className="text-xs text-gray-500 mb-1">
                            <div>Interview: Dec 15, 2024</div>
                            <div>Time: 2:00 PM - 3:00 PM</div>
                          </div>
                        )}
                        {renderStatusBadge(app.status, true)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setActiveTab("applications")}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View All Applications →
                  </button>
                </div>
              </div>
            </div>
          </Section>
        )}

        {activeTab === "jobs" && (
          <Section title="Job Management" description="Manage your posted jobs and track applications.">
            <div className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">Manage your posted jobs and track applications</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowJobModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium h-10"
                    >
                      Create New Job
                    </button>
                    {renderSearchInput(jobSearch, setJobSearch, "Search jobs...", () => {})}
                    <select
                      value={jobFilter}
                      onChange={(e) => setJobFilter(e.target.value)}
                      className="bg-white text-gray-800 border border-gray-300 rounded-md px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Jobs</option>
                      <option value="active">Active Only</option>
                      <option value="closed">Closed Only</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Job Title
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Posted Date
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Status
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Applications
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {jobsLoading ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">Loading jobs...</span>
                          </div>
                        </td>
                      </tr>
                    ) : jobsError ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center">
                          <p className="text-red-600">{jobsError}</p>
                          <button 
                            onClick={refreshJobs} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                          >
                            Try Again
                          </button>
                        </td>
                      </tr>
                    ) : filteredJobs.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-600">
                          {jobs.length === 0 ? "No jobs posted yet." : "No jobs match your filter criteria."}
                        </td>
                      </tr>
                    ) : (
                      filteredJobs.map((job) => (
                        <tr key={job._id || job.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-900">{job.title}</td>
                          <td className="py-4 px-6 text-gray-600">{new Date(job.createdAt || job.postedDate).toLocaleDateString()}</td>
                          <td className="py-4 px-6">{renderStatusBadge(job.isActive ? "Active" : "Closed")}</td>
                          <td className="py-4 px-6 text-gray-600">{job.applicantsCount || 0}</td>
                          <td className="py-4 px-6">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleJobAction(job._id || job.id, "edit")}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleJobAction(job._id || job.id, "delete")}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                              >
                                Delete
                              </button>
                              <button
                                onClick={() => handleJobAction(job._id || job.id, "viewApplications")}
                                className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                              >
                                View Apps
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        )}

        {activeTab === "notifications" && (
          <Section title="Notifications" description="Your recent notifications and updates.">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="space-y-4">
                {/* Deadline Notifications */}
                {jobs.filter(job => {
                  if (!job.applicationDeadline) return false;
                  const deadline = new Date(job.applicationDeadline);
                  const now = new Date();
                  const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
                  return daysUntilDeadline <= 3 && daysUntilDeadline > 0;
                }).map(job => {
                  const deadline = new Date(job.applicationDeadline);
                  const now = new Date();
                  const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));

                  return (
                    <div key={job._id || job.id} className={`p-4 border-l-4 rounded-lg ${
                      daysUntilDeadline === 1 ? 'bg-red-50 border-red-400' : 'bg-yellow-50 border-yellow-400'
                    }`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className={`h-5 w-5 ${daysUntilDeadline === 1 ? 'text-red-400' : 'text-yellow-400'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className={`text-sm font-medium ${daysUntilDeadline === 1 ? 'text-red-800' : 'text-yellow-800'}`}>
                            {daysUntilDeadline === 1 ? 'URGENT: Application Deadline Tomorrow' : 'Application Deadline Approaching'}
                          </h3>
                          <div className={`mt-2 text-sm ${daysUntilDeadline === 1 ? 'text-red-700' : 'text-yellow-700'}`}>
                            <p>Your job posting "{job.title}" expires in {daysUntilDeadline} day{daysUntilDeadline > 1 ? 's' : ''}</p>
                            <p className="text-xs mt-1">
                              Deadline: {deadline.toLocaleDateString()} at {deadline.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Passed Deadline Notifications */}
                {jobs.filter(job => {
                  if (!job.applicationDeadline) return false;
                  const deadline = new Date(job.applicationDeadline);
                  const now = new Date();
                  return deadline < now;
                }).map(job => (
                  <div key={job._id || job.id} className="p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Application Deadline Passed</h3>
                        <div className="mt-2 text-sm text-red-700">
                          <p>The application deadline for "{job.title}" has passed</p>
                          <p className="text-xs text-red-600 mt-1">
                            Deadline was: {new Date(job.applicationDeadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Recent Applications */}
                {applications.slice(0, 3).map(app => (
                  <div key={app._id || app.id} className="p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">New Application Received</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>{app.applicantId?.username || app.candidateName || 'A candidate'} applied for {app.jobId?.title || app.jobTitle || 'a position'}</p>
                          <p className="text-xs text-blue-600 mt-1">
                            Applied {new Date(app.appliedAt || app.appliedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Job Posted Successfully */}
                {jobs.slice(0, 1).map(job => (
                  <div key={job._id || job.id} className="p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-green-800">Job Posted Successfully</h3>
                        <div className="mt-2 text-sm text-green-700">
                          <p>Your "{job.title}" job posting is now live</p>
                          <p className="text-xs text-green-600 mt-1">
                            Posted {new Date(job.createdAt || job.postedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* No notifications message */}
                {jobs.length === 0 && applications.length === 0 && (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 00-15 0v5h5l-5 5-5-5h5v-5a7.5 7.5 0 0115 0v5z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications yet</h3>
                    <p className="mt-1 text-sm text-gray-500">You'll receive notifications about job deadlines and new applications here.</p>
                  </div>
                )}
              </div>
            </div>
          </Section>
        )}

        {activeTab === "applications" && (
          <Section title="Application Management" description={filteredJobId ? `Applications for: ${jobs.find((j) => (j._id === filteredJobId || j.id === filteredJobId))?.title || "Selected Job"}` : "Review and manage candidate applications"}>
            <div className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600">{filteredJobId ? "" : "Review and manage candidate applications"}</p>
                  </div>
                  <div className="flex space-x-2">
                    {filteredJobId && (
                      <button
                        onClick={() => setFilteredJobId(null)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-2 rounded-md text-sm"
                      >
                        Show All
                      </button>
                    )}
                    {renderSearchInput(applicationSearch, setApplicationSearch, "Search applications...", () => {})}
                    <select
                      value={applicationFilter}
                      onChange={(e) => setApplicationFilter(e.target.value)}
                      className="bg-white text-gray-800 border border-gray-300 rounded-md px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All</option>
                      <option value="pending">Pending</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                      <option value="hired">Hired</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Candidate
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Job Title
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Applied Date
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Status
                      </th>
                      <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider py-3 px-6">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {applicationsLoading ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="ml-2 text-gray-600">Loading applications...</span>
                          </div>
                        </td>
                      </tr>
                    ) : applicationsError ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center">
                          <p className="text-red-600">{applicationsError}</p>
                          <button 
                            onClick={refreshJobs} 
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2"
                          >
                            Try Again
                          </button>
                        </td>
                      </tr>
                    ) : filteredApplications.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-8 text-center text-gray-600">
                          {applications.length === 0 ? "No applications received yet." : "No applications match your filter criteria."}
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => {
                        const candidateName = app.applicantId?.username || app.candidateName || 'Unknown';
                        const jobTitle = app.jobId?.title || app.jobTitle || 'Unknown Job';
                        const appliedDate = new Date(app.appliedAt || app.appliedDate).toLocaleDateString();
                        
                        return (
                          <tr key={app._id || app.id} className="hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                                  {candidateName.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{candidateName}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-gray-600">{jobTitle}</td>
                            <td className="py-4 px-6 text-gray-600">{appliedDate}</td>
                            <td className="py-4 px-6">
                              {app.status === "Hired" && (
                                <div className="text-xs text-gray-500 mb-1">
                                  <div>Interview: Dec 15, 2024</div>
                                  <div>Time: 2:00 PM - 3:00 PM</div>
                                </div>
                              )}
                              {renderStatusBadge(app.status, true)}
                            </td>
                            <td className="py-4 px-6">{renderApplicationActions(app)}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        )}

        {activeTab === "profile" && (
          <Section title="Company Profile" description="Manage your company information and branding">
            <div className="bg-white text-gray-800 rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <p className="text-gray-600">Manage your company information and branding</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Company Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleProfileUpdate("name", e.target.value)}
                        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
                      <textarea
                        value={profile.description}
                        onChange={(e) => handleProfileUpdate("description", e.target.value)}
                        rows={4}
                        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Website</label>
                      <input
                        type="url"
                        value={profile.website}
                        onChange={(e) => handleProfileUpdate("website", e.target.value)}
                        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => handleProfileUpdate("location", e.target.value)}
                        className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium">
                        Save Changes
                      </button>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-2">Company Logo</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <img
                          src={profile.logoUrl || "/placeholder.svg"}
                          alt="Company Logo"
                          className="mx-auto h-24 w-24 object-cover rounded-lg mb-4"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoUpload}
                          className="hidden"
                          id="logoUpload"
                        />
                        <label
                          htmlFor="logoUpload"
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded text-sm cursor-pointer"
                        >
                          Upload New Logo
                        </label>
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                      <h3 className="font-medium text-gray-800 mb-2">Profile Preview</h3>
                      <div className="bg-white p-4 rounded border">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={profile.logoUrl || "/placeholder.svg"}
                            alt="Logo"
                            className="h-12 w-12 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">{profile.name}</h4>
                            <p className="text-sm text-gray-600">{profile.location}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 mb-2">{profile.description}</p>
                        <a href={profile.website} className="text-blue-600 text-sm hover:underline">
                          {profile.website}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Section>
        )}
      </main>

