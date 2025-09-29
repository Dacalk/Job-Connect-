import React, { useState } from 'react';

const Signup = ({ onSwitchToLogin, onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    retypePassword: '',
    employer: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate passwords match
    if (formData.password !== formData.retypePassword) {
      alert('Passwords do not match');
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      // Simple validation - in real app, this would be API call
      if (formData.name && formData.email && formData.password) {
        onSignup({
          username: formData.name,
          email: formData.email,
          employer: formData.employer,
          role: 'Job Seeker'
        });
      } else {
        alert('Please fill in all required fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Signup form */}
      <div className="w-full lg:w-1/2 bg-black flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
              <span className="text-white text-xl font-semibold">Job Connect</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
              />
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Your Password"
                  className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Re-type Password */}
            <div>
              <div className="relative">
                <input
                  type={showRetypePassword ? "text" : "password"}
                  name="retypePassword"
                  value={formData.retypePassword}
                  onChange={handleChange}
                  placeholder="Re-type Password"
                  className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowRetypePassword(!showRetypePassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showRetypePassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    )}
                  </svg>
                </button>
              </div>
            </div>

            {/* Employer */}
            <div>
              <input
                type="text"
                name="employer"
                value={formData.employer}
                onChange={handleChange}
                placeholder="Employer"
                className="w-full px-4 py-3 bg-white text-black rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none placeholder-gray-500"
              />
            </div>

            {/* SignUp Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'SignUp'}
            </button>

            {/* Login link */}
            <div className="text-center">
              <span className="text-gray-400 text-sm">Already have an account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-blue-400 text-sm hover:text-blue-300"
              >
                Click Here to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right side - Create Account message with background */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-bl from-gray-800 via-gray-700 to-gray-900 overflow-hidden">
        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
            alt="Professional networking and collaboration"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Background circles/decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-yellow-600 opacity-20 blur-xl"></div>
          <div className="absolute top-40 right-32 w-40 h-40 rounded-full bg-blue-500 opacity-15 blur-xl"></div>
          <div className="absolute bottom-40 left-32 w-48 h-48 rounded-full bg-green-600 opacity-10 blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-36 h-36 rounded-full bg-purple-600 opacity-15 blur-xl"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 rounded-full bg-orange-500 opacity-20 blur-xl"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center px-12">
          <h1 className="text-4xl font-bold text-white mb-6">Create Your Account</h1>
          <p className="text-gray-300 text-lg leading-relaxed max-w-md">
            Join thousands of professionals finding their next opportunity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
