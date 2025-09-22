"use client"

import { useState } from "react"

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [jobFilter, setJobFilter] = useState("all")
  const [applicationFilter, setApplicationFilter] = useState("all")
  const [showJobModal, setShowJobModal] = useState(false)
  const [showEditJobModal, setShowEditJobModal] = useState(false)
  const [showViewApplicantModal, setShowViewApplicantModal] = useState(false)
  const [viewingApplicant, setViewingApplicant] = useState(null)
  const [editingJob, setEditingJob] = useState(null)
  const [jobSearch, setJobSearch] = useState("")
  const [filteredJobId, setFilteredJobId] = useState(null)
  const [applicationSearch, setApplicationSearch] = useState("")
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    location: "",
    status: "Active",
  })

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      description: "Develop and maintain frontend applications.",
      location: "San Francisco, CA",
      postedDate: "2023-11-15",
      status: "Active",
      applicantsCount: 24,
    },
    {
      id: 2,
      title: "Product Manager",
      description: "Manage product development and strategy.",
      location: "San Francisco, CA",
      postedDate: "2023-11-10",
      status: "Active",
      applicantsCount: 18,
    },
    {
      id: 3,
      title: "UX Designer",
      description: "Design user-friendly interfaces.",
      location: "San Francisco, CA",
      postedDate: "2023-11-05",
      status: "Closed",
      applicantsCount: 32,
    },
    {
      id: 4,
      title: "Backend Engineer",
      description: "Develop and maintain backend systems.",
      location: "San Francisco, CA",
      postedDate: "2023-10-28",
      status: "Active",
      applicantsCount: 15,
    },
    {
      id: 5,
      title: "Marketing Specialist",
      description: "Manage marketing campaigns and strategies.",
      location: "San Francisco, CA",
      postedDate: "2023-10-20",
      status: "Closed",
      applicantsCount: 28,
    },
  ])

  const [applications, setApplications] = useState([
    {
      id: 1,
      candidateName: "Alice Johnson",
      jobTitle: "Senior Frontend Developer",
      jobId: 1,
      appliedDate: "2023-11-18",
      status: "Pending",
      email: "alice.johnson@email.com",
      phone: "+1 (555) 123-4567",
      experience: "5 years",
      skills: ["React", "TypeScript", "Node.js", "CSS"],
      education: "Bachelor's in Computer Science",
      cv: "alice_johnson_cv.pdf",
    },
    {
      id: 2,
      candidateName: "Bob Smith",
      jobTitle: "Senior Frontend Developer",
      jobId: 1,
      appliedDate: "2023-11-17",
      status: "Pending",
      email: "bob.smith@email.com",
      phone: "+1 (555) 234-5678",
      experience: "7 years",
      skills: ["Vue.js", "JavaScript", "Python", "Docker"],
      education: "Master's in Software Engineering",
      cv: "bob_smith_cv.pdf",
    },
    {
      id: 3,
      candidateName: "Carol Davis",
      jobTitle: "Product Manager",
      jobId: 2,
      appliedDate: "2023-11-16",
      status: "Pending",
      email: "carol.davis@email.com",
      phone: "+1 (555) 345-6789",
      experience: "6 years",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      education: "MBA in Business Administration",
      cv: "carol_davis_cv.pdf",
    },
    {
      id: 4,
      candidateName: "David Wilson",
      jobTitle: "UX Designer",
      jobId: 3,
      appliedDate: "2023-11-14",
      status: "Pending",
      email: "david.wilson@email.com",
      phone: "+1 (555) 456-7890",
      experience: "4 years",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      education: "Bachelor's in Design",
      cv: "david_wilson_cv.pdf",
    },
    {
      id: 5,
      candidateName: "Emma Brown",
      jobTitle: "Backend Engineer",
      jobId: 4,
      appliedDate: "2023-11-12",
      status: "Pending",
      email: "emma.brown@email.com",
      phone: "+1 (555) 567-8901",
      experience: "3 years",
      skills: ["Java", "Spring Boot", "PostgreSQL", "AWS"],
      education: "Bachelor's in Computer Engineering",
      cv: "emma_brown_cv.pdf",
    },
    {
      id: 6,
      candidateName: "Frank Miller",
      jobTitle: "Product Manager",
      jobId: 2,
      appliedDate: "2023-11-11",
      status: "Pending",
      email: "frank.miller@email.com",
      phone: "+1 (555) 678-9012",
      experience: "8 years",
      skills: ["Product Development", "Market Research", "Scrum", "Data Analysis"],
      education: "Master's in Product Management",
      cv: "frank_miller_cv.pdf",
    },
  ])

  const [profile, setProfile] = useState({
    name: "TechCorp Solutions",
    description: "Leading technology company specializing in innovative software solutions for enterprise clients.",
    website: "https://techcorp.com",
    location: "San Francisco, CA",
    logoUrl: "/generic-company-logo.png",
  })

  const renderStatusBadge = (status, isHired = false) => {
    const statusText = isHired && status === "Hired" ? "Interview Scheduled" : status
    const colorClasses = {
      Active: "bg-green-900 text-green-200 border border-green-700",
      Closed: "bg-gray-800 text-gray-200 border border-gray-600",
      Pending: "bg-yellow-900 text-yellow-200 border border-yellow-700",
      Shortlisted: "bg-blue-900 text-blue-200 border border-blue-700",
      Hired: "bg-green-900 text-green-200 border border-green-700",
      Rejected: "bg-red-900 text-red-200 border border-red-700",
      "Under Review": "bg-yellow-900 text-yellow-200 border border-yellow-700",
    }

    return (
      <span
        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colorClasses[status] || "bg-gray-800 text-gray-200 border border-gray-600"}`}
      >
        {statusText}
      </span>
    )
  }

  const renderNavTab = (tabName, displayName) => (
    <button
      className={`px-4 py-2 rounded transition ${
        activeTab === tabName ? "bg-white text-black font-medium" : "hover:bg-gray-800 text-white"
      }`}
      onClick={() => {
        setActiveTab(tabName)
        if (tabName === "applications") setFilteredJobId(null)
      }}
    >
      {displayName}
    </button>
  )

  const renderSearchInput = (value, onChange, placeholder, onSearch) => (
    <div className="flex">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-black text-white border border-gray-600 border-r-0 rounded-l px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={onSearch}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r text-sm font-medium h-10 border border-blue-500"
      >
        Search
      </button>
    </div>
  )

  const renderModal = (isOpen, onClose, title, children, actions) => {
    if (!isOpen) return null

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-black text-white border border-gray-600 rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </button>
          </div>
          {children}
          <div className="flex space-x-3 mt-6">{actions}</div>
        </div>
      </div>
    )
  }

  const renderJobFormFields = (job, setJob) => {
    if (!job) return null

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Job Title</label>
          <input
            type="text"
            value={job.title}
            onChange={(e) => setJob({ ...job, title: e.target.value })}
            className="w-full bg-black text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
          <textarea
            value={job.description || ""}
            onChange={(e) => setJob({ ...job, description: e.target.value })}
            rows={3}
            className="w-full bg-black text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Job description and requirements..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Location</label>
          <input
            type="text"
            value={job.location || ""}
            onChange={(e) => setJob({ ...job, location: e.target.value })}
            className="w-full bg-black text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. San Francisco, CA"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
          <select
            value={job.status}
            onChange={(e) => setJob({ ...job, status: e.target.value })}
            className="w-full bg-black text-white border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
    )
  }

  const renderApplicationActions = (app) => (
    <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
      <button
        onClick={() => handleViewApplicant(app.id)}
        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
      >
        View
      </button>
      {app.status === "Pending" && (
        <>
          <button
            onClick={() => handleApplicationAction(app.id, "Shortlisted")}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
          >
            Shortlist
          </button>
          <button
            onClick={() => handleApplicationAction(app.id, "Rejected")}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Reject
          </button>
          <div></div>
        </>
      )}
      {app.status === "Shortlisted" && (
        <>
          <div></div>
          <div></div>
          <button
            onClick={() => handleApplicationAction(app.id, "Hired")}
            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm"
          >
            Hire
          </button>
        </>
      )}
      {(app.status === "Hired" || app.status === "Rejected") && (
        <>
          <div></div>
          <div></div>
          <div></div>
        </>
      )}
    </div>
  )

  const handleCreateJob = () => {
    if (newJob.title && newJob.description && newJob.location) {
      const job = {
        id: jobs.length + 1,
        title: newJob.title,
        description: newJob.description,
        location: newJob.location,
        postedDate: new Date().toISOString().split("T")[0],
        status: newJob.status,
        applicantsCount: 0,
      }
      setJobs([...jobs, job])
      setNewJob({ title: "", description: "", location: "", status: "Active" })
      setShowJobModal(false)
    }
  }

  const handleEditJob = () => {
    if (editingJob && editingJob.title && editingJob.description && editingJob.location) {
      setJobs(jobs.map((job) => (job.id === editingJob.id ? { ...job, ...editingJob } : job)))
      setEditingJob(null)
      setShowEditJobModal(false)
    }
  }

  const handleJobAction = (jobId, action) => {
    if (action === "close") {
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: "Closed" } : job)))
    } else if (action === "delete") {
      setJobs(jobs.filter((job) => job.id !== jobId))
    } else if (action === "viewApplications") {
      setFilteredJobId(jobId)
      setActiveTab("applications")
    } else if (action === "edit") {
      const jobToEdit = jobs.find((job) => job.id === jobId)
      if (jobToEdit) {
        setEditingJob({
          ...jobToEdit,
          description: jobToEdit.description || "",
          location: jobToEdit.location || "",
        })
        setShowEditJobModal(true)
      }
    }
  }

  const handleApplicationAction = (applicationId, action) => {
    setApplications(applications.map((app) => (app.id === applicationId ? { ...app, status: action } : app)))
  }

  const handleViewApplicant = (applicationId) => {
    const applicant = applications.find((app) => app.id === applicationId)
    if (applicant) {
      setViewingApplicant(applicant)
      setShowViewApplicantModal(true)
    }
  }

  const handleProfileUpdate = (field, value) => {
    setProfile({ ...profile, [field]: value })
  }

  const filteredJobs = jobs.filter((job) => {
    let matchesFilter = true
    if (jobFilter !== "all") {
      matchesFilter = job.status.toLowerCase() === jobFilter.toLowerCase()
    }
    if (jobSearch.trim()) {
      const searchTerm = jobSearch.toLowerCase()
      matchesFilter = matchesFilter && job.title.toLowerCase().includes(searchTerm)
    }
    return matchesFilter
  })

  const filteredApplications = applications.filter((app) => {
    let matchesFilter = true
    if (applicationFilter !== "all") {
      matchesFilter = app.status.toLowerCase() === applicationFilter.toLowerCase()
    }
    if (filteredJobId) {
      matchesFilter = matchesFilter && app.jobId === filteredJobId
    }
    if (applicationSearch.trim()) {
      const searchTerm = applicationSearch.toLowerCase()
      matchesFilter =
        matchesFilter &&
        (app.candidateName.toLowerCase().includes(searchTerm) || app.jobTitle.toLowerCase().includes(searchTerm))
    }
    return matchesFilter
  })

  const totalApplications = jobs.reduce((sum, job) => sum + job.applicantsCount, 0)
  const hiredCandidates = applications.filter((app) => app.status === "Hired").length

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black text-white p-4 shadow-md border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Component%201%283%29-uIkU6uPKaOt1u2gnysUPUZCoX15F3E.png"
              alt="Job Connect Logo"
              className="h-5 w-5"
            />
            <h1 className="text-xl font-bold">JOB CONNECT</h1>
          </div>
          <div className="flex space-x-4">
            {renderNavTab("overview", "Overview")}
            {renderNavTab("jobs", "Jobs")}
            {renderNavTab("applications", "Applications")}
            {renderNavTab("profile", "Profile")}
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        {activeTab === "overview" && (
          <div className="bg-black text-white p-6 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-6 text-white">Employer Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-black border border-gray-700 rounded-lg shadow p-6 border-l-4 border-l-blue-500">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Jobs Posted</h3>
                <p className="text-3xl font-bold text-white">{jobs.length}</p>
                <p className="text-sm text-green-400 mt-1">{jobs.filter((j) => j.status === "Active").length} active</p>
              </div>
              <div className="bg-black border border-gray-700 rounded-lg shadow p-6 border-l-4 border-l-green-500">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Applications</h3>
                <p className="text-3xl font-bold text-white">{totalApplications}</p>
                <p className="text-sm text-green-400 mt-1">
                  {applications.filter((a) => a.status === "Pending").length} pending review
                </p>
              </div>
              <div className="bg-black border border-gray-700 rounded-lg shadow p-6 border-l-4 border-l-purple-500">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Total Hires</h3>
                <p className="text-3xl font-bold text-white">{hiredCandidates}</p>
                <p className="text-sm text-green-400 mt-1">
                  {applications.filter((a) => a.status === "Shortlisted").length} shortlisted
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-black border border-gray-700 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Latest Posted Jobs</h3>
                  <span className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded-full border border-blue-700">
                    {jobs.filter((j) => j.status === "Active").length} active
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-2">
                          Job Title
                        </th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-2">
                          Applications
                        </th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-2">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.slice(0, 3).map((job) => (
                        <tr key={job.id} className="border-b border-gray-800 hover:bg-gray-900">
                          <td className="py-3 text-white">{job.title}</td>
                          <td className="py-3 text-gray-300">{job.applicantsCount}</td>
                          <td className="py-3">{renderStatusBadge(job.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setActiveTab("jobs")}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View All Jobs →
                  </button>
                </div>
              </div>

              <div className="bg-black border border-gray-700 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-white">Recent Applications</h3>
                </div>
                <div className="space-y-4">
                  {applications.slice(0, 4).map((app) => (
                    <div
                      key={app.id}
                      className="flex justify-between items-center p-3 bg-gray-900 rounded-lg border border-gray-800"
                    >
                      <div>
                        <div className="font-medium text-white">{app.candidateName}</div>
                        <div className="text-sm text-gray-400">{app.jobTitle}</div>
                      </div>
                      <div className="text-right">
                        {app.status === "Hired" && (
                          <div className="text-xs text-gray-400 mb-1">
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
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    View All Applications →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="bg-black text-white rounded-lg shadow border border-gray-800">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Job Management</h2>
                  <p className="text-gray-300">Manage your posted jobs and track applications</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setShowJobModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium h-10"
                  >
                    Create New Job
                  </button>
                  {renderSearchInput(jobSearch, setJobSearch, "Search jobs...", () => {})}
                  <select
                    value={jobFilter}
                    onChange={(e) => setJobFilter(e.target.value)}
                    className="bg-black text-white border border-gray-600 rounded px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Job Title
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Posted Date
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Applications
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-900">
                      <td className="py-4 px-6 font-medium text-white">{job.title}</td>
                      <td className="py-4 px-6 text-gray-300">{job.postedDate}</td>
                      <td className="py-4 px-6">{renderStatusBadge(job.status)}</td>
                      <td className="py-4 px-6 text-gray-300">{job.applicantsCount}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleJobAction(job.id, "edit")}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Edit Job
                          </button>
                          <button
                            onClick={() => handleJobAction(job.id, "delete")}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete Job
                          </button>
                          <button
                            onClick={() => handleJobAction(job.id, "viewApplications")}
                            className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                          >
                            View Applications
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "applications" && (
          <div className="bg-black text-white rounded-lg shadow border border-gray-800">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-white">Application Management</h2>
                  <p className="text-gray-300">
                    {filteredJobId
                      ? `Applications for: ${jobs.find((j) => j.id === filteredJobId)?.title || "Selected Job"}`
                      : "Review and manage candidate applications"}
                  </p>
                </div>
                <div className="flex space-x-2">
                  {filteredJobId && (
                    <button
                      onClick={() => setFilteredJobId(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Show All Applications
                    </button>
                  )}
                  {renderSearchInput(applicationSearch, setApplicationSearch, "Search applications...", () => {})}
                  <select
                    value={applicationFilter}
                    onChange={(e) => setApplicationFilter(e.target.value)}
                    className="bg-black text-white border border-gray-600 rounded px-3 py-2 text-sm h-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Applications</option>
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
                <thead className="bg-gray-900">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Candidate
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Job Title
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Applied Date
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-900">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                            {app.candidateName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-white">{app.candidateName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{app.jobTitle}</td>
                      <td className="py-4 px-6 text-gray-300">{app.appliedDate}</td>
                      <td className="py-4 px-6">
                        {app.status === "Hired" && (
                          <div className="text-xs text-gray-400 mb-1">
                            <div>Interview: Dec 15, 2024</div>
                            <div>Time: 2:00 PM - 3:00 PM</div>
                          </div>
                        )}
                        {renderStatusBadge(app.status, true)}
                      </td>
                      <td className="py-4 px-6">{renderApplicationActions(app)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="bg-black text-white rounded-lg shadow border border-gray-800">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold text-white">Company Profile</h2>
              <p className="text-gray-300">Manage your company information and branding</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleProfileUpdate("name", e.target.value)}
                      className="w-full bg-black text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                    <textarea
                      value={profile.description}
                      onChange={(e) => handleProfileUpdate("description", e.target.value)}
                      rows={4}
                      className="w-full bg-black text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => handleProfileUpdate("website", e.target.value)}
                      className="w-full bg-black text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Location</label>
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleProfileUpdate("location", e.target.value)}
                      className="w-full bg-black text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Company Logo</label>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                      <img
                        src={profile.logoUrl || "/placeholder.svg"}
                        alt="Company Logo"
                        className="mx-auto h-24 w-24 object-cover rounded-lg mb-4"
                      />
                      <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm">
                        Upload New Logo
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-900 border border-gray-700 p-4 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Profile Preview</h3>
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
        )}
      </main>

      {renderModal(
        showJobModal,
        () => setShowJobModal(false),
        "Create New Job",
        renderJobFormFields(newJob, setNewJob),
        <>
          <button
            onClick={handleCreateJob}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-sm font-medium flex-1"
          >
            Create Job
          </button>
          <button
            onClick={() => setShowJobModal(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium flex-1"
          >
            Cancel
          </button>
        </>,
      )}

      {renderModal(
        showEditJobModal && editingJob,
        () => setShowEditJobModal(false),
        "Edit Job",
        editingJob ? renderJobFormFields(editingJob, setEditingJob) : null,
        <>
          <button
            onClick={handleEditJob}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium flex-1"
          >
            Save Changes
          </button>
          <button
            onClick={() => setShowEditJobModal(false)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded text-sm font-medium flex-1"
          >
            Cancel
          </button>
        </>,
      )}

      {showViewApplicantModal && viewingApplicant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black text-white border border-gray-600 rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Applicant Details</h3>
              <button
                onClick={() => setShowViewApplicantModal(false)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                <div className="h-16 w-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-medium">
                  {viewingApplicant.candidateName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-white">{viewingApplicant.candidateName}</h4>
                  <p className="text-gray-300">Applied for: {viewingApplicant.jobTitle}</p>
                  <p className="text-sm text-gray-400">Applied on: {viewingApplicant.appliedDate}</p>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-medium text-white mb-3">Contact Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Email</label>
                    <p className="text-white">{viewingApplicant.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Phone</label>
                    <p className="text-white">{viewingApplicant.phone}</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-medium text-white mb-3">Professional Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Experience</label>
                    <p className="text-white">{viewingApplicant.experience}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400">Education</label>
                    <p className="text-white">{viewingApplicant.education}</p>
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-medium text-white mb-3">Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {viewingApplicant.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-sm font-medium border border-blue-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="text-lg font-medium text-white mb-3">Resume/CV</h5>
                <div className="flex items-center space-x-3 p-3 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="h-10 w-10 bg-red-500 rounded flex items-center justify-center text-white font-medium">
                    PDF
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">{viewingApplicant.cv}</p>
                    <p className="text-sm text-gray-400">Click to download or view</p>
                  </div>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    Download
                  </button>
                </div>
              </div>

              <div>
                <h5 className="text-lg font-medium text-white mb-3">Application Status</h5>
                {renderStatusBadge(viewingApplicant.status, true)}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-8 pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowViewApplicantModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployerDashboard
