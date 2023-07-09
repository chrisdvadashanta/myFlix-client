import { useState } from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./movie-view.scss";
import { Backend_API } from "../../utils/constant";

export const MovieView = ({ movies, user, setUser, token }) => {
  console.log("local user",  localStorage.getItem('user'))
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((m) => m.id === movieId);

  useEffect(() => {
    const isFavorited = user.favorites.includes(movieId);
    setIsFavorite(isFavorited);
  }, [user.favorites, movieId]);


  ///////////Favorite Button Function ///////////////
  const removeFavorite = () => {
    fetch(`${Backend_API}/users/${user.username}/movies/${movie.Title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(false);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  const addToFavorite = () => {
    fetch(`${Backend_API}/users/${user.username}/movies/${movie.Title}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setIsFavorite(true);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
      });
  };

  return (
    <div>
      <div className="image-container">
      <img src={movie.Poster} className="movie-poster" />
      <span className="button-container-a">
        <Button className="favoriteMovieButton" onClick={addToFavorite}>
          add ⭐
        </Button>
      </span>
      <span className="button-container-b">
        <Button className="removeFavoriteMovieButton" onClick={removeFavorite}>
          remove ⭐
        </Button>
     </span>
      </div>
      <p />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header> Title: {movie.Title}</Accordion.Header>
            <Accordion.Body>
            Description: {movie.Description}
            </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header> Director: {movie.Director.Name}</Accordion.Header>
          <Accordion.Body>
           Bio: {movie.Director.Bio}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header> Genre: {movie.Genre}</Accordion.Header>
            <Accordion.Body> 
            {movie.Genre} 
            </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p />
      <Link to={`/`} className="d-grid gap-2">
        <Button variant="primary" size="sm">
          Back
        </Button>
      </Link>
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
