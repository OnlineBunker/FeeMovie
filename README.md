# 🎬 MovieVerse – Your Ultimate Movie Explorer

MovieVerse is a modern, responsive React web app that lets users explore trending, top-rated, and newly released movies in style. It connects to **The Movie Database (TMDB) API** for live movie data and integrates a third-party video player to stream films directly from external sources.

---

## 🚀 Features

### 🔍 **Search Functionality**

* Search for any movie using TMDB’s real-time API.
* Displays movie cards with posters, release year, and ratings.
* Click a movie card to open its **MoviePage** with full details and a video player.

### 🎞️ **MoviePage (Detailed View)**

* Plays the movie through a dynamic iframe embed using its TMDB ID.
* Shows the movie’s name, description, release year, rating, and cast details.
* Automatically fetches movie metadata from TMDB.

### 🏠 **Homepage Sections**

* Auto-rotating hero section showcasing **Top 10 Trending Movies of Today**.
* Scrollable horizontal rows for categories such as:

  * Top Rated
  * New Releases
  * Horror Picks
  * Action, Thriller, Drama, and Animated movies
* Each card is clickable and redirects to the detailed MoviePage.

### 🧭 **Navigation & Layout**

* Persistent Navbar and Footer across all pages.
* Responsive design with smooth scrolling and hover animations.

---

## 🧩 Tech Stack

| Category   | Technology      |
| ---------- | --------------- |
| Frontend   | React 19 + Vite |
| Routing    | React Router v7 |
| Styling    | CSS3 (custom)   |
| API        | TMDB API        |
| Deployment | Vercel          |

---

## ⚙️ Environment Variables

Before running locally or deploying, you must add your TMDB API key:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

> **Note:** Keep this key private — it should be set in Vercel’s Environment Variables for production builds.

---

## 🛠️ Installation & Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/OnlineBunker/movies.git
   ```

2. Navigate into the project folder:

   ```bash
   cd movies
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```
   http://localhost:5173
   ```

---

## 🌐 Deployment (Vercel)

MovieVerse is designed for seamless deployment on **Vercel**.

Make sure to:

* Set your `VITE_TMDB_API_KEY` under **Project → Settings → Environment Variables**.
* Push changes to the `main` branch — Vercel automatically redeploys.

---

## ⚠️ Known Issues

* The external video player (`vidking.net`) may trigger unwanted pop-ups. Due to browser sandboxing, these cannot be disabled programmatically from within the site.
* We recommend switching to official **YouTube trailers** via TMDB’s video endpoints for a cleaner, ad-free experience.

---

## 🧠 Future Enhancements

* Replace pop-up video player with TMDB/YouTube embeds.
* Add movie watchlist and favorites feature using Firebase.
* Implement theme switching (light/dark mode).
* Optimize API calls with caching and lazy loading.

---

## 👨‍💻 Developer

**Yash Dhankhar**
🎓 CS & AI Student | 💡 Full Stack Learner | 🎮 Creator of MovieVerse
📍 Delhi, India

---

## 📜 License

This project is licensed under the **MIT License** — feel free to fork and improve!

---

**Made with ❤️ using React + TMDB API**
