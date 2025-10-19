import React, { useState } from 'react';
import Header from '../components/Header'; // Adjust path as needed
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Mock Data
const initialUsers = [
  { id: 1, name: 'Sophia Bennett', role: 'Employer', email: 'sophia.bennett@email.com', status: 'Active' },
  { id: 2, name: 'Ethan Carter', role: 'Job Seeker', email: 'ethan.carter@email.com', status: 'Active' },
  { id: 3, name: 'Olivia Davis', role: 'Employer', email: 'olivia.davis@email.com', status: 'Active' },
  { id: 4, name: 'Liam Foster', role: 'Job Seeker', email: 'liam.foster@email.com', status: 'Active' },
  { id: 5, name: 'Ava Green', role: 'Employer', email: 'ava.green@email.com', status: 'Active' },
];

const stats = [
  { name: 'Total Jobs Posted', value: '1,250', icon: '📈', color: 'blue' },
  { name: 'Total Users', value: '5,780', icon: '👥', color: 'green' },
  { name: 'Total Applications', value: '3,420', icon: '📋', color: 'purple' },
];

// Chart Data
const commonChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const userGrowthData = {
  labels: ['May', 'June', 'July', 'August', 'September', 'October'],
  datasets: [
    {
      label: 'New Users',
      data: [120, 150, 145, 180, 210, 250],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

const userRolesData = {
  labels: ['Employers', 'Job Seekers'],
  datasets: [
    {
      data: [1250, 4530],
      backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(251, 191, 36, 0.8)'],
      borderColor: ['rgba(59, 130, 246, 1)', 'rgba(251, 191, 36, 1)'],
      borderWidth: 2,
    },
  ],
};

const jobActivityData = {
  labels: ['July', 'August', 'September', 'October'],
  datasets: [
    {
      label: 'Jobs Posted',
      data: [80, 110, 95, 130],
      backgroundColor: 'rgba(239, 68, 68, 0.6)',
    },
    {
      label: 'Applications',
      data: [250, 310, 290, 400],
      backgroundColor: 'rgba(59, 130, 246, 0.6)',
    },
  ],
};

// Responsive Admin Dashboard Section
const AdminDashboardSection = () => (
  <div className="space-y-6 p-4 sm:p-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
    
    {/* Responsive Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((item, index) => (
        <div key={index} className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 p-4 sm:p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full bg-${item.color}-100 text-${item.color}-600 mr-4`}>
              <span className="text-2xl">{item.icon}</span>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 truncate">{item.name}</p>
              <p className="text-2xl sm:text-3xl font-semibold text-gray-900">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Responsive Charts Section */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* User Growth Chart */}
      <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">User Growth</h3>
        <div className="h-64 sm:h-80">
          <Line options={commonChartOptions} data={userGrowthData} />
        </div>
      </div>
      
      {/* User Roles Doughnut */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-4">User Roles</h3>
        <div className="h-64 sm:h-80 flex items-center justify-center">
          <Doughnut options={commonChartOptions} data={userRolesData} />
        </div>
      </div>
    </div>
    
    {/* Job Activity Bar Chart */}
    <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Job Activity</h3>
      <div className="h-80">
        <Bar options={commonChartOptions} data={jobActivityData} />
      </div>
    </div>
  </div>
);

// UserManagementSection (responsive)
const UserManagementSection = () => {
  const [users, setUsers] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '' });

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setFormData({ name: user.name, role: user.role });
    setIsModalOpen(true);
  };
  
  const handleDeleteClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };
  
  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    setUsers(users.map(user => 
      user.id === currentUser.id ? { ...user, ...formData } : user
    ));
    handleModalClose();
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-600">Edit or remove users from the platform.</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium mr-3">
                      {user.name.charAt(0)}
                    </div>
                    <div className="font-medium text-gray-900">{user.name}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 hidden sm:table-cell">{user.role}</td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 hidden md:table-cell">{user.email}</td>
                <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {user.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button onClick={() => handleEditClick(user)} className="text-blue-600 hover:text-blue-900">Edit</button>
                  <button onClick={() => handleDeleteClick(user.id)} className="text-red-600 hover:text-red-900">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Edit User</h3>
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    {formData.role === 'Employer' ? 'Company Name' : 'Full Name'}
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleFormChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select 
                    name="role" 
                    value={formData.role} 
                    onChange={handleFormChange} 
                    className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Job Seeker</option>
                    <option>Employer</option>
                    <option>Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button 
                    type="button" 
                    onClick={handleModalClose} 
                    className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// AdminProfileSection (responsive)
const AdminProfileSection = () => {
  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('alex.doe@jobconnect.com');
  const [phone, setPhone] = useState('+94 77 123 4567');
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your administrator profile details.</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input 
                  type="text" 
                  value={firstName} 
                  onChange={(e) => setFirstName(e.target.value)} 
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input 
                  type="text" 
                  value={lastName} 
                  onChange={(e) => setLastName(e.target.value)} 
                  className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                className="mt-1 block w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500" 
              />
            </div>
          </div>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
            <div className="flex flex-col items-center space-y-4">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Avatar
                </div>
              )}
              <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
                Upload New Picture
                <input 
                  id="avatar-upload" 
                  type="file" 
                  className="sr-only" 
                  accept="image/*" 
                  onChange={handleAvatarUpload} 
                />
              </label>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Admin Dashboard Component
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Admin user object
  const adminUser = {
    username: 'admin',
    role: 'Admin',
    name: 'Admin User',
    avatar: null
  };

  const handleNavClick = (tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <AdminDashboardSection />;
      case 'users': return <UserManagementSection />;
      case 'profile': return <AdminProfileSection />;
      default: return <AdminDashboardSection />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header Integration */}
      <Header
        user={adminUser}
        activePage={activeTab}
        setActivePage={setActiveTab}
        headerType="adminDashboard"
        onLogout={() => console.log('Admin logged out')}
      />
      
      {/* Main Content */}
      <main className="pt-0">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;