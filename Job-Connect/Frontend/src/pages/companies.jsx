import React, { useState, useMemo, useEffect } from 'react';
import apiService from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

// --- Icon Components ---
const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const MapPinIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const BuildingIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><line x1="9" y1="4" x2="9" y2="20"></line><line x1="15" y1="4" x2="15" y2="20"></line><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line></svg>
);

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch companies from backend
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                setLoading(true);
                const response = await apiService.getCompanies();
                setCompanies(response.companies || []);
            } catch (error) {
                console.error('Error fetching companies:', error);
                setError('Failed to load companies. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCompanies();
    }, []);

    // --- State for Filters ---
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [industryFilter, setIndustryFilter] = useState('');

    // --- Clear Filters ---
    const clearFilters = () => {
        setSearchTerm('');
        setLocationFilter('');
        setIndustryFilter('');
    };

    const filteredCompanies = useMemo(() => {
        if (loading || error) return [];
        return companies.filter(company => {
            return (
                company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (locationFilter === '' || company.location.toLowerCase().includes(locationFilter.toLowerCase())) &&
                (industryFilter === '' || company.industry === industryFilter)
            );
        });
    }, [companies, searchTerm, locationFilter, industryFilter, loading, error]);

    const uniqueIndustries = [...new Set(companies.map(c => c.industry))];

    if (loading) {
        return (
            <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading companies...</p>
                    </div>
                </main>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-red-600 mb-4">{error}</p>
                        <button 
                            onClick={() => window.location.reload()} 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Try Again
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
                {/* Header Section */}
                <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-16">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Discover Top Companies</h1>
                        <p className="text-base md:text-lg text-gray-100 max-w-xl mx-auto">
                            Explore innovative companies and find the perfect workplace for your skills and passion.
                        </p>
                    </div>
                </section>

                {/* Filters Section */}
                <section className="bg-white py-6 sticky top-0 z-40 shadow-md">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row gap-4 md:items-center">
                            <div className="relative flex-1">
                                <SearchIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search companies..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                            <div className="relative flex-1">
                                <MapPinIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Location (e.g., New York)"
                                    value={locationFilter}
                                    onChange={(e) => setLocationFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                />
                            </div>
                            <div className="relative flex-1">
                                <BuildingIcon className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                <select
                                    value={industryFilter}
                                    onChange={(e) => setIndustryFilter(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition appearance-none"
                                >
                                    <option value="">All Industries</option>
                                    {uniqueIndustries.map(industry => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </section>

                {/* Companies Grid */}
                <section className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredCompanies.length > 0 ? (
                            filteredCompanies.map((company) => (
                                <div key={company.name} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
                                    <div className="p-5 flex-grow">
                                        <div className="flex items-start mb-3">
                                            <img src={company.logo} alt={`${company.name} logo`} className="w-12 h-12 rounded-md mr-3" />
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{company.name}</h3>
                                                <p className="text-blue-600 text-sm font-medium">{company.industry}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm mb-3">{company.description}</p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MapPinIcon className="w-4 h-4 mr-2" />
                                            <span>{company.location}</span>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-5 py-3 border-t border-gray-200 rounded-b-lg">
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-800 transition-colors">
                                            View {company.jobs} Open Jobs &rarr;
                                        </a>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-600 text-center col-span-full">No companies found matching your criteria.</p>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default CompaniesPage;