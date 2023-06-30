import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card"
import { MovieView } from "../movie-view/movie-view"
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

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
          Director: movie.Director.Name
        };
      });

      setMovies(moviesFromApi);
    })
    .catch((error) => {
      console.log('Error fetching movies:', error);
    });
}, [token]);



  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        <p />
        <SignupView 
         onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
         }}
         />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>
        Logout
      </button>
    </div>
  );
};
