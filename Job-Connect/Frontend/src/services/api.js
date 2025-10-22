// API service for backend communication
const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Check if user is authenticated (cookie-based)
  isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
  }

  // Get headers for requests
  getHeaders(includeAuth = true) {
    const headers = {
      'Content-Type': 'application/json',
    };

    // For cookie-based auth, we don't need to add Authorization header
    // The browser automatically includes cookies with requests
    return headers;
  }

  // Generic request method
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(options.includeAuth !== false),
      credentials: 'include', // Include cookies in requests
      ...options,
    };

    try {
      console.log('Making API request to:', url);
      const response = await fetch(url, config);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data = await response.json();
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }


  // Authentication methods
  async login(email, password) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      includeAuth: false,
    });

    // Store user data in localStorage for persistence
    // Token is automatically stored as HTTP-only cookie by backend
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  }

  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
      includeAuth: false,
    });

    // Token is automatically stored as HTTP-only cookie by backend
    return response;
  }

  async logout() {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      // Clear user data from localStorage
      // Cookie is automatically cleared by backend
      localStorage.removeItem('user');
    }
  }

  // Check if user is authenticated (cookie-based)
  isAuthenticated() {
    const user = localStorage.getItem('user');
    return user !== null;
  }

  // Get current user from localStorage
  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // User profile methods
  async getUserProfile() {
    return await this.request('/users/profile');
  }

  async updateUserProfile(profileData) {
    return await this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async changePassword(currentPassword, newPassword) {
    return await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Job methods
  async getJobs(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return await this.request(`/jobs${queryParams ? `?${queryParams}` : ''}`);
  }

  async getJobById(jobId) {
    return await this.request(`/jobs/${jobId}`);
  }

  async createJob(jobData) {
    return await this.request('/jobs', {
      method: 'POST',
      body: JSON.stringify(jobData),
    });
  }

  async updateJob(jobId, jobData) {
    return await this.request(`/jobs/${jobId}`, {
      method: 'PUT',
      body: JSON.stringify(jobData),
    });
  }

  async deleteJob(jobId) {
    return await this.request(`/jobs/${jobId}`, {
      method: 'DELETE',
    });
  }

  // Application methods
  async applyToJob(jobId, applicationData) {
    return await this.request(`/applications/apply/${jobId}`, {
      method: 'POST',
      body: JSON.stringify(applicationData),
    });
  }

  async getUserApplications() {
    return await this.request('/applications/my-applications');
  }

  async getMyJobApplications() {
    return await this.request('/applications/my-job-applications');
  }

  async getJobApplications(jobId) {
    return await this.request(`/applications/job/${jobId}`);
  }

  async getJobApplicationsForJob(jobId) {
    return await this.request(`/jobs/${jobId}/applications`);
  }

  async getApplicationById(applicationId) {
    return await this.request(`/applications/${applicationId}`);
  }

  async updateApplicationStatus(applicationId, status, notes) {
    return await this.request(`/applications/${applicationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status, notes }),
    });
  }

  async deleteApplication(applicationId) {
    return await this.request(`/applications/${applicationId}`, {
      method: 'DELETE',
    });
  }

  async getApplicationStats() {
    return await this.request('/applications/stats');
  }

  // Company methods
  async getCompanies() {
    return await this.request('/companies');
  }

  async getCompanyById(companyId) {
    return await this.request(`/companies/${companyId}`);
  }

  // Admin methods
  async getAllUsers() {
    return await this.request('/admin/users');
  }

  async updateUserRole(userId, role) {
    return await this.request(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  async deleteUser(userId) {
    return await this.request(`/admin/users/${userId}`, {
      method: 'DELETE',
    });
  }

  // Dashboard methods
  async getDashboardStats() {
    return await this.request('/dashboard/stats');
  }

  async getRecentActivity() {
    return await this.request('/dashboard/activity');
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;
