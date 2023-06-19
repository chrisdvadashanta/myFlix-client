export const MovieView = ({ movie, onBackClick }) => {

  return (
    <div>
      <div>
        <img src={movie.Director.ImageURL} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <button onClick={onBackClick} >Back</button>
    </div>
  );
};

