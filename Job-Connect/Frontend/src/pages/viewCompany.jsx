import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Icon Components ---
const MapPinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BuildingIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <line x1="9" y1="4" x2="9" y2="20"></line>
    <line x1="15" y1="4" x2="15" y2="20"></line>
  </svg>
);

const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CalendarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BriefcaseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const StarIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"></polygon>
  </svg>
);

const HeartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
  </svg>
);

const GlobeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const ViewCompany = ({ user, onLoginClick, onLogout, company, onBackToCompanies, currentPage, setCurrentPage }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [savedJobs, setSavedJobs] = useState(new Set());


  // Use the company prop if provided, otherwise use mock data
  const companyData = company || {
    name: 'TechNova Solutions',
    industry: 'Technology',
    location: 'San Francisco, CA',
    logo: 'https://placehold.co/150x150/e2e8f0/64748b?text=TN',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Pioneering AI and machine learning solutions for enterprises worldwide. We are committed to transforming businesses through innovative technology and cutting-edge research.',
    founded: 2015,
    employees: 1200,
    website: 'https://technova.com',
    rating: 4.8,
    reviews: 1247,
    openJobs: 45,
    benefits: [
      'Health Insurance',
      'Dental & Vision',
      '401(k) Matching',
      'Flexible Hours',
      'Remote Work',
      'Professional Development',
      'Gym Membership',
      'Free Meals'
    ],
    culture: [
      'Innovation-driven environment',
      'Collaborative team culture',
      'Work-life balance focus',
      'Diversity and inclusion',
      'Continuous learning opportunities',
      'Open communication'
    ]
  };

  // If no company is provided, show a loading or error state
  if (!company) {
    return (
      <div className="bg-white font-sans min-h-screen flex flex-col">
        <Header user={user} onLoginClick={onLoginClick} onLogout={onLogout} />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Company Not Found</h2>
            <p className="text-gray-600 mb-6">The company you're looking for doesn't exist or has been removed.</p>
            {onBackToCompanies && (
              <button 
                onClick={onBackToCompanies}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Back to Companies
              </button>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate dynamic job listings based on company
  const generateJobsForCompany = (company) => {
    const baseJobs = [
      {
        id: 1,
        title: 'Senior Software Engineer',
        department: 'Engineering',
        location: company.location,
        type: 'Full-time',
        experience: '5+ years',
        salary: '$120,000 - $180,000',
        posted: '2 days ago',
        description: `Join our core engineering team to build scalable solutions for ${company.name}.`
      },
      {
        id: 2,
        title: 'Product Manager',
        department: 'Product',
        location: company.location,
        type: 'Full-time',
        experience: '3+ years',
        salary: '$100,000 - $150,000',
        posted: '1 week ago',
        description: `Lead product strategy for ${company.name} and drive innovation.`
      },
      {
        id: 3,
        title: 'Data Scientist',
        department: 'Data Science',
        location: company.location,
        type: 'Full-time',
        experience: '4+ years',
        salary: '$110,000 - $160,000',
        posted: '3 days ago',
        description: `Develop advanced analytics and machine learning models for ${company.name}.`
      },
      {
        id: 4,
        title: 'UX Designer',
        department: 'Design',
        location: company.location,
        type: 'Full-time',
        experience: '3+ years',
        salary: '$90,000 - $130,000',
        posted: '5 days ago',
        description: `Create intuitive user experiences for ${company.name}'s products.`
      }
    ];

    // Add industry-specific jobs
    if (company.industry === 'Technology') {
      baseJobs.push({
        id: 5,
        title: 'AI/ML Engineer',
        department: 'Engineering',
        location: company.location,
        type: 'Full-time',
        experience: '4+ years',
        salary: '$130,000 - $200,000',
        posted: '1 day ago',
        description: `Build cutting-edge AI solutions for ${company.name}.`
      });
    } else if (company.industry === 'Finance') {
      baseJobs.push({
        id: 5,
        title: 'Financial Analyst',
        department: 'Finance',
        location: company.location,
        type: 'Full-time',
        experience: '3+ years',
        salary: '$80,000 - $120,000',
        posted: '4 days ago',
        description: `Analyze financial data and market trends for ${company.name}.`
      });
    } else if (company.industry === 'Healthcare') {
      baseJobs.push({
        id: 5,
        title: 'Medical Researcher',
        department: 'Research',
        location: company.location,
        type: 'Full-time',
        experience: '5+ years',
        salary: '$100,000 - $150,000',
        posted: '6 days ago',
        description: `Conduct medical research and clinical studies for ${company.name}.`
      });
    } else if (company.industry === 'Marketing') {
      baseJobs.push({
        id: 5,
        title: 'Digital Marketing Specialist',
        department: 'Marketing',
        location: company.location,
        type: 'Full-time',
        experience: '2+ years',
        salary: '$60,000 - $90,000',
        posted: '3 days ago',
        description: `Develop and execute digital marketing campaigns for ${company.name}.`
      });
    }

    return baseJobs.slice(0, company.openJobs || 4);
  };

  const openJobs = generateJobsForCompany(companyData);

  const handleFollowClick = () => {
    setIsFollowing(!isFollowing);
  };

  const handleApplyJob = (jobId) => {
    // In a real app, this would redirect to application form or external job board
    alert(`Application for job ${jobId} at ${companyData.name} would be processed here.`);
  };

  const handleViewAllJobs = () => {
    // In a real app, this would redirect to a jobs page for this company
    alert(`Viewing all ${companyData.openJobs} jobs at ${companyData.name}.`);
  };

  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
        alert('Job removed from saved jobs');
      } else {
        newSaved.add(jobId);
        alert('Job saved successfully');
      }
      return newSaved;
    });
  };

  const handleContactCompany = () => {
    alert(`Contacting ${companyData.name} at ${companyData.website || 'their website'}.`);
  };

  return (
    <div className="bg-white font-sans min-h-screen flex flex-col">
      {/* Header */}
      <Header 
        user={user} 
        onLoginClick={onLoginClick} 
        onLogout={onLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activePage={currentPage}
        setActivePage={setCurrentPage}
      />

      {/* Back Button */}
      <div className="container mx-auto px-4 py-4">
        <button 
          onClick={() => setCurrentPage ? setCurrentPage('companies') : (onBackToCompanies && onBackToCompanies())}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Company Hero Section */}
      <section className="relative">
        {/* Cover Image */}
        <div className="h-64 md:h-80 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
          <img 
            src={companyData.coverImage} 
            alt={`${companyData.name} office`}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Company Info Overlay */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Company Logo */}
              <div className="flex-shrink-0">
                <img 
                  src={companyData.logo} 
                  alt={`${companyData.name} logo`}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg border-4 border-white shadow-md"
                />
              </div>

              {/* Company Details */}
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{companyData.name}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center">
                        <BuildingIcon className="w-4 h-4 mr-1" />
                        {companyData.industry}
                      </div>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-1" />
                        {companyData.location}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-1" />
                        Founded {companyData.founded}
                      </div>
                      <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        {companyData.employees.toLocaleString()} employees
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <StarIcon 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(companyData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {companyData.rating} ({companyData.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={handleFollowClick}
                      className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                        isFollowing 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow Company'}
                    </button>
                    <button 
                      onClick={handleContactCompany}
                      className="px-6 py-2 border border-green-500 text-green-500 rounded-lg font-medium hover:bg-green-50 transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Contact
                    </button>
                    <a 
                      href={companyData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition-all duration-200 flex items-center justify-center"
                    >
                      <GlobeIcon className="w-4 h-4 mr-2" />
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* About Section */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">About {companyData.name}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{companyData.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Company Culture</h3>
                    <ul className="space-y-2">
                      {companyData.culture.map((item, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Benefits & Perks</h3>
                    <ul className="space-y-2">
                      {companyData.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              {/* Open Jobs Section */}
              <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Open Positions</h2>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {companyData.openJobs} jobs
                  </span>
                </div>

                <div className="space-y-4">
                  {openJobs.map((job) => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 mb-1">{job.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                              {job.department}
                            </span>
                            <span className="flex items-center">
                              <MapPinIcon className="w-3 h-3 mr-1" />
                              {job.location}
                            </span>
                            <span>{job.type}</span>
                            <span>{job.experience}</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{job.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-600">{job.salary}</span>
                            <span className="text-xs text-gray-500">Posted {job.posted}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleApplyJob(job.id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-sm flex-1"
                          >
                            Apply Now
                          </button>
                          <button 
                            onClick={() => handleSaveJob(job.id)}
                            className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                              savedJobs.has(job.id) 
                                ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            title={savedJobs.has(job.id) ? 'Remove from saved' : 'Save job'}
                          >
                            {savedJobs.has(job.id) ? '✓ Saved' : 'Save'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-6">
                  <button 
                    onClick={handleViewAllJobs}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    View All {companyData.openJobs} Jobs →
                  </button>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Company Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Founded</span>
                    <span className="font-medium">{companyData.founded}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Employees</span>
                    <span className="font-medium">{companyData.employees.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Industry</span>
                    <span className="font-medium">{companyData.industry}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location</span>
                    <span className="font-medium">{companyData.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Open Jobs</span>
                    <span className="font-medium text-blue-600">{companyData.openJobs}</span>
                  </div>
                </div>
              </div>

              {/* Company Rating */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Company Rating</h3>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{companyData.rating}</div>
                  <div className="flex items-center justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(companyData.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{companyData.reviews.toLocaleString()} reviews</p>
                </div>
              </div>

              {/* Similar Companies */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-4">Similar Companies</h3>
                <div className="space-y-3">
                  {[
                    { name: 'DataFlow Inc.', industry: companyData.industry, jobs: 12, location: companyData.location },
                    { name: 'CloudTech Systems', industry: companyData.industry, jobs: 8, location: companyData.location },
                    { name: 'AI Innovations', industry: companyData.industry, jobs: 15, location: companyData.location }
                  ].map((similarCompany, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      onClick={() => {
                        // In a real app, this would navigate to the similar company
                        alert(`Viewing ${similarCompany.name} profile.`);
                      }}
                    >
                      <div>
                        <h4 className="font-medium text-sm text-gray-900">{similarCompany.name}</h4>
                        <p className="text-xs text-gray-600">{similarCompany.industry} • {similarCompany.location}</p>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">{similarCompany.jobs} jobs</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ViewCompany;
