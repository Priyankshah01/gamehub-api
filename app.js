require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// ✅ Home route – shows a grid of popular games
app.get('/', async (req, res) => {
  const API_KEY = process.env.RAWG_API_KEY;

  try {
    const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`);
    const games = response.data.results;
    res.render('index', { games, error: null });
  } catch (err) {
    console.error(err);
    res.render('index', { games: [], error: 'Failed to fetch games. Please try again later.' });
  }
});

// 🔍 Search route – fetch from RAWG and YouTube
app.post('/search', async (req, res) => {
  const query = req.body.query;

  try {
    // 1. Fetch game data from RAWG
    const rawgResponse = await axios.get('https://api.rawg.io/api/games', {
      params: {
        key: process.env.RAWG_API_KEY,
        search: query
      }
    });

    const games = rawgResponse.data.results;

    // 2. Fetch gameplay trailer from YouTube for the first game
    let videoId = null;
    if (games.length > 0) {
      const gameName = games[0].name;
      const ytResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: process.env.YOUTUBE_API_KEY,
          q: `${gameName} gameplay trailer`,
          part: 'snippet',
          maxResults: 1,
          type: 'video'
        }
      });

      if (ytResponse.data.items.length > 0) {
        videoId = ytResponse.data.items[0].id.videoId;
      }
    }

    res.render('game', { games, query, videoId });

  } catch (error) {
    console.error('Error fetching search results:', error.message);
    res.send('There was an error fetching game data. Please try again later.');
  }
});

// 🕹️ Game detail page – RAWG + YouTube
app.get('/game/:id', async (req, res) => {
  const gameId = req.params.id;

  try {
    // 1. Get game detail from RAWG
    const rawgDetailResponse = await axios.get(`https://api.rawg.io/api/games/${gameId}`, {
      params: {
        key: process.env.RAWG_API_KEY
      }
    });

    const gameDetail = rawgDetailResponse.data;

    // 2. Get multiple YouTube videos for the game
    const ytResponse = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        q: `${gameDetail.name} gameplay`,
        part: 'snippet',
        maxResults: 3,
        type: 'video'
      }
    });

    const videos = ytResponse.data.items;

    // 3. Render the detail page
    res.render('game-detail', { game: gameDetail, videos });

  } catch (error) {
    console.error('Error loading game detail:', error.message);
    res.status(500).send('Error loading game details');
  }
});

// 🔥 Trending Games Page
app.get('/trending', async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/games`, {
      params: {
        key: process.env.RAWG_API_KEY,
        ordering: '-added',
        page_size: 12
      }
    });

    const trendingGames = response.data.results;

    res.render('trending', { games: trendingGames });
  } catch (error) {
    console.error('Error fetching trending games:', error.message);
    res.status(500).send('Error loading trending games');
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`GameHub server is running on http://localhost:${PORT}`);
});
