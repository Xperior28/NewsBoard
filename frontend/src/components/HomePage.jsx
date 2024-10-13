// src/components/HomePage.jsx

import { useEffect, useState } from 'react';
import NewsCard from './NewsCard';
import PropTypes from 'prop-types';
import api from '../axiosConfig';

// SearchBar Component
const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log(searchTerm);
    if (onSearch) {
      onSearch(searchTerm);
    }
    setSearchTerm('');
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <input
        type="text"
        placeholder="Search for news... (Ex: bitcoin)"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 p-2 border rounded-l-lg border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors duration-200"
      >
        Search
      </button>
    </div>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Updated prop type to function
};

const GenerateNews = ({ searchTerm, section }) => {
  console.log('reloaded!');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const [articlesPerPage] = useState(5); // Number of articles to show per page

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);

      try {
        let response = "";
        const token = localStorage.getItem('token');

        if (section === 'search') {
          response = await api.post(`http://localhost:3000/news/generate`, { keywords: [searchTerm] });
        } else if (section === 'top') {
          response = await api.get(`http://localhost:3000/news/topheadlines`);
        } else {
          response = await api.get(`http://localhost:3000/news/generate`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }

        console.log(response.data);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [searchTerm, section]);

  // Calculate the current articles for the current page
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  if (loading) {
    return <p>Loading articles...</p>;
  }

  return (
    <div className='flex flex-col items-center gap-4'>
      {articles.length ? (
        <>
          {section === 'top' ? (
            <h1 className="text-3xl font-semibold">Here is the latest news for you!</h1>
          ) : (section === 'you') ? (
            <h1 className="text-3xl font-semibold">Here is your personalised news!</h1>
          ) : (
            <h1 className="text-3xl font-semibold">Search for news!</h1>
          )}
          <div className="flex flex-wrap gap-4">
            {currentArticles.map((article, index) =>
              article.title !== "[Removed]" ? <NewsCard key={index} article={article} /> : null
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        !loading && <h1 className="text-3xl font-semibold">Go get some interests!</h1>
      )}
    </div>
  );
};

GenerateNews.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  section: PropTypes.string.isRequired,
};

// HomePage Component
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('bitcoin'); // State to hold the search term
  const [section, setSection] = useState('top');

  // Callback function for SearchBar
  const handleSearch = (term) => {
    console.log('updated search item!');
    setSearchTerm(term); // Set the searchTerm when SearchBar triggers onSearch
  };

  const handleClick = (sectionTerm) => { 
    setSection(sectionTerm);
  }
  console.log('rerender homepage!');

  return (
    <div className='flex flex-col gap-6 font-newsreader min-h-screen items-center bg-gray-100'>
      <div className='flex mt-8 mb-3 gap-8'>
        <div className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200" onClick={() => handleClick('top')}>Top</div>
        <div className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200" onClick={() => handleClick('you')}>For you</div> 
        <div className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200" onClick={() => handleClick('search')}>Search</div> 
      </div>
      {section == 'search' && <SearchBar onSearch={handleSearch} />} 
      <div className='flex flex-wrap pb-8'>
        <GenerateNews searchTerm={searchTerm} section={section} /> 
      </div>
    </div>
  );
};

export default HomePage;
