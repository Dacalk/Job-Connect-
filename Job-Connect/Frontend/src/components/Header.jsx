import React, { useState, useEffect, useRef } from "react";
import SimpleNotificationPopup from './SimpleNotificationPopup';

const Header = ({ 
  user, 
  onLoginClick,
  onLogout, 
  onDashboardClick,
  activePage, 
  setActivePage, 
  headerType = "default",
  currentPage,
  setCurrentPage 
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Notification state
  const [notifications, setNotifications] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem('notifications');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error loading notifications:', error);
      }
    }
  }, []);

  // Check for job deadline notifications
  useEffect(() => {
    const checkDeadlineNotifications = async () => {
      if (!user) return;

      try {
        // Fetch user's jobs to check deadlines
        const response = await fetch('/api/jobs/my-jobs', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          const jobs = data.jobs || [];
          
          jobs.forEach(job => {
            if (job.applicationDeadline) {
              const deadline = new Date(job.applicationDeadline);
              const now = new Date();
              const daysUntilDeadline = Math.ceil((deadline - now) / (1000 * 60 * 60 * 24));
              
              // Create notification if deadline is approaching (within 3 days)
              if (daysUntilDeadline <= 3 && daysUntilDeadline > 0) {
                const existingNotification = notifications.find(n => 
                  n.type === 'deadline' && n.jobId === job._id
                );
                
                if (!existingNotification) {
                  addNotification({
                    type: 'deadline',
                    jobId: job._id,
                    title: 'Application Deadline Approaching',
                    message: `Your job posting "${job.title}" expires in ${daysUntilDeadline} day${daysUntilDeadline > 1 ? 's' : ''}`,
                    priority: daysUntilDeadline === 1 ? 'high' : 'medium',
                    action: 'viewJob',
                    jobTitle: job.title
                  });
                }
              }
              
              // Create notification if deadline has passed
              if (daysUntilDeadline < 0) {
                const existingNotification = notifications.find(n => 
                  n.type === 'deadline_passed' && n.jobId === job._id
                );
                
                if (!existingNotification) {
                  addNotification({
                    type: 'deadline_passed',
                    jobId: job._id,
                    title: 'Application Deadline Passed',
                    message: `The application deadline for "${job.title}" has passed`,
                    priority: 'high',
                    action: 'viewJob',
                    jobTitle: job.title
                  });
                }
              }
            }
          });
        }
      } catch (error) {
        console.error('Error checking deadline notifications:', error);
      }
    };

    // Check deadlines every 5 minutes
    const interval = setInterval(checkDeadlineNotifications, 5 * 60 * 1000);
    
    // Initial check
    checkDeadlineNotifications();

    return () => clearInterval(interval);
  }, [user, notifications]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Calculate unread count
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Add a new notification
  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  // Toggle popup
  const togglePopup = () => {
    setIsPopupOpen(prev => !prev);
  };

  // Hide popup
  const hidePopup = () => {
    setIsPopupOpen(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation links configuration
  const getNavLinks = () => {
    if (headerType === "jobSeekerDashboard") {
      return [
        { href: "/", label: "home" },
        { href: "/jobSeekerDashboard", label: "dashboard" },
        { href: "/companies", label: "companies" },
        { href: "/career-advice", label: "career-advice" },
        { href: "/profile", label: "profile" },
      ];
    } else if (headerType === "employerDashboard" || (user && user.role === "Employer")) {
      // Employer dashboard specific links
      return [
        { href: "/overview", label: "overview" },
        { href: "/jobs", label: "jobs" },
        { href: "/applications", label: "applications" },
      ];
    } else if (headerType === "adminDashboard") {
      // Admin dashboard specific links
      return [
        { href: "/", label: "home" },
        { href: "/adminDashboard", label: "dashboard" },
        { href: "/companies", label: "companies" },
        { href: "/career-advice", label: "career-advice" },
        { href: "/profile", label: "profile" },
      ];
    } else {
      // Default home page links
      return [
        { href: "/", label: "home" },
        { href: "/about", label: "about" },
        { href: "/companies", label: "companies" },
        { href: "/career-advice", label: "career-advice" },
      ];
    }
  };

  const navLinks = getNavLinks();

  // Unified navigation handler that works with both prop sets
  const handleNavClick = (pageLabel) => {
    // Map navigation labels to actual page names based on header type
    let actualPageName = pageLabel;
    
    if (headerType === "jobSeekerDashboard") {
      switch (pageLabel) {
        case "dashboard":
          actualPageName = "jobSeekerDashboard";
          break;
        case "home":
          actualPageName = "home";
          break;
        case "companies":
          actualPageName = "companies";
          break;
        case "career-advice":
          actualPageName = "career-advice";
          break;
        case "profile":
          actualPageName = "profile";
          break;
        default:
          actualPageName = pageLabel;
      }
    } else if (headerType === "employerDashboard") {
      switch (pageLabel) {
        case "overview":
          // Navigate to employer dashboard with overview tab
          actualPageName = "employerDashboard";
          // Set the active tab to overview
          if (setActivePage) {
            setActivePage("overview");
          }
          break;
        case "jobs":
          // Navigate to employer dashboard with jobs tab
          actualPageName = "employerDashboard";
          // Set the active tab to jobs
          if (setActivePage) {
            setActivePage("jobs");
          }
          break;
        case "applications":
          // Navigate to employer dashboard with applications tab
          actualPageName = "employerDashboard";
          // Set the active tab to applications
          if (setActivePage) {
            setActivePage("applications");
          }
          break;
        default:
          actualPageName = pageLabel;
      }
    } else if (headerType === "adminDashboard") {
      switch (pageLabel) {
        case "dashboard":
          actualPageName = "adminDashboard";
          break;
        case "home":
          actualPageName = "home";
          break;
        case "companies":
          actualPageName = "companies";
          break;
        case "career-advice":
          actualPageName = "career-advice";
          break;
        case "profile":
          actualPageName = "profile";
          break;
        default:
          actualPageName = pageLabel;
      }
    }
    
    // Use setCurrentPage for main navigation
    if (setCurrentPage) {
      setCurrentPage(actualPageName);
    }
    
    // Close mobile menu if open
    setMobileMenuOpen(false);
  };

  // Get current active page from props
  const getActivePage = () => {
    return activePage || currentPage || "home";
  };

  const activePageState = getActivePage();

  // Handle profile navigation from dropdown
  const handleProfileClick = () => {
    if (setCurrentPage) {
      setCurrentPage("profile");
    }
    setDropdownOpen(false);
  };

  // Handle dashboard navigation from dropdown
  const handleDashboardClick = () => {
    if (headerType === "employerDashboard") {
      // For employer dashboard, switch to overview tab
      if (setActivePage) {
        setActivePage("overview");
      }
    } else if (onDashboardClick) {
      onDashboardClick();
    } else {
      // Fallback to local navigation if prop not provided
      if (user && user.role === 'admin') {
        setCurrentPage('adminDashboard');
      } else if (user && user.role === 'employer') {
        setCurrentPage('employerDashboard');
      } else if (user && user.role === 'job_seeker') {
        setCurrentPage('jobSeekerDashboard');
      }
    }
    setDropdownOpen(false);
  };

  // Handle notification click
  const handleNotificationClick = () => {
    togglePopup();
  };

  // Handle logout
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div 
              onClick={() => handleNavClick('home')}
              className="cursor-pointer flex items-center space-x-2 hover:opacity-80 transition-all duration-200 hover:scale-105"
            >
              <img src="/Logo.png" alt="Job Connect Logo" className="h-10 w-48 object-contain" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activePageState === link.label;
              const displayLabel = link.label.charAt(0).toUpperCase() + link.label.slice(1).replace(/-/g, ' ');
              
              return (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.label)}
                  className={`font-medium transition-all duration-200 py-1 relative group ${
                    isActive
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300"
                  }`}
                >
                  {displayLabel}
                  {!isActive && (
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 focus:outline-none transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700 hidden sm:block">
                  Welcome, {user.username || user.name}!
                </span>
                

                {/* Notifications Icon */}
                <button
                  onClick={handleNotificationClick}
                  className="relative text-gray-500 hover:text-blue-600 transition transform hover:scale-105"
                  title="Notifications"
                >
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
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex items-center justify-center rounded-full h-5 w-5 bg-red-500 text-white text-xs font-bold">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    </span>
                  )}
                </button>

                {/* User Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="focus:outline-none relative group"
                  >
                    <div className="h-10 w-10 rounded-full border-2 border-gray-200 hover:border-blue-500 transition-all duration-200 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105">
                      {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </button>
                  
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl z-50 border border-gray-200 py-2 overflow-hidden">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user.username || 'User'}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role?.replace('_', ' ') || 'User'}</p>
                      </div>
                      <button
                        onClick={handleDashboardClick}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
                        </svg>
                        Overview
                      </button>
                      <button
                        onClick={handleProfileClick}
                        className="flex items-center w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                      >
                        <svg className="w-4 h-4 mr-3 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </button>
                      <div className="border-t border-gray-100 mt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                        >
                          <svg className="w-4 h-4 mr-3 text-red-400 group-hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Search Bar for Guests */}
                <div className="hidden md:block relative">
                  <input
                    type="search"
                    placeholder="Search jobs or companies..."
                    className="pl-10 pr-4 py-2 rounded-md border border-blue-200 bg-white text-gray-800 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <svg
                    className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                
                <button
                  onClick={onLoginClick}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-sm"
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu - Popup Style */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-auto transform transition-all duration-300 ease-out scale-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Menu</h3>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                const isActive = activePageState === link.label;
                const displayLabel = link.label.charAt(0).toUpperCase() + link.label.slice(1).replace(/-/g, ' ');
                
                return (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.label)}
                    className={`w-full text-left py-3 px-4 rounded-xl transition-all duration-200 flex items-center space-x-3 ${
                      isActive
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-lg transform scale-105"
                        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow-md"
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white' : 'bg-blue-500'}`}></div>
                    <span>{displayLabel}</span>
                    {isActive && (
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
              
              {/* Mobile Auth Section */}
              {user ? (
                <>
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <div className="flex items-center space-x-3 mb-4 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                        {user.username ? user.username.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{user.username || 'User'}</p>
                        <p className="text-xs text-gray-500 capitalize">{user.role?.replace('_', ' ') || 'User'}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleDashboardClick}
                      className="w-full text-left py-3 px-4 rounded-xl bg-blue-50 text-blue-600 font-semibold hover:bg-blue-100 transition-all duration-200 flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      </svg>
                      <span>Overview</span>
                    </button>
                    <button
                      onClick={handleProfileClick}
                      className="w-full text-left py-3 px-4 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left py-3 px-4 rounded-xl bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition-all duration-200 flex items-center space-x-3"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <button
                    onClick={onLoginClick}
                    className="w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Get Started - Login
                  </button>
                </div>
              )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Notification Popup */}
      <SimpleNotificationPopup
        isOpen={isPopupOpen}
        onClose={hidePopup}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onMarkAllAsRead={markAllAsRead}
      />
    </header>
  );
};

export default Header;