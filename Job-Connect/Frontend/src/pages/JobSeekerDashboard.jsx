import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import apiService from "../services/api";

// Reusable Section Component
const Section = ({ title, description, children }) => (
  <div className="mb-8">
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{title}</h2>
      {description && <p className="text-gray-500 mt-1">{description}</p>}
    </div>
    {children}
  </div>
);

// Application Form Component
const ApplicationForm = ({ formData, setFormData, isEdit, onSave, onClose }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    setFormData({ ...formData, [name]: e.target.files[0]?.name || "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          disabled={!isEdit}
          className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cover Letter (Optional)
        </label>
        <input
          type="file"
          name="coverLetter"
          onChange={handleFileChange}
          disabled={!isEdit}
          className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
        <input
          type="text"
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          placeholder="When can you start?"
          disabled={!isEdit}
          className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Desired Salary</label>
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter your desired salary"
          disabled={!isEdit}
          className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 disabled:bg-gray-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Personalized Message to Employer</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          disabled={!isEdit}
          rows={4}
          className="w-full border border-gray-300 rounded-md p-2 bg-white text-gray-800 disabled:bg-gray-100"
        />
      </div>
      <p className="text-sm text-gray-600">
        Application Summary<br />
        Please review your application details before submitting. Ensure all information is accurate and up-to-date. Your profile details, including work experience and skills, will be submitted along with your resume and cover letter.
      </p>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onClose}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition transform hover:scale-105"
        >
          Cancel
        </button>
        {isEdit && (
          <button
            onClick={() => onSave(formData)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition transform hover:scale-105"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
};

// Applications Page Component for Job Seeker
const ApplicationsPage = ({
  applications,
  applicationSearch,
  setApplicationSearch,
  applicationFilter,
  setApplicationFilter,
  handleView,
  handleEdit,
  handleDelete,
  renderStatusBadge,
  renderSearchInput,
  handleNewApplication,
}) => {
  const filteredApplications = applications.filter((app) => {
    let matchesFilter = true;
    if (applicationFilter !== "all") {
      matchesFilter = app.status.toLowerCase() === applicationFilter.toLowerCase();
    }
    if (applicationSearch.trim()) {
      const searchTerm = applicationSearch.toLowerCase();
      matchesFilter =
        matchesFilter &&
        (app.jobTitle.toLowerCase().includes(searchTerm) || app.company.toLowerCase().includes(searchTerm));
    }
    return matchesFilter;
  });

  return (
    <Section
      title="My Applications"
      description="View and manage your submitted applications."
    >
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-end md:items-center gap-4">
            <button
              onClick={handleNewApplication}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition transform hover:scale-105 mb-4 md:mb-0"
            >
              New Application
            </button>
            {renderSearchInput(applicationSearch, setApplicationSearch, "Search applications...")}
            <select
              value={applicationFilter}
              onChange={(e) => setApplicationFilter(e.target.value)}
              className="bg-white text-gray-800 border border-gray-300 rounded-md px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="interviewing">Interviewing</option>
              <option value="rejected">Rejected</option>
              <option value="accepted">Accepted</option>
            </select>
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
                  Company
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
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-800">{app.jobTitle}</td>
                  <td className="py-4 px-6 text-gray-600">{app.company}</td>
                  <td className="py-4 px-6 text-gray-600">{app.appliedDate}</td>
                  <td className="py-4 px-6">{renderStatusBadge(app.status)}</td>
                  <td className="py-4 px-6 space-x-2">
                    <button
                      onClick={() => handleView(app)}
                      className="text-blue-600 hover:text-blue-800 transition transform hover:scale-105"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(app)}
                      className="text-green-600 hover:text-green-800 transition transform hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(app.id)}
                      className="text-red-600 hover:text-red-800 transition transform hover:scale-105"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Section>
  );
};

// Profile Page Component
const ProfilePage = ({ profile, setProfile }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile({ ...profile, resumeUrl: url });
    }
  };

  return (
    <Section title="My Profile" description="Manage your personal information and resume.">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Full Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Phone</label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Skills</label>
                <input
                  type="text"
                  value={profile.skills.join(", ")}
                  onChange={(e) =>
                    setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()) })
                  }
                  className="w-full bg-white text-gray-800 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. React, JavaScript, Node.js"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Resume</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <img
                    src={profile.resumeUrl}
                    alt="Resume"
                    className="mx-auto h-24 w-auto object-contain mb-4"
                  />
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resumeUpload"
                  />
                  <label
                    htmlFor="resumeUpload"
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm cursor-pointer transition transform hover:scale-105"
                  >
                    Upload New
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-200 pt-6">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition transform hover:scale-105">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
};

// Notifications Page Component
const NotificationsPage = ({ notifications }) => (
  <Section title="Notifications" description="Your recent notifications.">
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {notifications.length > 0 ? (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition transform hover:scale-102"
            >
              <p className="text-sm text-gray-800">{notification.message}</p>
              <p className="text-xs text-gray-500">{notification.time}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-700">No new notifications.</p>
      )}
    </div>
  </Section>
);

// Dashboard Page Component
const DashboardPage = ({ user, applications = [], jobs = [], jobsLoading = false, jobsError = null }) => {
  // Use real user data
  const profile = {
    name: user?.name || user?.username || 'User',
    email: user?.email || '',
    role: user?.role || 'job_seeker'
  };

  // --- Helper Functions ---
  const renderStatusBadge = (status) => {
    const colorClasses = {
      Active: "bg-green-100 text-green-800 border border-green-200",
      Closed: "bg-gray-100 text-gray-800 border border-gray-200",
      Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Shortlisted: "bg-blue-100 text-blue-800 border border-blue-200",
      Hired: "bg-purple-100 text-purple-800 border border-purple-200",
      Rejected: "bg-red-100 text-red-800 border border-red-200",
    };
    return (
      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status] || "bg-gray-100 text-gray-800 border-gray-200"}`}>
        {status}
      </span>
    );
  };

  const handlePageNavigation = (page) => {
    console.log(`Navigating to: ${page}`);
    setActivePage(page);
  };
  // --- End of Helper Functions ---

  const activeApplications = applications.filter((app) => app.status === "Pending" || app.status === "Shortlisted").length;

  return (
    <Section title={`Welcome back, ${profile.name}!`} description="Here's a quick overview of your job search.">
      {/* Top Stat Cards with hover animations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 border-l-4 border-l-blue-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Jobs Applied</h3>
          <p className="text-3xl font-bold text-gray-900">{applications.length}</p>
          <p className="text-sm text-green-600 mt-1">{activeApplications} active</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 border-l-4 border-l-green-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Shortlisted</h3>
          <p className="text-3xl font-bold text-gray-900">{applications.filter((a) => a.status === "Shortlisted").length}</p>
          <p className="text-sm text-blue-600 mt-1">Awaiting response</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 border-l-4 border-l-red-500 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Rejected</h3>
          <p className="text-3xl font-bold text-gray-900">{applications.filter((a) => a.status === "Rejected").length}</p>
          <p className="text-sm text-red-600 mt-1">Keep trying!</p>
        </div>
      </div>

      {/* Sections for Recent Activity and Recommended Jobs */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Application Activity */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Recent Application Activity</h3>
            <button onClick={() => handlePageNavigation("applications")} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {applications.slice(0, 3).map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-800">{app.jobTitle}</p>
                  <p className="text-sm text-gray-600">{app.company}</p>
                </div>
                {renderStatusBadge(app.status)}
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Jobs */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Recommended Jobs</h3>
            <button onClick={() => handlePageNavigation("jobs")} className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {jobsLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600">Loading jobs...</span>
              </div>
            ) : jobsError ? (
              <div className="text-center py-8">
                <p className="text-red-600 mb-2">{jobsError}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No jobs available at the moment.</p>
              </div>
            ) : (
              jobs.slice(0, 3).map((job) => (
                <div key={job._id || job.id} className="flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-gray-50">
                  <div>
                    <p className="font-medium text-gray-800">{job.title}</p>
                    <p className="text-sm text-gray-600">{job.company}</p>
                    {job.location && <p className="text-xs text-gray-500">{job.location}</p>}
                  </div>
                  <button
                    onClick={() => handlePageNavigation("jobs")}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md text-sm font-medium transition transform hover:scale-105"
                  >
                    View
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Section>
  );
};

// Main Component
const JobSeeker = ({ user, onLogout, onDashboardClick, currentPage, setCurrentPage }) => {
  const [activePage, setActivePage] = useState("dashboard");
  const [applicationFilter, setApplicationFilter] = useState("all");
  const [applicationSearch, setApplicationSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || user?.username || "User",
    email: user?.email || "",
    phone: user?.phone || "",
    location: user?.location || "",
    skills: user?.skills || [],
    resumeUrl: user?.resumeUrl || "https://via.placeholder.com/150",
  });
  const [applications, setApplications] = useState([
    { id: 1, jobTitle: "Senior Frontend Developer", jobId: 1, status: "Pending", company: "TechCorp Solutions", appliedDate: "2023-11-18" },
    { id: 2, jobTitle: "Product Manager", jobId: 2, status: "Shortlisted", company: "Innovate Inc.", appliedDate: "2023-11-17" },
    { id: 3, jobTitle: "UX Designer", jobId: 3, status: "Rejected", company: "DesignHub", appliedDate: "2023-11-16" },
  ]);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Your application for Senior Software Engineer was viewed.",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "New message from Innovate Inc.",
      time: "1 day ago",
    },
  ]);
  const [jobs, setJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState(null);

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setJobsLoading(true);
        setJobsError(null);
        console.log('Fetching jobs...');
        const response = await apiService.getJobs({ limit: 10 }); // Get first 10 jobs
        console.log('Jobs response:', response);
        setJobs(response.jobs || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setJobsError(`Failed to load jobs. Error: ${error.message}`);
        setJobs([]); // Set empty array on error
      } finally {
        setJobsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const renderStatusBadge = (status) => {
    const colorClasses = {
      Pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      Reviewing: "bg-blue-100 text-blue-800 border border-blue-200",
      Interviewing: "bg-purple-100 text-purple-800 border border-purple-200",
      Rejected: "bg-red-100 text-red-800 border border-red-200",
      Accepted: "bg-green-100 text-green-800 border border-green-200",
      Shortlisted: "bg-blue-100 text-blue-800 border border-blue-200",
    };
    return (
      <span
        className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
          colorClasses[status] || "bg-gray-100 text-gray-800 border-gray-200"
        }`}
      >
        {status}
      </span>
    );
  };

  const renderSearchInput = (value, onChange, placeholder) => (
    <div className="flex">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white text-gray-800 border border-gray-300 rounded-l-md px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md text-sm font-medium h-10 border border-blue-600 transition transform hover:scale-105">
        Search
      </button>
    </div>
  );

  const handleView = (app) => {
    setSelectedApplication(app);
    setIsEdit(false);
    setShowModal(true);
  };

  const handleEdit = (app) => {
    setSelectedApplication(app);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this application?")) {
      setApplications(applications.filter((app) => app.id !== id));
    }
  };

  const handleNewApplication = () => {
    const newApp = {
      id: applications.length + 1,
      jobTitle: "Senior Software Engineer",
      company: "TechCorp Solutions",
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Pending",
      resume: "",
      coverLetter: "",
      availability: "",
      salary: "",
      message: "",
    };
    setSelectedApplication(newApp);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleSave = (updatedData) => {
    if (applications.some((app) => app.id === updatedData.id)) {
      setApplications(
        applications.map((app) =>
          app.id === updatedData.id ? updatedData : app
        )
      );
    } else {
      setApplications([...applications, updatedData]);
    }
    setShowModal(false);
  };

  const handleLoginClick = () => {
    // This will be handled by the parent component
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const renderActivePage = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage user={user} applications={applications} jobs={jobs} jobsLoading={jobsLoading} jobsError={jobsError} />;
      case "applications":
        return (
          <ApplicationsPage
            applications={applications}
            applicationSearch={applicationSearch}
            setApplicationSearch={setApplicationSearch}
            applicationFilter={applicationFilter}
            setApplicationFilter={setApplicationFilter}
            handleView={handleView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            renderStatusBadge={renderStatusBadge}
            renderSearchInput={renderSearchInput}
            handleNewApplication={handleNewApplication}
          />
        );
      case "profile":
        return <ProfilePage profile={profile} setProfile={setProfile} />;
      case "notifications":
        return <NotificationsPage notifications={notifications} />;
      default:
        return <DashboardPage user={user} />;
    }
  };

  const renderModal = () => {
    if (!showModal) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
        <div className="bg-white text-gray-800 border border-gray-200 rounded-lg shadow-2xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              {isEdit ? "Edit" : "View"} Application for {selectedApplication.jobTitle}
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-600 transition transform hover:scale-105"
            >
              ✕
            </button>
          </div>
          <ApplicationForm
            formData={selectedApplication}
            setFormData={setSelectedApplication}
            isEdit={isEdit}
            onSave={handleSave}
            onClose={() => setShowModal(false)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header
        user={user}
        onLoginClick={handleLoginClick}
        onLogout={handleLogout}
        onDashboardClick={onDashboardClick}
        activePage={activePage}
        setActivePage={setActivePage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        headerType="jobSeekerDashboard"
      />
      <main className="container mx-auto p-6 md:p-8">
        {renderActivePage()}
      </main>
      {renderModal()}
    </div>
  );
};

export default JobSeeker;