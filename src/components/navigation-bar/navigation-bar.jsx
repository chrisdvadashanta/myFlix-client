import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Movies App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Signup
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/profile">
                Profile
              </Nav.Link>
           </>
            )}
          </Nav>
              {user && user.username ? (
          <Nav className="navbar-username">
            <Nav.Link href="#username">{user.username}</Nav.Link>
            <Nav.Link href="#logout" onClick={onLoggedOut}>
              <button className="navbar-button">
              Logout
              </button>
              </Nav.Link>
          </Nav>
        ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
