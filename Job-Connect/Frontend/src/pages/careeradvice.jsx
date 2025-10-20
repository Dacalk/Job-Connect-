import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Small inline Search icon to avoid adding an external dependency
const SearchIcon = ({ className = '', ...rest }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <circle cx="11" cy="11" r="6"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CareerAdvice = ({ user, onLoginClick, onLogout }) => {
  // Mock data for articles
  const featuredArticle = {
    id: 1,
    title: 'Mastering the Art of the Virtual Interview',
    image: 'https://images.unsplash.com/photo-1554200876-56c2f25224fa?q=80&w=1935&auto=format&fit=crop',
    summary: 'In today\'s digital age, virtual interviews have become the norm. Learn how to make a lasting impression from your home office.',
    author: 'Emily Carter',
    date: '2 days ago',
  };

  const latestArticles = [
    { id: 2, title: 'Crafting a Resume That Stands Out', image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1770&auto=format&fit=crop', summary: 'Learn how to create a resume that highlights your skills and experience effectively.' },
    { id: 3, title: 'Salary Negotiation: A Comprehensive Guide', image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=1770&auto=format&fit=crop', summary: 'Get tips on how to confidently negotiate salary and benefits.' },
    { id: 4, title: 'Building Your Personal Brand Online', image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=1771&auto=format&fit=crop', summary: 'Discover how to build and maintain a strong personal brand online.' },
    { id: 5, title: 'The Importance of Networking', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1664&auto=format&fit=crop', summary: 'Explore the benefits of networking and how to expand your professional circle.' },
    { id: 6, title: 'Navigating Career Transitions Successfully', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1771&auto=format&fit=crop', summary: 'Strategies for successfully transitioning between different career paths.' },
    { id: 7, title: 'Understanding Your Workplace Rights', image: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=1770&auto=format&fit=crop', summary: 'Know your rights as an employee and how to protect them.' },
  ];

  // State for search and comments
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'Sophia Bennett', avatar: 'https://i.pravatar.cc/40?img=1', text: 'This article was incredibly helpful! I landed a job thanks to these tips.', date: '2 days ago' },
    { id: 2, user: 'Ethan Walker', avatar: 'https://i.pravatar.cc/40?img=2', text: 'Great insights, especially the part about preparing for technical questions.', date: '1 day ago' },
    { id: 3, user: 'Olivia Hayes', avatar: 'https://i.pravatar.cc/40?img=3', text: 'I agree with Ethan, the technical question prep is key!', date: '12 hours ago' },
  ]);
  const [newComment, setNewComment] = useState('');

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() && user) {
      const comment = {
        id: Date.now(),
        user: user.name || 'Anonymous',
        avatar: user.avatar || 'https://i.pravatar.cc/40?u=a042581f4e29026704d',
        text: newComment,
        date: 'just now',
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  // Filter articles based on search term
  const filteredArticles = latestArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-50 text-gray-900 font-sans min-h-screen flex flex-col">
      <Header user={user} onLoginClick={onLoginClick} onLogout={onLogout} />
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Career Advice</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">Expert insights to help you navigate your career journey.</p>
            <div className="relative max-w-xl mx-auto">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search articles (e.g., 'resume', 'salary')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-full py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Featured Article */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Featured Article</h2>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:shadow-blue-200/20 hover:-translate-y-1 cursor-pointer">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full md:w-1/3 h-64 md:h-auto object-cover"
                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }} // Fallback image
              />
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="text-xl lg:text-2xl font-semibold mb-3">{featuredArticle.title}</h3>
                <p className="text-gray-600 mb-4">{featuredArticle.summary}</p>
                <p className="text-gray-500 text-sm">By {featuredArticle.author} · {featuredArticle.date}</p>
              </div>
            </div>
          </div>

          {/* Latest Articles */}
          <div className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest Articles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-200/20 cursor-pointer">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200'; }} // Fallback image
                  />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                    <p className="text-gray-600 text-sm">{article.summary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6">Comments</h2>
            <div className="bg-white p-4 sm:p-6 rounded-lg mb-8 shadow-lg">
              {user ? (
                <form onSubmit={handleCommentSubmit} className="flex items-start gap-4">
                  <img src={user.avatar || 'https://i.pravatar.cc/40?u=current_user'} alt="Your avatar" className="w-10 h-10 rounded-full" />
                  <div className="flex-grow flex gap-4">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Join the discussion..."
                      className="flex-1 bg-gray-50 border border-gray-300 rounded-md py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-md transform transition-all duration-300 hover:bg-blue-500 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-blue-500"
                    >
                      Post
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-gray-600 text-center">Please <button onClick={onLoginClick} className="text-blue-600 font-semibold hover:underline">log in</button> to comment.</p>
              )}
            </div>
            <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-4">
                  <img
                    src={comment.avatar}
                    alt={comment.user}
                    className="w-10 h-10 rounded-full"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40'; }} // Fallback avatar
                  />
                  <div className="bg-white rounded-lg p-4 flex-1 shadow-sm">
                    <div className="flex items-baseline gap-3">
                      <p className="text-sm font-semibold text-gray-900">{comment.user}</p>
                      <p className="text-gray-500 text-xs">{comment.date}</p>
                    </div>
                    <p className="text-gray-700 text-sm mt-2">{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default CareerAdvice;