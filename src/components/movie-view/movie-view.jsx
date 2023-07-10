import { useState } from "react";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import "./movie-view.scss";
import { Backend_API } from "../../utils/constant";
import Modal from "react-bootstrap/Modal";


export const MovieView = ({ movies, user, setUser, token }) => {
  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((m) => m.id === movieId);

  useEffect(() => {
    const isFavorited = user.favorites.includes(movieId);
    setIsFavorite(isFavorited);
  }, [user.favorites, movieId]);

  ///// handle Modal adding favorite
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    ///// handle Modal removing favorite
    const [showTwo, setShowTwo] = useState(false);
    const handleShowTwo = () => setShowTwo(true);
    const handleCloseTwo = () => setShowTwo(false);

  ///////////Favorite Button Function ///////////////
  const removeFavoriteMovie = () => {
    fetch(`${Backend_API}/users/${user.username}/movies/${movie.Title}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log("Response:", response); // Log the entire response object
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

  const addToFavoriteMovie = () => {
    fetch(`${Backend_API}/users/${user.username}/movies/${movie.Title}`, {
      method: "POST",
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
          <Button
            className="favoriteMovieButton"
            onClick={() => {
              addToFavoriteMovie();
              handleShow();
            }}>
            Add ⭐
          </Button>
        </span>
        <span className="button-container-b">
          <Button
            className="removeFavoriteMovieButton"
            onClick={() => {
              removeFavoriteMovie();
              handleShowTwo();
            }}>
            Remove 🚫
          </Button>
        </span>
        <Modal show={show} onHide={handleClose} className="favorite-modal" centered>
          <Modal.Header closeButton>
            <Modal.Title>Favorite Movies updated</Modal.Title>
          </Modal.Header>
        </Modal>
        <Modal show={showTwo} onHide={handleCloseTwo} centered >
              <Modal.Header>
                <Modal.Title> Your Movie has been removed </Modal.Title>
              </Modal.Header>
            </Modal>
      </div>
      <p />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header> Title: {movie.Title}</Accordion.Header>
          <Accordion.Body>Description: {movie.Description}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header> Director: {movie.Director.Name}</Accordion.Header>
          <Accordion.Body>Bio: {movie.Director.Bio}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header> Genre: {movie.Genre.Name}</Accordion.Header>
          <Accordion.Body>{movie.Genre.Description}</Accordion.Body>
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

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     _id: PropTypes.shape({
//       $oid: PropTypes.string,
//     }),
//     Title: PropTypes.string,
//     Poster: PropTypes.string,
//     Director: {
//       Name: PropTypes.string,
//     },
//     Description: PropTypes.string,
//     Genre:
//       PropTypes.string[
//         {
//           name: PropTypes.string,
//           description: PropTypes.string,
//         }
//       ],
//   }).isRequired,
// };
