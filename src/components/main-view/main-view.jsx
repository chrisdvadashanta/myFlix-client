import { useEffect, useState } from "react";
import { MovieCard} from "../movie-card/movie-card"
import { MovieView} from "../movie-view/movie-view"

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState (null);

  useEffect(() => {
    fetch("https://guarded-peak-19726.herokuapp.com/movies")
    .then ((response) => response.json())
    .then ((data) => {
      const movieFromApi = data.map((doc) => {
        return{
          id:doc._id,
          Title: doc.Title,
          Descritption: doc.Descritption,
          Gerne: doc.Genre.Name,
          Director: doc.Director.Name,
          Image: doc.Director.ImageURL,
        };
      });
      setMovies(movieFromApi);
    });
  }, []);
 
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null) } />
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
    </div>
          );
    };