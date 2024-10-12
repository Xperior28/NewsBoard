import axios from 'axios'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = redis.createClient({
    password: process.env.REDIS_KEY,
    socket: {
        host: 'redis-11202.c322.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 11202
    }
});


redisClient.on('connect', () => {
    console.log('Connected to Redis!');
});
  
redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});
  
redisClient.on('ready', () => {
  console.log('Redis client is ready!');
});  

// Connect the Redis client
await redisClient.connect();

export const generateTopHeadlines = async(req, res) => {
    const BASE_URL = 'https://newsapi.org/v2/top-headlines';
    const COUNTRY = 'us';
    const PAGE_SIZE = 50;

    const url = `${BASE_URL}?country=${COUNTRY}&pageSize=${PAGE_SIZE}&apiKey=${process.env.NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;
        res.json(articles);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Could not retrieve the articles!'});
    }
};

export const generateNews = async (req, res) => {
    console.log('fetching...');
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format

    // Decode the token to get the userId
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
    const userId = decodedToken.id;

    const cacheKey = `user:${userId}:keywordset`;

    const cacheContents = await redisClient.zRange(cacheKey, 0, -1, { REV: true });

    if(!cacheContents) {
        console.log('cache miss! retrieving user data...');
        const user = await User.findById(userId);
        cacheContents = user.interests;
    }

    
    if(cacheContents.length) {
        const keywords = cacheContents;
        const PAGE_SIZE = 50;
        
        var q = "";
        if(keywords.length==1) q = keywords[0];
        else {
            q = keywords.join(" OR ");
        }

        const url = `https://newsapi.org/v2/everything?q=${q}&pageSize=${PAGE_SIZE}&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`;

        try {
            const response = await axios.get(url);
            const articles = response.data.articles;
            res.json(articles);
        } catch(error) {
            console.log(error);
            res.status(500).json({message: 'Could not retrieve the articles!'});
        }

    } else {
        res.json([]);
    }
};

export const generateKeyNews = async (req, res) => {
    const { keywords } = req.body;
    const PAGE_SIZE = 50;

    var q = '';

    if(keywords.length==1) q = keywords[0];
    else if(keywords.length>1) {
        q = keywords.join(" OR ");
    } else {
        q = 'bitcoin'
    }

    const url = `https://newsapi.org/v2/everything?q=${q}&pageSize=${PAGE_SIZE}&sortBy=relevancy&apiKey=${process.env.NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);
        const articles = response.data.articles;
        res.json(articles);
    } catch(error) {
        console.log(error);
        res.status(500).json({message: 'Could not retrieve the articles!'});
    }
    
}

export const extractKeywords = async (req, res) => {
    try {
      const { text } = req.body; // Expect both text and userId in the request body
      const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format

      // Decode the token to get the userId
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your secret
      const userId = decodedToken.id;

      // Extract keywords using the external service
      const response = await axios.post('http://localhost:5000/extract_keywords', { text });
      const keywords = response.data; // Assuming the server responds with { keywords: [...] }
      console.log(keywords);

      const cacheKey = `user:${userId}:keywordset`;

        // Step 1: Add each keyword to Redis Sorted Set with the current timestamp as the score
        const currentTime = Date.now();
        for (const keyword of keywords) {
            await redisClient.zAdd(cacheKey, { score: currentTime, value: keyword });
        }

        // Step 2: Trim the Sorted Set to keep only the latest 50 keywords
        await redisClient.zRemRangeByRank(cacheKey, 0, -51); // Remove older keywords if count exceeds 50

        // Retrieve the keywords sorted by time in descending order (most recent first)
        const cacheContents = await redisClient.zRange(cacheKey, 0, -1, { REV: true });
        console.log('Keywords in Redis (sorted):', cacheContents);
      console.log('Cache updated!');
  
      // Update the interests array of the specific user
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: { interests: cacheContents } }, // Replace interests array with the extracted keywords
        { new: true } // Return the updated user document
      );
  
      // Respond with the updated user information
      res.status(200).json({ message: 'User interests updated successfully!', user: updatedUser });
    } catch (error) {
      console.error('Error updating user interests:', error);
      res.status(500).json({ message: 'Could not update user interests!' });
    }
  };