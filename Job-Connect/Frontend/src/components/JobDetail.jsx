import React from 'react';

const JobDetail = ({ job, onBack }) => {
    return (
        <div>
            <button onClick={onBack} className="text-blue-500 font-semibold mb-6 hover:underline">
                &larr; Back to Job List
            </button>
            
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Content */}
                <main className="flex-2 bg-white border border-gray-200 rounded-lg p-6 lg:p-8 w-full">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-lg text-gray-600 mt-1">{job.company} • {job.location}</p>
                        <div className="flex items-center gap-3 text-gray-500 mt-4 text-sm">
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.salary}</span>
                            <span>•</span>
                            <span>Posted {job.posted}</span>
                        </div>
                    </div>
                    
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Job Description</h2>
                        <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>
                        
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Responsibilities:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
                            {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>

                        <h3 className="text-xl font-semibold text-gray-800 mb-3">Requirements:</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-700">
                             {job.requirements.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                </main>

                {/* Sidebar */}
                <aside className="flex-1 lg:max-w-sm w-full">
                    <div className="space-y-6">
                        <div className="bg-white border border-gray-200 rounded-lg p-5">
                            <h3 className="text-lg font-semibold border-b pb-2 mb-3">Company Info</h3>
                            <div className="space-y-1 text-gray-600">
                                <p className="font-bold text-gray-800">{job.company}</p>
                                <p>{job.location}</p>
                                <p>Technology</p>
                                <p>1000+ employees</p>
                                <a href="#" className="text-blue-500 font-semibold hover:underline">Visit Company Website</a>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-lg p-5">
                            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.skills.map(skill => (
                                    <span key={skill} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{skill}</span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
                            <h3 className="text-lg font-semibold mb-2">Want to apply for this job?</h3>
                            <p className="text-gray-600 text-sm mb-4">Sign in or create an account to apply for this job and thousands more.</p>
                            <div className="space-y-2">
                                <a href="#" className="block w-full bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition hover:bg-blue-600">Sign In</a>
                                <a href="#" className="block w-full bg-white text-gray-800 font-semibold py-2.5 rounded-lg border border-gray-300 transition hover:bg-gray-100">Create Account</a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default JobDetail;