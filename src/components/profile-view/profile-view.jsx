import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Container, FloatingLabel } from "react-bootstrap";

import { Backend_API } from "../../utils/constant";
import "./profile-view.scss";

export const ProfileView = ({ user ,setUser, movies, onLogout, token }) => {
  ///// useState to update User information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const { movieId } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const movie = movies.find((m) => m.id === movieId);

  useEffect(() => {
    const isFavorited = user.favorites.includes(movieId);
    setIsFavorite(isFavorited);
  }, [user.favorites, movieId]);

  ///// handle Modal removing favorite
  const [showRemove, setShowRemove] = useState(false);
  const handleShowRemove = () => setShowRemove(true);
  const handleCloseRemove = () => setShowRemove(false);

  /////////// Remove Favorite Button Function ///////////////
  const removeFavoriteMovie = (movieToRemove) => {
    fetch(`${Backend_API}/users/${user.username}/movies/${movieToRemove.Title}`, {
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
  
  ///// favorite Movies filter
  const favorites = movies.filter((movie) => {
    return user.favorites.includes(movie.id);
  });
  

  /////  Update User
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    };

    fetch(`${Backend_API}/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to update user data");
      }
    })
    .then((updatedUser) => {
      console.log("Updated user data:", updatedUser);
      setUser(updatedUser); // Update the user state with the new data
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      // Handle the error, show an error message, etc.
    });
  };
  console.log("new user data", user);

  ///// handle Modal update user button
  const [showTwo, setShowTwo] = useState(false);
  const handleShowTwo = () => setShowTwo(true);
  const handleCloseTwo = () => setShowTwo(false);

  /////  Delete User
  const handleDeleteUser = () => {
    fetch(`${Backend_API}/users/${user.username}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        onLogout();
      } else {
        alert("something went wrong.");
      }
    });
  };

  ///// handle Modal delete button
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Container>
      <Row className="row-1">
        <Col md={6} sm={12} className="order-md-1 order-sm-2">
          <Row className="row-1-1">
            <CardGroup className="cardgroup-1">
              <Card>
                <Card.Body>
                  <Card.Title>{user.username}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {user.email}
                  </Card.Subtitle>
                  <Button variant="primary" className="usercard-button">
                    Contact
                  </Button>
                </Card.Body>
              </Card>
              <Card className="image-card">
                <Card.Img
                  variant="top"
                  src="https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-600w-418179865.jpg"
                  alt="profile icon"
                />
              </Card>
            </CardGroup>
          </Row>

          <Row className="row-1-2">
            <Form onSubmit={handleSubmit} className="floating-label-form">
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingEmail" label="Email">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingBirthday" label="Birthdate">
                <Form.Control
                  placeholder="08.05.1978"
                  type="date"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </FloatingLabel>

              <p />
              <div className="d-grid gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="form-button"
                  onClick={handleShowTwo}
                >
                  Update your data
                </Button>
              </div>
            </Form>
          </Row>
          <Modal show={showTwo} onHide={handleCloseTwo} centered>
            <Modal.Header>
              <Modal.Title>Your Data is updated</Modal.Title>
            </Modal.Header>
          </Modal>
        </Col>

        <Col md={6} sm={12} className="carousel-container order-md-2 order-sm-1">
          <Carousel
          className="movie-carousel"
          interval={null}
          activeIndex={activeIndex}
          onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
          >
          {favorites.map((movie) => {
                    return (
                      <Carousel.Item key={movie.id}>
                        <img
                          className="d-block w-100"
                          src={movie.Poster}
                          alt={movie.Title}
                        />
                      </Carousel.Item>
                    );
                  })}
      </Carousel>
          <div className="button-container">
              <Button
                className="removeFavoriteMovieButton"
                onClick={() => {
                    const activeMovie = favorites[activeIndex];
                    removeFavoriteMovie(activeMovie);
                    handleShowRemove();
                }}
              >
                Remove 🚫
              </Button>
        </div>
        </Col>
        <Modal
          show={showRemove}
          onHide={handleCloseRemove}
          className="favorite-modal"
          centered
          >
          <Modal.Header closeButton >
          <Modal.Title>Favorite Movies updated</Modal.Title>
          </Modal.Header>
          </Modal>
              <Modal show={showRemove} onHide={handleCloseRemove} centered>
              <Modal.Header>
              <Modal.Title> Your Movie has been removed </Modal.Title>
              </Modal.Header>
    </Modal>
      </Row>


      <Row className="row-3">
        <Button
          variant="link"
          onClick={handleShow}
          className="delete-button"
        >
          Delete your Profile
        </Button>
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Your Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Are you sure you want to delete your Profile ?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              No
            </Button>
            <Button variant="outline-primary" onClick={handleDeleteUser}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </Container >
  );
};
