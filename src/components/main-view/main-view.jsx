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



  const JsonApi = "https://api.jsonbin.io/v3/qs/6495b4b1b89b1e2299b3e32d";
  const herokuApi = "https://guarded-peak-19726.herokuapp.com/movies";

  useEffect(() => {
    if (!token) return;

    fetch(herokuApi, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);

      });
  }, [token]);

  //   return {
  //     id: movie._id.__$MSCoid,
  //     Poster: movie.Poster,
  //     Title: movie.Title,
  //     Genre: movie.Genre[0].name,
  //     Description: movie.Description,
  //     Director: movie.Director.Name
  //   };
  // });
  // setMovies(movieFromApi);


  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
          }}
        />
        or
        <SignupView />
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
