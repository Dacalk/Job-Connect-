import React from 'react'

function LatestArticles() {
  const articles = [
    { title: 'Crafting a Resume That Stands Out', img: '/assets/resume.jpg', desc: 'Learn how to create a resume that highlights your skills and experience effectively.' },
    { title: 'Negotiating Your Salary: A Comprehensive Guide', img: '/assets/salary.jpg', desc: 'Get tips on how to confidently negotiate your salary and benefits.' },
    { title: 'Building Your Personal Brand Online', img: '/assets/branding.jpg', desc: 'Discover how to build and maintain a strong personal brand online.' },
    { title: 'The Importance of Networking in Your Career', img: '/assets/networking.jpg', desc: 'Explore the benefits of networking and how to expand your professional circle.' },
    { title: 'Navigating Career Transitions Successfully', img: '/assets/career-transition.jpg', desc: 'Strategies for successfully transitioning between different career paths.' },
    { title: 'Understanding Your Workplace Rights', img: '/assets/workplace-rights.jpg', desc: 'Know your rights as an employee and how to protect them.' },
  ]

  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Latest Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <img src={article.img} alt={article.title} className="w-full h-32 object-cover mb-2" />
            <h3 className="text-lg font-bold">{article.title}</h3>
            <p className="text-gray-400 text-sm">{article.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LatestArticles