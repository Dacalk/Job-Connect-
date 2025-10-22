import React from 'react';
import JobCard from './JobCard';

const JobList = ({ jobs, onJobSelect }) => {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                Find Your Next Opportunity
            </h1>
            <div className="space-y-4">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} onSelect={() => onJobSelect(job)} />
                ))}
            </div>
        </div>
    );
};

export default JobList;