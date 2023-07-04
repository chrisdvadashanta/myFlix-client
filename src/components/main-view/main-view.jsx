import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const Backend_API = "https://guarded-peak-19726.herokuapp.com";
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
}
  const { movieid } = useParams();
  // Find the movie object that matches the movieid parameter
  const movie = movies.find((movie) => movie._id === movieid);

  useEffect(() => {
    if (!token) return;

    fetch(`${Backend_API}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      // .then((response) => response.json())
      .then((response) => {
        console.log("Response:", response); // Log the entire response object
        return response.json();
      })
      .then((data) => {
        // Process the API response and update the movies state
        const moviesFromApi = data.map((movie) => {
          return {
            Poster: movie.Poster,
            Title: movie.Title,
            Genre: movie.Genre[0].Name,
            Description: movie.Description,
            Director: movie.Director,
          };
        });

        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null)
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route /////////SignUp
            path="/users"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />

          <Route ////////Login
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user) => {
                    setUser(user);
                    setToken(token) }} 
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route ////////Profile
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <ProfileView 
                    user={user}
                    token={token}
                    setUser={setUser}
                    movies={movies}
                    onLogout={onLogout} 
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route ////////MovieView
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView 
                    movie={movie}
                    user={user}
                    setUser={setUser}
                    token={token}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route ////////MovieCard
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />

        </Routes>
        {/* <div className="d-grid gap-2">
            <Link to={`/`}>
              <Button variant="primary" size="sm" className="button-logout">
                Back
              </Button>
            </Link>
            </div> */}
      </Row>
    </BrowserRouter>
  );
};
