import PropTypes from "prop-types";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";


export const MovieView = ({ movie }) => {
  return (
    <div>
      <div align="center">
        <img src={movie.Poster} />
      </div>
      <p />
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header> Title: {movie.Title}</Accordion.Header>
          <Accordion.Body>{movie.Description}</Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="1">
          <Accordion.Header> Director: {movie.Director.Name}</Accordion.Header>
          <Accordion.Body>
            Name and Age
            {movie.Director.Description}
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2">
          <Accordion.Header> Genre: {movie.Genre}</Accordion.Header>
          <Accordion.Body>Description</Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <p />
      <div className="d-grid gap-2">
        <Link to={`/`}>
          <Button variant="primary" size="sm" >Back</Button>
        </Link>
      </div>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.shape({
      $oid: PropTypes.string,
    }),
    Title: PropTypes.string,
    Poster: PropTypes.string,
    Director: {
      Name: PropTypes.string,
    },
    Description: PropTypes.string,
    Genre:
      PropTypes.string[
        {
          name: PropTypes.string,
          description: PropTypes.string,
        }
      ],
  }).isRequired,
};
