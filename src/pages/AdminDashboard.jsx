import { useState } from "react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [userFilter, setUserFilter] = useState("all"); // 'all', 'active', 'disabled'
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Innovators Inc.",
      postedDate: "2023-11-15",
      status: "Pending",
    },
    {
      id: 2,
      title: "Marketing Manager",
      company: "Global Marketing Solutions",
      postedDate: "2023-11-14",
      status: "Pending",
    },
    {
      id: 3,
      title: "Data Analyst",
      company: "Data Insights Corp.",
      postedDate: "2023-11-13",
      status: "Pending",
    },
    {
      id: 4,
      title: "Product Manager",
      company: "Product Visionaries LLC",
      postedDate: "2023-11-12",
      status: "Pending",
    },
    {
      id: 5,
      title: "UI Designer",
      company: "User Experience Design Studio",
      postedDate: "2023-11-11",
      status: "Pending",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Smith",
      role: "Job Seeker",
      email: "john.smith@example.com",
      status: "Active",
      joinDate: "2023-05-15",
      lastActive: "2023-10-18",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Employer",
      email: "sarah@globalsolutions.com",
      status: "Active",
      joinDate: "2023-04-22",
      lastActive: "2023-10-17",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Job Seeker",
      email: "michael.chen@email.com",
      status: "Disabled",
      joinDate: "2023-06-10",
      lastActive: "2023-09-05",
    },
    {
      id: 4,
      name: "Emily Williams",
      role: "Employer",
      email: "emily@techinnovators.com",
      status: "Active",
      joinDate: "2023-03-15",
      lastActive: "2023-10-19",
    },
    {
      id: 5,
      name: "David Brown",
      role: "Job Seeker",
      email: "david.brown@mail.com",
      status: "Disabled",
      joinDate: "2023-07-01",
      lastActive: "2023-08-20",
    },
    {
      id: 6,
      name: "Lisa Anderson",
      role: "Admin",
      email: "lisa@jobconnect.com",
      status: "Active",
      joinDate: "2023-01-15",
      lastActive: "2023-10-19",
    },
    {
      id: 7,
      name: "Robert Garcia",
      role: "Job Seeker",
      email: "robert.g@example.com",
      status: "Active",
      joinDate: "2023-08-12",
      lastActive: "2023-10-16",
    },
    {
      id: 8,
      name: "Jennifer Lee",
      role: "Employer",
      email: "jennifer@datainsights.com",
      status: "Active",
      joinDate: "2023-02-28",
      lastActive: "2023-10-18",
    },
  ]);

  const handleApproveJob = (jobId) => {
    setJobs(
      jobs.map((job) =>
        job.id === jobId ? { ...job, status: "Approved" } : job
      )
    );
  };

  const handleRejectJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const handleUserAction = (userId, action) => {
    if (action === "disable") {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: "Disabled" } : user
        )
      );
    } else if (action === "activate") {
      setUsers(
        users.map((user) =>
          user.id === userId ? { ...user, status: "Active" } : user
        )
      );
    } else if (action === "delete") {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleLogout = () => {
    // Handle logout logic here
    alert("Logging out...");
    setShowUserDropdown(false);
  };

  const filteredUsers = users.filter((user) => {
    if (userFilter === "all") return true;
    return user.status.toLowerCase() === userFilter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar with white line at bottom */}
      <nav className="bg-gray-1000 text-white p-4 shadow-md relative border-b border-white border-opacity-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://images.pexels.com/photos/267569/pexels-photo-267569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Job Connect Logo"
              className="h-10 w-10 mr-3 rounded-full object-cover"
            />
            <h1 className="text-xl font-bold">Job Connect</h1>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <button
                className={`px-4 py-2 rounded transition ${
                  activeTab === "overview"
                    ? "bg-white text-black font-medium"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("overview")}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 rounded transition ${
                  activeTab === "jobs"
                    ? "bg-white text-black font-medium"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("jobs")}
              >
                Job Moderation
              </button>
              <button
                className={`px-4 py-2 rounded transition flex items-center ${
                  activeTab === "users"
                    ? "bg-white text-black font-medium"
                    : "hover:bg-gray-800"
                }`}
                onClick={() => setActiveTab("users")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Users
              </button>
            </div>

            <div className="flex items-center space-x-4 border-l border-gray-700 pl-6 ml-6">
              {/* Notification Bell Icon */}
              <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-800 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full text-xs h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </div>

              {/* User Profile Circle with Dropdown */}
              <div className="relative">
                <button
                  className="flex items-center space-x-3 focus:outline-none"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                    <span className="text-sm">A</span>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700">
                    <div className="px-4 py-2 border-b border-gray-700">
                      <p className="text-sm font-medium">Admin User</p>
                      <p className="text-xs text-gray-400">
                        admin@jobconnect.com
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {activeTab === "overview" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Total Jobs Posted
                </h3>
                <p className="text-3xl font-bold">1,250</p>
                <p className="text-sm text-green-400 mt-1">
                  +12% from last month
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Total Users
                </h3>
                <p className="text-3xl font-bold">5,780</p>
                <p className="text-sm text-green-400 mt-1">
                  +8% from last month
                </p>
              </div>
              <div className="bg-gray-800 rounded-lg shadow p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-semibold text-gray-300 mb-2">
                  Total Applications
                </h3>
                <p className="text-3xl font-bold">3,420</p>
                <p className="text-sm text-green-400 mt-1">
                  +15% from last month
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Jobs Preview */}
              <div className="bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Pending Job Approvals
                  </h3>
                  <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded-full">
                    {jobs.length} pending
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
                          Company
                        </th>
                        <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider py-2">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jobs.slice(0, 3).map((job) => (
                        <tr
                          key={job.id}
                          className="border-b border-gray-700 hover:bg-gray-700"
                        >
                          <td className="py-3">{job.title}</td>
                          <td className="py-3">{job.company}</td>
                          <td className="py-3">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-800 text-yellow-200">
                              {job.status}
                            </span>
                          </td>
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
                    View All Pending Jobs →
                  </button>
                </div>
              </div>

              {/* User Summary */}
              <div className="bg-gray-800 rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">User Summary</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Active Users</span>
                    <span className="font-semibold">
                      {users.filter((u) => u.status === "Active").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Disabled Users</span>
                    <span className="font-semibold">
                      {users.filter((u) => u.status === "Disabled").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Job Seekers</span>
                    <span className="font-semibold">
                      {users.filter((u) => u.role === "Job Seeker").length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Employers</span>
                    <span className="font-semibold">
                      {users.filter((u) => u.role === "Employer").length}
                    </span>
                  </div>
                </div>
                <div className="mt-4 text-right">
                  <button
                    onClick={() => setActiveTab("users")}
                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                  >
                    Manage Users →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "jobs" && (
          <div className="bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-2xl font-bold">Job Moderation</h2>
              <p className="text-gray-300">
                Approve or reject job postings from employers
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Job Title
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Company
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Posted Date
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {jobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-700">
                      <td className="py-4 px-6">{job.title}</td>
                      <td className="py-4 px-6">{job.company}</td>
                      <td className="py-4 px-6">{job.postedDate}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-800 text-yellow-200">
                          {job.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveJob(job.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleRejectJob(job.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Reject
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

        {activeTab === "users" && (
          <div className="bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-700">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  <div>
                    <h2 className="text-2xl font-bold">User Management</h2>
                    <p className="text-gray-300">
                      Manage all users on the platform
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="border border-gray-600 rounded px-3 py-2 text-sm bg-gray-700 text-white"
                  />
                  <select
                    value={userFilter}
                    onChange={(e) => setUserFilter(e.target.value)}
                    className="border border-gray-600 rounded px-3 py-2 text-sm bg-gray-700 text-white"
                  >
                    <option value="all">All Users</option>
                    <option value="active">Active Only</option>
                    <option value="disabled">Disabled Only</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      User
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Role
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Email
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Status
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Join Date
                    </th>
                    <th className="text-left text-xs font-medium text-gray-300 uppercase tracking-wider py-3 px-6">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="font-medium">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            user.role === "Admin"
                              ? "bg-purple-800 text-purple-200"
                              : user.role === "Employer"
                              ? "bg-green-800 text-green-200"
                              : "bg-blue-800 text-blue-200"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="py-4 px-6">{user.email}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.status === "Active"
                              ? "bg-green-800 text-green-200"
                              : "bg-red-800 text-red-200"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">{user.joinDate}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          {user.status === "Active" ? (
                            <button
                              onClick={() =>
                                handleUserAction(user.id, "disable")
                              }
                              className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Disable
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                handleUserAction(user.id, "activate")
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Activate
                            </button>
                          )}
                          <button
                            onClick={() => handleUserAction(user.id, "delete")}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* User Statistics */}
            <div className="p-6 border-t border-gray-700">
              <h3 className="text-lg font-semibold mb-4">User Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-900 p-4 rounded-lg">
                  <div className="font-bold text-2xl">{users.length}</div>
                  <div className="text-blue-300">Total Users</div>
                </div>
                <div className="bg-green-900 p-4 rounded-lg">
                  <div className="font-bold text-2xl">
                    {users.filter((u) => u.status === "Active").length}
                  </div>
                  <div className="text-green-300">Active Users</div>
                </div>
                <div className="bg-red-900 p-4 rounded-lg">
                  <div className="font-bold text-2xl">
                    {users.filter((u) => u.status === "Disabled").length}
                  </div>
                  <div className="text-red-300">Disabled Users</div>
                </div>
                <div className="bg-purple-900 p-4 rounded-lg">
                  <div className="font-bold text-2xl">
                    {users.filter((u) => u.role === "Admin").length}
                  </div>
                  <div className="text-purple-300">Admin Users</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
