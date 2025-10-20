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

  
