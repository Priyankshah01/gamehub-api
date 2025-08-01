# GameHub 🎮

GameHub is a modern web app to browse, search, and explore popular video games using the **RAWG** API and **YouTube Data API** for gameplay videos. It features trending games, detailed game pages, and embedded gameplay trailers — all wrapped in a sleek dark-themed UI.

---

## Features

- **Home Page:** Browse a grid of popular games fetched dynamically from RAWG API  
- **Search:** Find games by name with gameplay trailer preview from YouTube  
- **Game Detail:** View detailed game info, screenshots, and multiple gameplay videos  
- **Trending Page:** Check out the most popular recently added games  
- **Responsive Design:** Works beautifully on desktop and mobile devices  
- **Loading Spinners & Error Handling:** Smooth user experience with feedback  

---

## Tech Stack

- Backend: Node.js + Express  
- Templating: EJS  
- APIs: [RAWG Video Games Database API](https://rawg.io/apidocs), [YouTube Data API v3](https://developers.google.com/youtube/v3)  
- Styling: Custom CSS, mobile-responsive grid layouts  
- Environment: dotenv for managing API keys  

---

## Getting Started

### Prerequisites

- Node.js (v14 or later recommended)  
- RAWG API Key (free registration at https://rawg.io/apidocs)  
- Google YouTube Data API Key (via Google Cloud Console)  

### Installation

1. Clone the repo  
   ```bash
   git clone https://github.com/yourusername/gamehub.git
   cd gamehub
   npm install
   npm start


### Future Enhancements

- Add user authentication and favorites list  
- Include user reviews and ratings
- Add filters and sorting options on search/trending pages
- Improve UI animations and accessibility
- Add pagination for game lists



