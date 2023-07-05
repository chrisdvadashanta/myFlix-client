import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Row, Col, Container } from "react-bootstrap";
import { FloatingLabel } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { ModalHeader } from "react-bootstrap";


export const ProfileView = ({ user, movies, toke, setUser, onLogout }) => {
  ///// useState to update User information
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");

  ///// favorite Movies filter
  const favoriteMovies = movies.filter((movie) => {
    return user.FavoriteMovies.includes(movie.id);
  });

  ///// handle Modal
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);



  ///// handle update User
  const Backend_API = "https://guarded-peak-19726.herokuapp.com";
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password,
      email: email,
      birthdate: birthdate,
    };

    fetch(`${Backend_API}/users`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  ///// handle delete User
  const handleDeleteUser = () => {
    fetch(`${Backend_API}/users/:username`, {
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

  return (
    <Container>
      <Row>
        <Col md={6} lg={6}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>{user.username}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {user.email}
              </Card.Subtitle>
              <Button variant="primary">Contact</Button>
            </Card.Body>
          </Card>
        </Col>

        {favoriteMovies.map((movie) => {
          return (
            <Col>
              <Carousel>
                <Carousel.Item key={movie.id}>
                  <img
                    className="d-block w-100"
                    src={movie.Poster}
                    alt={movie.Title}
                  />
                  <Carousel.Caption>
                    <Link to={`/movie/${movie.id}`}>
                      <h3>Nr. 1 {movie.Title}</h3>
                      <p>{movie.Description}</p>
                    </Link>
                  </Carousel.Caption>
                </Carousel.Item>
              </Carousel>
            </Col>
          );
        })}
      </Row>

      <Row>
        <Col md={6}>
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
              >
                Update your data
              </Button>
            </div>
          </Form>
        </Col>
        <Col md={6}>
            <Button variant="primary" onClick={handleShowModal} >
              Delete your Profile
            </Button>
            <div
              className="modal show"
              style={{ display: "block", position: "initial" }}
            >
              <Modal.Dialog show={showModal} onHide={handleCloseModal} >
                <Modal.Header closeButton>
                  <Modal.Title>Delete Your Profile</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <p>Are you sure you want to delete your Profile ?</p>
                </Modal.Body>

                <Modal.Footer>
                  <Button variant="outline-primary" onClick={handleDeleteUser}>
                    Yes
                  </Button>
                  <Button variant="primary" onClick={handleCloseModal} >
                    No
                  </Button>
                </Modal.Footer>
              </Modal.Dialog>
            </div>
        </Col>
      </Row>
    </Container>
  );
};
