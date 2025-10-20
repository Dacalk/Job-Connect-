import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Article = ({ 
  user, 
  onLoginClick, 
  onLogout, 
  onDashboardClick,
  currentPage, 
  setCurrentPage 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Dummy articles data
  const articles = [
    {
      id: 1,
      title: "10 Essential Skills for Remote Work Success",
      excerpt: "Master the key competencies needed to thrive in remote work environments and build a successful career from anywhere.",
      content: "Remote work has become the new norm, and with it comes the need for specific skills that ensure success in virtual environments. From time management to digital communication, here are the essential skills every remote worker needs to master...",
      author: "Sarah Johnson",
      authorRole: "Career Coach",
      authorAvatar: "https://i.pravatar.cc/150?u=sarah",
      publishDate: "2024-01-15",
      readTime: "5 min read",
      category: "remote-work",
      tags: ["remote work", "productivity", "career development"],
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "How to Write a Resume That Gets Noticed",
      excerpt: "Learn the secrets of crafting a compelling resume that stands out to recruiters and hiring managers.",
      content: "Your resume is often the first impression you make on potential employers. In today's competitive job market, it's crucial to create a resume that not only showcases your qualifications but also captures attention...",
      author: "Michael Chen",
      authorRole: "HR Specialist",
      authorAvatar: "https://i.pravatar.cc/150?u=michael",
      publishDate: "2024-01-12",
      readTime: "7 min read",
      category: "resume-tips",
      tags: ["resume", "job search", "career advice"],
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Networking Strategies for Career Growth",
      excerpt: "Build meaningful professional relationships that can accelerate your career advancement.",
      content: "Networking isn't just about collecting business cards or LinkedIn connections. It's about building genuine relationships that can provide value to both parties. Here's how to network effectively...",
      author: "Emily Rodriguez",
      authorRole: "Career Strategist",
      authorAvatar: "https://i.pravatar.cc/150?u=emily",
      publishDate: "2024-01-10",
      readTime: "6 min read",
      category: "networking",
      tags: ["networking", "career growth", "professional development"],
      image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Interview Preparation: Common Questions and Answers",
      excerpt: "Prepare for your next job interview with these proven strategies and sample answers.",
      content: "Job interviews can be nerve-wracking, but with proper preparation, you can confidently showcase your skills and experience. Here are the most common interview questions and how to answer them effectively...",
      author: "David Thompson",
      authorRole: "Recruitment Expert",
      authorAvatar: "https://i.pravatar.cc/150?u=david",
      publishDate: "2024-01-08",
      readTime: "8 min read",
      category: "interview-tips",
      tags: ["interview", "job search", "preparation"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "The Future of Work: Trends to Watch in 2024",
      excerpt: "Explore the emerging trends that will shape the workplace and job market in the coming year.",
      content: "The workplace is evolving rapidly, driven by technological advances, changing demographics, and new work models. Understanding these trends can help you prepare for the future of work...",
      author: "Lisa Wang",
      authorRole: "Future of Work Analyst",
      authorAvatar: "https://i.pravatar.cc/150?u=lisa",
      publishDate: "2024-01-05",
      readTime: "10 min read",
      category: "future-of-work",
      tags: ["future of work", "trends", "technology"],
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 6,
      title: "Salary Negotiation: Getting What You Deserve",
      excerpt: "Master the art of salary negotiation with these proven strategies and techniques.",
      content: "Salary negotiation is one of the most important skills in career development, yet many professionals avoid it. Learn how to confidently negotiate your compensation and get the salary you deserve...",
      author: "Robert Martinez",
      authorRole: "Compensation Consultant",
      authorAvatar: "https://i.pravatar.cc/150?u=robert",
      publishDate: "2024-01-03",
      readTime: "6 min read",
      category: "salary-negotiation",
      tags: ["salary", "negotiation", "career advancement"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=400&fit=crop",
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Articles', count: articles.length },
    { id: 'remote-work', name: 'Remote Work', count: articles.filter(a => a.category === 'remote-work').length },
    { id: 'resume-tips', name: 'Resume Tips', count: articles.filter(a => a.category === 'resume-tips').length },
    { id: 'networking', name: 'Networking', count: articles.filter(a => a.category === 'networking').length },
    { id: 'interview-tips', name: 'Interview Tips', count: articles.filter(a => a.category === 'interview-tips').length },
    { id: 'future-of-work', name: 'Future of Work', count: articles.filter(a => a.category === 'future-of-work').length },
    { id: 'salary-negotiation', name: 'Salary Negotiation', count: articles.filter(a => a.category === 'salary-negotiation').length }
  ];

  const featuredArticles = articles.filter(article => article.featured);
  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setIsSubscribed(true);
      setEmail('');
      // Here you would typically send the email to your backend
      console.log('Subscribed email:', email);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user}
        onLoginClick={onLoginClick}
        onLogout={onLogout}
        onDashboardClick={onDashboardClick}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Career Advice & Insights
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Expert tips, strategies, and insights to advance your career
              </p>
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles, topics, or authors..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-70 placeholder-gray-600 shadow-xl border-2 border-white"
                    style={{ 
                      minWidth: '300px', 
                      backgroundColor: 'white',
                      fontSize: '16px',
                      fontWeight: '500'
                    }}
                  />
                  <svg
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-600 pointer-events-none"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                {searchTerm && (
                  <p className="text-blue-100 mt-2 text-sm">
                    Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} for "{searchTerm}"
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  Featured Articles
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredArticles.map((article) => (
                    <article key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {categories.find(cat => cat.id === article.category)?.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">{article.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={article.authorAvatar}
                              alt={article.author}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{article.author}</p>
                              <p className="text-xs text-gray-500">{article.authorRole}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{article.publishDate}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Category Filter */}
        <section className="py-8 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedCategory === 'all' ? 'All Articles' : categories.find(cat => cat.id === selectedCategory)?.name}
                </h2>
                <span className="text-gray-600">
                  {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </span>
              </div>

              {filteredArticles.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="relative">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center mb-3">
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {categories.find(cat => cat.id === article.category)?.name}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">{article.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {article.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <img
                              src={article.authorAvatar}
                              alt={article.author}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-900">{article.author}</p>
                              <p className="text-xs text-gray-500">{article.authorRole}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">{article.publishDate}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No articles found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Updated with Career Insights
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Get the latest career advice and job market trends delivered to your inbox
              </p>
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className="flex-1 px-4 py-3 rounded-lg text-gray-900 text-base focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-70 placeholder-gray-600 border-2 border-white shadow-lg"
                      style={{ 
                        minWidth: '200px', 
                        backgroundColor: 'white',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                    />
                    <button 
                      type="submit"
                      className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap border-2 border-white shadow-lg hover:shadow-xl"
                      style={{ fontSize: '16px' }}
                    >
                      Subscribe Now
                    </button>
                  </div>
                  <p className="text-sm text-blue-200 mt-4">
                    Join 10,000+ professionals getting career insights weekly
                  </p>
                </form>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="bg-green-500 text-white px-6 py-4 rounded-lg">
                    <div className="flex items-center justify-center">
                      <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="font-medium">Successfully subscribed!</span>
                    </div>
                    <p className="text-sm mt-2">Thank you for subscribing to our newsletter.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Article;
