import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- All Icon Components ---
const BriefcaseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const CompassIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon>
  </svg>
);

const BarChartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const CodeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const DollarSignIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const MegaphoneIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 11v5a2 2 0 0 0 2 2h2l7-7-7-7H5a2 2 0 0 0-2 2Z"></path>
    <path d="M11.6 16.8a3 3 0 0 1-3.4 0"></path>
    <path d="M15.2 20.4a7 7 0 0 1-7-7"></path>
    <path d="M18.8 24a11 11 0 0 1-10.5-10.5"></path>
  </svg>
);

const HeartPulseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
    <path d="M3.22 12H9.5l.7-1 2.1 4.4 3.2-7.2-1.2 2.4H20.8"></path>
  </svg>
);

const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

const WrenchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

// Additional icons
const RocketIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05-.64-.75-2.2-1-3.05-.05z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.89 12.89 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  </svg>
);

const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
  </svg>
);

const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const MapPinIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const BuildingIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <line x1="9" y1="4" x2="9" y2="20"></line>
    <line x1="15" y1="4" x2="15" y2="20"></line>
  </svg>
);

// Home Page Component
const HomePage = ({ companyLogos }) => (
  <>
    {/* Hero Section */}
    <section className="relative bg-cover bg-center h-screen flex items-center justify-center" style={{ backgroundImage: `url('/Office.jpg')` }}>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Find your dream job</h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8">
          Explore thousands of job openings at leading companies. Your next career move starts here.
        </p>
        <div className="flex justify-center max-w-xl mx-auto shadow-sm">
          <input
            type="text"
            placeholder="Search for jobs or companies"
            className="w-full px-5 py-3 rounded-l-full border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800"
          />
          <button className="bg-blue-500 text-white px-8 py-3 rounded-r-full font-semibold hover:bg-blue-600 transition-colors">
            Search
          </button>
        </div>
      </div>
    </section>

    {/* Why Job Connect? Section */}
    <section className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Job Connect?</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mt-4 text-lg">
          Empowering Your Career Journey. Job Connect is designed to help you succeed, from finding the perfect role to continuous professional development.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <BriefcaseIcon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Vast Job Market</h3>
          <p className="text-gray-600 text-center">Browse thousands of job and internship openings from various companies and locations.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <CompassIcon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Expert Career Guidance</h3>
          <p className="text-gray-600 text-center">Access expert career advice, resources, and tools to advance your career prospects.</p>
        </div>
        <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <BarChartIcon className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">Data-Driven Insights</h3>
          <p className="text-gray-600 text-center">Get valuable insights into salary trends, industry reports, and company growth areas.</p>
        </div>
      </div>
    </section>

    {/* Companies We Work With Section */}
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">Companies We Work With</h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">Trusted by leading companies worldwide</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companyLogos.map((logoSrc, i) => (
            <div key={i} className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white rounded-lg border border-slate-200 transition-all duration-300 hover:shadow-md hover:-translate-y-1 p-4">
              <img
                src={logoSrc}
                alt={`Company Logo ${i + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/300x300/f1f5f9/a3a3a3?text=LOGO';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Career Advice Section */}
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Featured Career Advice</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554224155-1696413565d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Crafting a Winning Resume"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Crafting a Winning Resume</h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn how to create a resume that stands out to employers and highlights your key skills and experiences.
            </p>
            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">Read More →</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1573496130407-57329f01f769?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Mastering the Art of the Interview"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Mastering the Art of the Interview</h3>
            <p className="text-gray-600 text-sm mb-4">
              Prepare for your next interview with our expert guide on common questions and effective communication strategies.
            </p>
            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">Read More →</button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md overflow-hidden border border-slate-200 group transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div className="overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Networking for Career Success"
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 text-gray-800">Networking for Career Success</h3>
            <p className="text-gray-600 text-sm mb-4">
              Build and leverage your professional network to unlock new opportunities and accelerate your career.
            </p>
            <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">Read More →</button>
          </div>
        </div>
      </div>
    </section>

    {/* Browse by Categories Section */}
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Browse by Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <CodeIcon className="w-10 h-10 mb-3 text-blue-500" />
            <p className="text-md font-semibold text-gray-700">Technology</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <DollarSignIcon className="w-10 h-10 mb-3 text-green-500" />
            <p className="text-md font-semibold text-gray-700">Finance</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <MegaphoneIcon className="w-10 h-10 mb-3 text-rose-500" />
            <p className="text-md font-semibold text-gray-700">Marketing</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <HeartPulseIcon className="w-10 h-10 mb-3 text-red-500" />
            <p className="text-md font-semibold text-gray-700">Healthcare</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <BookOpenIcon className="w-10 h-10 mb-3 text-amber-500" />
            <p className="text-md font-semibold text-gray-700">Education</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center flex flex-col items-center justify-center border border-slate-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
            <WrenchIcon className="w-10 h-10 mb-3 text-slate-500" />
            <p className="text-md font-semibold text-gray-700">Engineering</p>
          </div>
        </div>
      </div>
    </section>
  </>
);

// Companies Page Component
const CompaniesPage = ({ onViewCompany }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [industryFilter, setIndustryFilter] = useState('');

  const allCompanies = [
    { 
      name: 'TechNova Solutions', 
      industry: 'Technology', 
      location: 'San Francisco, CA', 
      logo: 'https://placehold.co/100x100/e2e8f0/64748b?text=TN',
      coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Pioneering AI and machine learning solutions for enterprises worldwide. We are committed to transforming businesses through innovative technology and cutting-edge research.',
      jobs: 45,
      employees: 1200,
      founded: 2015,
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
    },
    { 
      name: 'FinSecure Bank', 
      industry: 'Finance', 
      location: 'New York, NY', 
      logo: 'https://placehold.co/100x100/e2e8f0/64748b?text=FS',
      coverImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Leading digital banking and fintech innovation. We revolutionize financial services through cutting-edge technology and customer-centric solutions.',
      jobs: 23,
      employees: 850,
      founded: 2008,
      website: 'https://finsecure.com',
      rating: 4.6,
      reviews: 892,
      openJobs: 23,
      benefits: [
        'Comprehensive Health Coverage',
        'Retirement Planning',
        'Stock Options',
        'Flexible Schedule',
        'Learning Budget',
        'Wellness Programs'
      ],
      culture: [
        'Customer-first approach',
        'Innovation and agility',
        'Professional growth focus',
        'Inclusive workplace',
        'Data-driven decisions',
        'Team collaboration'
      ]
    },
    { 
      name: 'HealthPlus Medical', 
      industry: 'Healthcare', 
      location: 'Boston, MA', 
      logo: 'https://placehold.co/100x100/e2e8f0/64748b?text=HP',
      coverImage: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Advanced healthcare technology and telemedicine solutions. We are dedicated to improving patient outcomes through innovative medical technology.',
      jobs: 18,
      employees: 650,
      founded: 2012,
      website: 'https://healthplus.com',
      rating: 4.7,
      reviews: 634,
      openJobs: 18,
      benefits: [
        'Medical & Dental',
        'Mental Health Support',
        'Flexible PTO',
        'Continuing Education',
        'Research Opportunities',
        'Wellness Programs'
      ],
      culture: [
        'Patient-centered care',
        'Research and innovation',
        'Professional development',
        'Work-life balance',
        'Collaborative environment',
        'Ethical standards'
      ]
    },
    { 
      name: 'MarketPro Agency', 
      industry: 'Marketing', 
      location: 'Los Angeles, CA', 
      logo: 'https://placehold.co/100x100/e2e8f0/64748b?text=MP',
      coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      description: 'Digital marketing and brand strategy experts. We help businesses grow through creative campaigns and data-driven marketing strategies.',
      jobs: 12,
      employees: 320,
      founded: 2010,
      website: 'https://marketpro.com',
      rating: 4.5,
      reviews: 456,
      openJobs: 12,
      benefits: [
        'Creative Freedom',
        'Health Benefits',
        'Flexible Work',
        'Learning Stipend',
        'Team Events',
        'Performance Bonuses'
      ],
      culture: [
        'Creative and innovative',
        'Client-focused approach',
        'Team collaboration',
        'Continuous learning',
        'Results-driven',
        'Fun work environment'
      ]
    },
  ];

  const filteredCompanies = allCompanies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (locationFilter === '' || company.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
    (industryFilter === '' || company.industry === industryFilter)
  );

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Top Companies</h1>
          <p className="text-xl text-blue-100">Explore innovative companies hiring now</p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white py-8 sticky top-16 shadow-sm z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={industryFilter}
              onChange={(e) => setIndustryFilter(e.target.value)}
              className="flex-1 px-4 py-3 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Industries</option>
              {[...new Set(allCompanies.map(c => c.industry))].map(ind => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredCompanies.map(company => (
            <div key={company.name} className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-start mb-4">
                <img src={company.logo} alt={company.name} className="w-16 h-16 rounded-lg mr-4 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{company.name}</h3>
                  <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">{company.industry}</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {company.location}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{company.jobs} Open Jobs</p>
                  <p className="text-xs text-gray-500">{company.employees}+ Employees</p>
                </div>
              </div>
              <button 
                onClick={() => onViewCompany && onViewCompany(company)}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                View Company
              </button>
            </div>
          ))}
        </div>
        {filteredCompanies.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No companies found matching your criteria.</p>
          </div>
        )}
      </section>
    </>
  );
};

// Career Advice Page Component
const CareerAdvicePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const articles = [
    { 
      id: 1, 
      title: 'Mastering Virtual Interviews: Top Tips for Success', 
      category: 'Interview Prep',
      summary: 'Learn proven strategies for acing virtual interviews in the digital age',
      image: '/pm-collaborating-with-team.jpg',
      date: '2024-01-15',
      readTime: '5 min'
    },
    { 
      id: 2, 
      title: 'Resume Writing Guide: Stand Out to Recruiters', 
      category: 'Resume Tips',
      summary: 'Create a compelling resume that gets you noticed by hiring managers',
      image: '/Office.jpg',
      date: '2024-01-10',
      readTime: '7 min'
    },
    { 
      id: 3, 
      title: 'Networking Strategies for Career Growth', 
      category: 'Networking',
      summary: 'Build meaningful professional relationships that advance your career',
      image: '/pm-collaborating-with-team.jpg',
      date: '2024-01-05',
      readTime: '6 min'
    },
    { 
      id: 4, 
      title: 'Salary Negotiation: Get What You Deserve', 
      category: 'Career Development',
      summary: 'Master the art of negotiating your salary and benefits package',
      image: '/Office.jpg',
      date: '2023-12-28',
      readTime: '8 min'
    },
  ];

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === '' || article.category === categoryFilter)
  );

  return (
    <section className="container mx-auto px-4 py-16">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Career Advice Hub</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Expert guidance to advance your professional journey</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {[...new Set(articles.map(a => a.category))].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map(article => (
          <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="overflow-hidden">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mb-2">
                {article.category}
              </span>
              <h3 className="font-bold text-lg mb-3 line-clamp-2">{article.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">{article.summary}</p>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>{article.date}</span>
                <span>{article.readTime} read</span>
              </div>
              <button className="text-blue-500 hover:text-blue-600 font-medium">Read Article →</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// About Page Component
const AboutPage = () => (
  <div>
    {/* Hero Section */}
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 py-20 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">About Job Connect</h1>
        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
          Connecting exceptional talent with extraordinary opportunities
        </p>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <div className="flex items-center mb-6">
            <RocketIcon className="w-12 h-12 text-blue-500 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            To empower individuals in their career journeys by connecting them with meaningful opportunities 
            at innovative companies. We believe in the power of the right match between talent and opportunity.
          </p>
          <div className="flex items-center mb-6">
            <EyeIcon className="w-12 h-12 text-blue-500 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            To be the world's leading platform for career advancement, fostering professional growth 
            and creating successful partnerships between talent and organizations.
          </p>
        </div>
        <div className="relative">
          <img 
            src="/pm-collaborating-with-team.jpg" 
            alt="Our Team" 
            className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-8 text-center mb-20">
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">10K+</div>
          <div className="text-gray-600 font-medium">Jobs Posted</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
          <div className="text-gray-600 font-medium">Companies</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">100K+</div>
          <div className="text-gray-600 font-medium">Job Seekers</div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
          <div className="text-gray-600 font-medium">Success Rate</div>
        </div>
      </div>

      {/* Team Values */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="text-center p-6 bg-slate-50 rounded-xl">
          <UsersIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Talent First</h3>
          <p className="text-gray-600">We prioritize connecting exceptional talent with the right opportunities</p>
        </div>
        <div className="text-center p-6 bg-slate-50 rounded-xl">
          <BuildingIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Employer Success</h3>
          <p className="text-gray-600">We help companies build high-performing teams with top talent</p>
        </div>
        <div className="text-center p-6 bg-slate-50 rounded-xl">
          <CompassIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Guidance</h3>
          <p className="text-gray-600">Comprehensive resources to guide professionals throughout their careers</p>
        </div>
      </div>
    </section>
  </div>
);

// Main Home Component
const Home = ({ user, onLoginClick, onLogout, onDashboardClick, onViewCompany, currentPage: propCurrentPage, setCurrentPage: propSetCurrentPage }) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState('home');
  
  // Use props if provided, otherwise use internal state
  const currentPage = propCurrentPage || internalCurrentPage;
  const setCurrentPage = propSetCurrentPage || setInternalCurrentPage;
  const companyLogos = ['/logo-1.jpg', '/logo-2.jpg', '/logo-3.jpg', '/logo-4.jpg', '/logo-5.jpg', '/logo-6.jpg'];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage companyLogos={companyLogos} />;
      case 'companies':
        return <CompaniesPage onViewCompany={onViewCompany} />;
      case 'career-advice':
        return <CareerAdvicePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage companyLogos={companyLogos} />;
    }
  };

  return (
    <div className="bg-white font-sans min-h-screen">
      <Header 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        activePage={currentPage}
        setActivePage={setCurrentPage}
        user={user} 
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onDashboardClick={onDashboardClick}
        headerType="default"
      />
      <main>
        {renderPage()}
      </main>
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Home;