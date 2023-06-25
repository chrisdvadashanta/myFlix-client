import PropTypes from "prop-types";

export const MovieView = ({ movie, onBackClick }) => {

  return (
    <div>
      <div>
        <img src= {movie.Poster} />
      </div>
      <div>
        <span>Title: </span>
        <span> {movie.Title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <button onClick={onBackClick} >Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string,
    Poster:PropTypes.string,
    Director: {
      Name: PropTypes.string},
    Description: PropTypes.string,
    Genre: PropTypes.string[{
      "name":PropTypes.string,
      "description":PropTypes.string
    }]
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};