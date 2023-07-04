import Card from "react-bootstrap/Card";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './movie-card.scss';

export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={movie.Poster}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title> {movie.Title} </Card.Title>
        <Card.Text> {movie.Description} </Card.Text>
        <Link className="d-grid gap-2 mt-auto" to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button class="btn btn-primary " type="button">
            Open
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
