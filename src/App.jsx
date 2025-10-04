import Header from './components/header'
import FeaturedArticles from './components/FeaturedArticles'
import LatestArticles from './components/LatestArticles'
import Comments from './components/Comments'
import Footer from './components/Footer'

function App() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="container mx-auto p-4">
        <FeaturedArticles />
        <LatestArticles />
        <Comments />
      </main>
      <Footer />
    </div>
  )
}

export default App