import React, { useState } from 'react';
import apiService from '../services/api';

// --- Signup Component ---
const SignupForm = ({ onSwitchToLogin, onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    password: '',
    retypePassword: '',
    role: 'Job Seeker'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear the name field when switching roles to avoid confusion
    if (name === 'role') {
      setFormData(prev => ({
        ...prev,
        name: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.retypePassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiService.register({
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
        role: formData.role.toLowerCase().replace(' ', '_')
      });
      
      setSuccess('Account created successfully! You can now login.');
      // Auto switch to login after 2 seconds
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Network error while signing up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img src="/Logo.png" alt="Job Connect Logo" className="h-10" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-500 mt-1">Start your journey with us today.</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-1">
              {formData.role === 'Employer' ? 'Company Name' : 'Full Name'}
            </label>
            <input 
              id="name-input" 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder={formData.role === 'Employer' ? 'Enter your company name' : 'Enter your full name'} 
              className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 transition" 
              required 
            />
          </div>
          <div>
            <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input id="email-input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 transition" required />
          </div>
          <div>
            <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input id="phone-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 transition" />
          </div>
          <div>
            <label htmlFor="location-input" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input id="location-input" type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Enter your location" className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 transition" />
          </div>
          <div>
            <label htmlFor="role-select" className="block text-sm font-medium text-gray-700 mb-1">I am a</label>
            <div className="relative">
              <select id="role-select" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none transition">
                <option>Job Seeker</option>
                <option>Employer</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="password-input" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input id="password-input" type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 pr-12 transition" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700" aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="retype-password-input" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <div className="relative">
              <input id="retype-password-input" type={showRetypePassword ? "text" : "password"} name="retypePassword" value={formData.retypePassword} onChange={handleChange} placeholder="Re-type your password" className="w-full px-4 py-3 bg-slate-50 text-gray-800 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-400 pr-12 transition" required />
              <button type="button" onClick={() => setShowRetypePassword(!showRetypePassword)} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500 hover:text-gray-700" aria-label={showRetypePassword ? "Hide password" : "Show password"}>
                {showRetypePassword ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg> : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>}
              </button>
            </div>
          </div>
          <div className="pt-4">
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </div>
          <div className="text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <button type="button" onClick={onSwitchToLogin} className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
