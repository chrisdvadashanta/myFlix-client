import Card from 'react-bootstrap/Card';

export const MovieCard = ({movie, onMovieClick}) => {
  return (
    <Card className= "h-100" >
      <Card.Img 
      variant="top" 
      src= {movie.Poster} 
      onClick = {()=> { onMovieClick(movie); }}
      />
      <Card.Body>
        <Card.Title> {movie.Title} </Card.Title>
        <Card.Text> {movie.Description} </Card.Text>
      </Card.Body>
    </Card>
  ); 
}

