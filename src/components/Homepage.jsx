import React, { useState } from 'react';

const Homepage = ({ onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-green-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-yellow-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
      {/* Navigation Header */}
      <nav className="bg-black border-b border-gray-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
            <span className="text-white text-xl font-bold">Job Connect</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button className="text-gray-300 hover:text-white transition">Home</button>
            <button className="text-gray-300 hover:text-white transition">About Us</button>
            <button className="text-gray-300 hover:text-white transition">Companies</button>
            <button className="text-gray-300 hover:text-white transition">Career Advice</button>
          </div>

          {/* Search and Login */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:border-blue-500 outline-none w-64"
              />
              <svg className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <button
              onClick={onLogout}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl font-bold mb-6">Find your dream job</h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Discover opportunities that match your skills and aspirations. Connect with top employers and take the next step in your career journey.
              </p>
              
              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-4 mb-8">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Job title or company"
                  className="flex-1 bg-white text-black px-6 py-4 rounded-lg border focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 rounded-2xl p-8 min-h-96 relative overflow-hidden">
                {/* Modern office workspace image */}
                <img 
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Modern office workspace with laptop and plants"
                  className="w-full h-full object-cover rounded-xl shadow-lg"
                />
                {/* Overlay elements */}
                <div className="absolute bottom-6 left-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg">
                    <p className="text-gray-800 font-medium text-sm">Your Dream Job Awaits</p>
                  </div>
                </div>
                <div className="absolute top-6 right-6">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Job Connect Section */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Why Job Connect?</h2>
          <h3 className="text-2xl text-gray-300 mb-12">Empowering Your Career Journey</h3>
          <p className="text-gray-400 text-lg mb-12 max-w-4xl">
            Job Connect is more than just a job board. We're a comprehensive career platform designed to help you 
            discover opportunities, connect with industry leaders, and accelerate your professional growth every step 
            of the way.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h4 className="text-xl font-semibold mb-3">Your Job Market</h4>
              <p className="text-gray-400 text-sm">
                Gain exclusive access to hidden job markets and opportunities from leading employers across industries.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h4 className="text-xl font-semibold mb-3">Expert Career Guidance</h4>
              <p className="text-gray-400 text-sm">
                Get personalized career advice and mentorship from industry experts to accelerate your growth.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h4 className="text-xl font-semibold mb-3">Data-Driven Insights</h4>
              <p className="text-gray-400 text-sm">
                Make informed career decisions with comprehensive salary data and market trend analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Companies We Work With */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Companies We Work With</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { 
                name: 'Google', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
                bg: 'bg-white'
              },
              { 
                name: 'Microsoft', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg',
                bg: 'bg-blue-600'
              },
              { 
                name: 'Apple', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg',
                bg: 'bg-gray-800'
              },
              { 
                name: 'Amazon', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
                bg: 'bg-orange-500'
              },
              { 
                name: 'Facebook', 
                logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg',
                bg: 'bg-blue-700'
              },
              { 
                name: 'Netflix', 
                logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80',
                bg: 'bg-red-600'
              },
            ].map((company, index) => (
              <div
                key={index}
                className={`${company.bg} h-24 rounded-lg flex items-center justify-center p-4 hover:scale-105 transition-transform cursor-pointer shadow-lg`}
              >
                {company.logo.includes('unsplash') ? (
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="h-12 w-auto object-contain rounded"
                  />
                ) : (
                  <img 
                    src={company.logo} 
                    alt={company.name}
                    className="h-8 w-auto object-contain"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Advice */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Career Advice</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Person working on resume"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Crafting a Winning Resume: Tips and Tricks</h3>
                <p className="text-gray-400 text-sm">
                  Learn how to create a compelling resume that stands out to employers and gets you noticed in today's competitive job market.
                </p>
              </div>
            </div>

            {/* Article 2 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Job interview preparation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Mastering the Art of the Interview</h3>
                <p className="text-gray-400 text-sm">
                  Prepare for success with our comprehensive guide to acing job interviews and making a lasting impression.
                </p>
              </div>
            </div>

            {/* Article 3 */}
            <div className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer shadow-xl">
              <div className="h-48 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional networking event"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">Networking for Career Success</h3>
                <p className="text-gray-400 text-sm">
                  Discover effective networking strategies to build valuable professional relationships and advance your career.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Categories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12">Browse by Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { 
                name: 'Technology', 
                color: 'bg-gradient-to-br from-blue-600 to-blue-800',
                icon: '💻',
                jobs: '2,435 jobs'
              },
              { 
                name: 'Finance', 
                color: 'bg-gradient-to-br from-green-600 to-green-800',
                icon: '💰',
                jobs: '1,823 jobs'
              },
              { 
                name: 'Marketing', 
                color: 'bg-gradient-to-br from-purple-600 to-purple-800',
                icon: '📊',
                jobs: '1,567 jobs'
              },
              { 
                name: 'Healthcare', 
                color: 'bg-gradient-to-br from-red-600 to-red-800',
                icon: '🏥',
                jobs: '987 jobs'
              },
              { 
                name: 'Education', 
                color: 'bg-gradient-to-br from-yellow-600 to-yellow-800',
                icon: '📚',
                jobs: '743 jobs'
              },
              { 
                name: 'Engineering', 
                color: 'bg-gradient-to-br from-gray-600 to-gray-800',
                icon: '⚙️',
                jobs: '1,234 jobs'
              },
            ].map((category, index) => (
              <div
                key={index}
                className={`${category.color} h-32 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:scale-105 transition-all shadow-lg hover:shadow-xl text-center p-4`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <span className="text-white font-semibold text-sm mb-1">{category.name}</span>
                <span className="text-white/80 text-xs">{category.jobs}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-blue-600 rounded mr-3"></div>
              <span className="text-white text-xl font-bold">Job Connect</span>
            </div>
            <div className="flex space-x-8 text-sm text-gray-400">
              <button className="hover:text-white transition">About Us</button>
              <button className="hover:text-white transition">Contact</button>
              <button className="hover:text-white transition">Privacy Policy</button>
              <button className="hover:text-white transition">Terms of Service</button>
            </div>
          </div>
          <div className="text-center text-gray-500 text-sm mt-8">
            © 2025 Job Connect. All rights reserved.
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
};

export default Homepage;
