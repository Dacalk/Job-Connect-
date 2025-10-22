import React from 'react';

const JobCard = ({ job, onSelect }) => {
    return (
        <div 
            onClick={onSelect}
            className="flex flex-col md:flex-row items-center gap-5 bg-white border border-gray-200 rounded-lg p-5 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
            <div className={`flex-shrink-0 w-16 h-16 rounded-lg border border-gray-200 flex items-center justify-center ${job.logoBg}`}>
                <span className="text-2xl font-bold text-gray-600">{job.logo}</span>
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.company} - {job.location}</p>
            </div>
            <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition hover:bg-blue-600 whitespace-nowrap mt-4 md:mt-0">
                View Details
            </button>
        </div>
    );
};

export default JobCard;