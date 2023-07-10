import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { Backend_API } from "../../utils/constant";
import "./profile-view.scss";

export const ProfileView = ({ user, movies, onLogout, token }) => {
  ///// useState to update User information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

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
      birthdate: birthdate,
    };

    fetch(`${Backend_API}/users/${user.username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
  const handleClose = () => setShow (false);

  return (
    <Container>
      <Row className="row-1">
        <Col md={6} sm={12}>
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
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
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
          <Modal show={showTwo} onHide={handleCloseTwo} centered >
              <Modal.Header>
                <Modal.Title>Your Data is updated</Modal.Title>
              </Modal.Header>
            </Modal>
        </Col>

        <Col md={6} sm={12}>
          <Carousel className="movie-carousel">
            {favorites.map((movie) => {
              return (
                <Carousel.Item key={movie.id}>
                  <img
                    className="d-block w-100"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <Carousel.Caption className="carousel-caption">
                    <h3 className="carousel-captionh3"> {movie.Title} </h3>
                    <p> {movie.Description} </p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Col>
      </Row>

      <Row className="row-3">
        <Button
          variant="primary"
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
    </Container>
  );
};
