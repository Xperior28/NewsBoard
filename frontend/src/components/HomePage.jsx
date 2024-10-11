// src/components/HomePage.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from './NewsCard';
import PropTypes from 'prop-types';

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
        placeholder="Search for news..."
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

// GenerateNews Component
const GenerateNews = ({ searchTerm }) => {
  const [articles, setArticles] = useState([]); // State to hold articles
  const [loading, setLoading] = useState(true); // State to indicate loading
  

  useEffect(() => {
    // Function to fetch articles
    const fetchArticles = async () => {
      try {
        var response = "";
        const token = localStorage.getItem('token'); 
        
        if(searchTerm) {
            response = await axios.post(`http://localhost:3000/news/generate`, {keywords: [searchTerm]});
        } else {
            response = await axios.get(`http://localhost:3000/news/generate`, {
                headers: {
                    Authorization: `Bearer ${token}` // Set the Authorization header
                }
            });
        }

        console.log(response.data);
        setArticles(response.data); // Assuming response.data is an array of articles
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    fetchArticles(); // Call the function to fetch articles
  }, [searchTerm]); // Dependency array includes searchTerm to refetch articles on search

  if (loading) {
    return <p>Loading articles...</p>; // Show a loading message while articles are being fetched
  }

  
  return (
    <div className='flex flex-wrap gap-4'>
      {articles.map((article, index) => (
        (article.title != "[Removed]") ? <NewsCard key={index} article={article} /> : null
      ))} 
    </div>
  );
};

GenerateNews.propTypes = {
  searchTerm: PropTypes.node.isRequired, // Updated prop type for searchTerm
};

// HomePage Component
const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

  // Callback function for SearchBar
  const handleSearch = (term) => {
    console.log('updated search item!');
    setSearchTerm(term); // Set the searchTerm when SearchBar triggers onSearch
  };

  return (
    <div className='flex flex-col gap-4 font-newsreader min-h-screen items-center bg-gray-100'>
      <h1 className='text-3xl font-semibold mt-10'>Here is the latest news for you</h1>
      <SearchBar onSearch={handleSearch} /> {/* Pass the callback function */}
      <div className='flex flex-wrap pb-8'>
        <GenerateNews searchTerm={searchTerm} /> {/* Pass searchTerm as a prop */}
      </div>
    </div>
  );
};

export default HomePage;
