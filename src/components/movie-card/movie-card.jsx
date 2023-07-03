import Card from "react-bootstrap/Card";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={movie.Poster}
      />
      <Card.Body>
        <Card.Title> {movie.Title} </Card.Title>
        <Card.Text> {movie.Description} </Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
