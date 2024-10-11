// src/components/NewsCard.jsx
import PropTypes from "prop-types";
import axios from 'axios';


const NewsCard = ({ article }) => {

    const handleClick = async () => {
        const text = article.title + article.description + article.content;
        const token = localStorage.getItem('token'); 

        try {
            const response = await axios.post('http://localhost:3000/news/extract', {
            text: text,
            }, {
            headers: {
                Authorization: `Bearer ${token}` // Set the Authorization header
            }
            });

            console.log(response.data); // Handle the response
        } catch (error) {
            console.error('Error sending request:', error);
        }
    };

  return (
    <div className="max-w-4xl flex flex-col sm:flex-row bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 mx-auto my-4">
      {/* Left Section for News Details */}
      <div className="w-full sm:w-2/3 p-4 flex flex-col justify-between">
        <div>
          <a href={article.url} target="_blank"><h2 onClick={handleClick} className="text-xl font-semibold text-gray-800 mb-2 hover:text-gray-500">{article.title}</h2></a>
          <p className="text-sm text-gray-600 mb-1">Source: {article.source.name || 'Unknown'}</p>
          <p className="text-sm text-gray-600 mb-1">Author: {article.author || 'Anonymous'}</p>
          <p className="text-base font-medium text-gray-700 mb-1">{article.description}</p>
          <p className="text-sm text-gray-600">{article.content || 'No content available.'}</p>
        </div>
        {/* Date Published */}
        <p className="text-sm text-gray-500 mt-4">Published at: {new Date(article.publishedAt).toLocaleDateString()}</p>
      </div>

      {/* Right Section for Image */}
      {article.urlToImage && (
        <div className="w-full sm:w-1/3 h-48 sm:h-auto">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
};

NewsCard.propTypes = {
    article: PropTypes.node.isRequired, // `node` is any renderable React element
};

export default NewsCard;
