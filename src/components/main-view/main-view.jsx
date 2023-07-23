import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";

import SearchBar from "../search-bar/search-bar";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Backend_API } from "../../utils/constant";


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (!token) return;

    fetch(`${Backend_API}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log("Response:", response); // Log the entire response object
        return response.json();
      })
      .then((data) => {
        // Process the API response and update the movies state
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            Poster: movie.Poster,
            Title: movie.Title,
            Genre: {
              Name: movie.Genre.Name,
              Description: movie.Genre.Description,
            },
            Description: movie.Description,
            Director: {
              Name: movie.Director.Name,
              Bio: movie.Director.Bio,
              ImageURL: movie.Director.ImageURL,
              Birthdate: movie.Director.Birthdate,
            },
            Featured: movie.Featured,
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
          setToken(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route      /////////SignUp
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

          <Route      ////////Login
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route      ////////Profile
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={5}>
                    <ProfileView
                      user={user}
                      movies={movies}
                      onLogout={onLogout}
                      token={token}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />

          <Route      ////////MovieView
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
                      movies={movies}
                      user={user}
                      setUser={setUser}
                      token={token}
                    />
                  </Col>
                )}
              </>
            }
          />

        <Route        //////// MovieCard
            path="/"
            element={
              <Container>
                <Row>
                    <Col>
                      <SearchBar value={searchTerm} onChange={handleSearchChange} className="search-bar-movies"/>
                    </Col>
                </Row>
                <Row>
                  {!user ? (
                    <Navigate to="/login" replace />
                  ) : movies.length === 0 && searchTerm.trim() === "" ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      {searchTerm.trim() === "" ? ( 
                          movies.map((movie) => (
                            <Col className="mb-4" key={movie.id} md={3}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))
                      ) : (
                          movies.filter((movie) =>
                              movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((movie) => (
                              <Col className="mb-4" key={movie.id} md={3}>
                                <MovieCard movie={movie} />
                              </Col>
                            ))
                      )}
                    </>
                  )}
                </Row>
              </Container>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
