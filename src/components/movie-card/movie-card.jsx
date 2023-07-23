import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss";


export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <a href={`/movies/${encodeURIComponent(movie.id)}`}>
        <Card.Img variant="top" src={movie.Poster} className="movie-card-img"
        />
      </a>
      <Card.Body className="d-flex flex-column">
        <Card.Title> {movie.Title} </Card.Title>
        <Card.Text> {movie.Description} </Card.Text>
        <Link
          className="d-grid gap-2 mt-auto"
          to={`/movies/${encodeURIComponent(movie.id)}`}
        >
          <Button className="btn btn-primary " type="button">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
