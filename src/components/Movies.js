import React , {useState,useEffect} from 'react';
import '../styles.css';

export default function MoviesGrid() {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        //const loadMovies = ["avengers", "inception", "interstellar", "the dark knight", "the matrix", "pulp fiction", "fight club", "forrest gump", "the lord of the rings", "the godfather"];
        fetch("movies.json")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error('Error loading movies:', error));
    }, []);

    return (
        <div className='movies-grid'> 
            {
            movies.map((movie, index) => (
                <div key={index} className="movie-card">
                    <img src={`images/${movie.image}`} alt={movie.title} className="movie-poster" />
                    <div className="movie-card-info">
                        <h3 className="movie-card-title">{movie.title}</h3>
                        <p className="movie-card-genre">{movie.genre}</p>
                        <p className="movie-card-rating">{movie.rating}</p>
                    </div>
            </div>
            ))
        }
        </div>
    );
}