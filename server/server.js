
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
  res.send('Welcome to the Express Backend Service!');
});


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello, world!' });
});

app.use('/auth', authRoutes);
app.use('/news', newsRoutes);

mongoose.connect(process.env.MONGO_URI, {
      dbName: "NewsBoard",
    })
    .then((c) => console.log(`Database Connected with ${c.connection.host}`))
    .catch((e) => console.log(e));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
