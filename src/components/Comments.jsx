import React, { useState } from 'react';

const Comments = () => {
  const [comment, setComment] = useState(''); // State for the comment input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      console.log('New comment:', comment); // Replace with actual submission logic
      setComment(''); // Clear the input after submission
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      <div className="space-y-4">
        <div className="flex items-start bg-gray-800 p-4 rounded-lg">
          <img src="/assets/profile-placeholder.jpg" alt="User Profile" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="text-lg font-semibold">John Doe</h4>
            <p className="text-gray-400">Great article! Very helpful tips.</p>
          </div>
        </div>
        <div className="flex items-start bg-gray-800 p-4 rounded-lg">
          <img src="/assets/profile-placeholder.jpg" alt="User Profile" className="w-12 h-12 rounded-full mr-4" />
          <div>
            <h4 className="text-lg font-semibold">Jane Smith</h4>
            <p className="text-gray-400">Thanks for the insights!</p>
          </div>
        </div>
      </div>
      {/* Comment Box */}
      <div className="mt-6">
        <form onSubmit={handleSubmit} className="relative flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 p-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button
            type="submit"
            className="absolute bottom-2 right-2 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold rounded-full shadow-md hover:from-blue-600 hover:to-blue-800 transition-all duration-200 transform hover:scale-105"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;