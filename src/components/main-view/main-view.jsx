import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import {Row, Col} from "react-bootstrap"; 
import Button from 'react-bootstrap/Button';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const Backend_API = "https://guarded-peak-19726.herokuapp.com";

  useEffect(() => {
    if (!token) return;

    fetch(`${Backend_API}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    // .then((response) => response.json())
    .then((response) => {
      console.log('Response:', response); // Log the entire response object
      return response.json();
    })
    .then((data) => {
      // Process the API response and update the movies state
      const moviesFromApi = data.map((movie) => {
        return {
          Poster: movie.Poster,
          Title: movie.Title,
          Genre: movie.Genre[0].name,
          Description: movie.Description,
          Director: movie.Director,
        };
      });

      setMovies(moviesFromApi);
    })
    .catch((error) => {
      console.log('Error fetching movies:', error);
    });
}, [token]);


return(
  <Row className="justify-content-md-center" >
    {!user ? (
      <Col md={5} >
        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
        <p />
        <SignupView
        onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
         }} /> 
      </Col>
    ) : selectedMovie ? (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        {movies.map((movie) => (
        <Col key={movie.id} md={3} className="mb-5" >
        <MovieCard
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
        </Col>
      ))}
        <div className="d-grid gap-2">
              <Button 
                variant="primary" size="sm" 
                className="button-logout" 
                onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}
              > 
              Logout 
              </Button>
      </div>
      </>
    )
  }
  </Row>
)
};