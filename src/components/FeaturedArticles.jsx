import React from 'react'

function FeaturedArticles() {
  return (
    <section className="my-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Articles</h2>
      <div className="flex items-center bg-gray-800 p-4 rounded-lg">
        <img src="/assets/featured-image.jpg" alt="Featured" className="w-1/3 mr-4" />
        <div>
          <h3 className="text-xl font-bold">Mastering the Art of the Virtual Interview</h3>
          <p className="text-gray-400">In today's digital age, virtual interviews have become the norm. Learn how to make a lasting impression from your home office.</p>
          <p className="text-gray-500">By Emily Carter | 2 days ago</p>
        </div>
      </div>
    </section>
  )
}

export default FeaturedArticles