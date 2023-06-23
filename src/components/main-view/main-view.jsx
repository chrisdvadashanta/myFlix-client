import { useEffect, useState } from "react";
import { MovieCard} from "../movie-card/movie-card"
import { MovieView} from "../movie-view/movie-view"

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState (null);

const JsonApi = "https://api.jsonbin.io/v3/qs/649554cb8e4aa6225eb2fef0";
const herokuApi = "https://guarded-peak-19726.herokuapp.com/movies";

  useEffect(() => {
    fetch(JsonApi)
    .then ((response) => response.json())
    .then ((data) => {
      console.log("moviedata", data);
      const movieFromApi = data.record.map((movie) => {
        return {
          id: movie._id.__$MSCoid,
          Poster: movie.Poster,
          Title: movie.Title,
          Genre: movie.Genre[0].Name,
          Description: movie.Description,
          Director: movie.Director.Name?.[0],
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