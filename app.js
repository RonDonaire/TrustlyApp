const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const app = express();  // Initialize Express application
const port = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/reviews', async (req, res) => {
  const searchTerm = req.query.search;
  try {
    const url = searchTerm 
        ? `https://www.reddit.com/search.json?q=${encodeURIComponent(searchTerm)}&restrict_sr=on&sr_nsfw=&sort=relevance`
        : 'https://www.reddit.com/r/reviews.json';

    const response = await axios.get(url);
    const posts = response.data.data.children;

    res.json(posts.slice(0, 5)); // Send the first 5 posts
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching reviews from Reddit.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
