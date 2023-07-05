import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./movie-view.scss";


export const MovieView = ({ movies, user, setUser, token}) => {
  const Backend_API = "https://guarded-peak-19726.herokuapp.com";
  const { movieId } = useParams();
  const [ isFavorite, setIsFavorite ] = useState(false);

  const movie = movies.find((m) => m.id === movieId);

  useEffect(() => {
    const isFavorited = user.FavoriteMovies.includes(movieId)
    setIsFavorite(isFavorited)
    }, []);

  const removeFavorite = () => {
    fetch(`${Backend_API}/users/:username/:movieId`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    }).then((data) => {
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    })
};

const addToFavorite = () => {
    fetch(`${Backend_API}/users/:username/:movieId`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if (response.ok) {
            return response.json()
        }
    }).then((data) => {
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
    })
}

    return (
    <div>
      <div align="center">
        <img src={movie.Poster} className="movie-poster" />
      </div>
      <p />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header> Title: {movie.Title}</Accordion.Header>
          <Accordion.Body>{movie.Description}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header> Director: {movie.Director.Name}</Accordion.Header>
          <Accordion.Body>
            Name and Age
            {movie.Director.Description}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header> Genre: {movie.Genre}</Accordion.Header>
          <Accordion.Body>Description</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p />
        <Link to={`/`} className="d-grid gap-2">
          <Button variant="primary" size="sm" >Back</Button>
        </Link>

      <Button className="favoriteMovieButton" onClick={addToFavorite}>
        ⭐
      </Button>
      <Button className="removeFavoriteMovieButton" onClick={removeFavorite}>
        ⭐
      </Button>

    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.shape({
      $oid: PropTypes.string,
    }),
    Title: PropTypes.string,
    Poster: PropTypes.string,
    Director: {
      Name: PropTypes.string,
    },
    Description: PropTypes.string,
    Genre:
      PropTypes.string[
        {
          name: PropTypes.string,
          description: PropTypes.string,
        }
      ],
  }).isRequired,
};
