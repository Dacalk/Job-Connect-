import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import img1 from '../assets/pm-collaborating-with-team.jpg';

// --- Icon Components ---
const RocketIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.3.05-3.05-.64-.75-2.2-1-3.05-.05z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.89 12.89 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);
const EyeIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const About = ({ user, onLoginClick, onLogout }) => {
  const teamMembers = [
    { name: 'Alex Johnson', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Maria Garcia', role: 'Chief Technology Officer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'James Smith', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Patricia Williams', role: 'Lead UX Designer', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Robert Brown', role: 'Head of Marketing', image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
    { name: 'Linda Davis', role: 'Senior Recruiter', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80' },
  ];

  return (
    <div className="bg-white font-sans min-h-screen flex flex-col">
      {/* Header */}
      <Header user={user} onLoginClick={onLoginClick} onLogout={onLogout} />

      {/* Hero Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 group relative">
            About Job Connect
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-1/2"></span>
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We are a passionate team dedicated to bridging the gap between talented professionals and innovative companies.
          </p>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="group">
            <img
              src={img1}
              alt="Team collaborating"
              className="rounded-lg shadow-md w-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-3 group">
                <RocketIcon className="w-8 h-8 text-blue-500 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <h2 className="text-3xl font-bold text-gray-900 relative">
                  Our Mission
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Our mission is to empower individuals to achieve their career aspirations and to help organizations build thriving, successful teams. We believe that the right job can transform a person's life and that the right person can transform a business.
              </p>
            </div>
            <div>
              <div className="flex items-center mb-3 group">
                <EyeIcon className="w-8 h-8 text-blue-500 mr-3 group-hover:scale-110 transition-transform duration-200" />
                <h2 className="text-3xl font-bold text-gray-900 relative">
                  Our Vision
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                </h2>
              </div>
              <p className="text-gray-600 leading-relaxed">
                We envision a world where every professional has access to the opportunities and resources they need to grow, and every company can effortlessly find the talent that aligns with their goals and culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 group relative">
            Meet Our Team
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-1/2"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">The dedicated individuals who make it all happen.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group">
                <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mt-4 group-hover:text-blue-500 transition-colors duration-200">{member.name}</h3>
                <p className="text-blue-500 font-medium group-hover:text-blue-600 transition-colors duration-200">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <UsersIcon className="w-10 h-10 text-blue-500 mx-auto mb-4 group-hover:scale-110 transition-transform duration-200" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4 group relative">
          Join Our Community
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-1/2"></span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Whether you're looking for your next challenge or searching for the perfect candidate, your journey starts with Job Connect.
        </p>
        <button className="bg-blue-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-600 hover:scale-105 transition-all duration-200 shadow-sm hover:shadow-lg">
          Get Started
        </button>
      </section>

      {/* Footer */}
      <Footer user={user} onLoginClick={onLoginClick} onLogout={onLogout} />
    </div>
  );
};

export default About;