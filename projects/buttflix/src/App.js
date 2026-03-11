import logo from './logo.svg';
import './App.css';
import './styles.css';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesGrid from './components/Movies';
import Watchlist from './components/Watchlist';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    //const loadMovies = ["avengers", "inception", "interstellar", "the dark knight", "the matrix", "pulp fiction", "fight club", "forrest gump", "the lord of the rings", "the godfather"];
    fetch('movies.json')
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error loading movies:', error));
  }, []);

  const toggleWatchlist = (movieId) => {
    setWatchlist((prev) => {
      return prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId];
    });
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MoviesGrid
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  movies={movies}
                  watchlist={watchlist}
                  toggleWatchlist={toggleWatchlist}
                />
              }
            />
          </Routes>
        </Router>
      </div>
      <Footer />
    </div>
  );
}

export default App;
