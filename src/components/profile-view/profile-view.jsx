import { useState } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from 'react-bootstrap';
import { FloatingLabel } from "react-bootstrap";


export const ProfileView = ({ user, movies }) => {
    ///// useState to update User information
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');    
  ///// handle update User
    const handleSubmit = (event) => {
        event.preventDefault();
        
            const data = {
                username: username,
                password: password,
                email: email,
                birthdate: birthdate
              };
              
              fetch(`${Backend_API}/users`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-Type": "application/json"
                }
              });
            };

  const favorites = movies.filter((movie) => {
              return user.favorites.includes(movie.id)
          });
  
////////////// User Info ////////////////////
  return (
    <Container >
      <Row>                 
        <Col md={6} lg={6}>               
            <Card >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body >
                <Card.Title>
                    {user.username}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                    {user.email}
                    </Card.Subtitle>
                <Button variant="primary">
                    Contact 
                </Button>
            </Card.Body>
            </Card>
        </Col>

        <Col >              
        {favorites.map((movies) => {
          return(
            <Carousel>
                <Carousel.Item key={movies.id}>
                    <img
                    className="d-block w-100"
                    src={movies.Poster}
                    alt={movies.Title}
                    />
                    <Carousel.Caption>
                      <Link to={`/movie/${movies.id}`} >
                        <h3>Nr. 1 {movies.Title}</h3>
                        <p>{movies.Description}</p>
                      </Link>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
          )
        })
        } 
        </Col>
      </Row>

      <Row>             
        <Col md={6}>           
        <Form 
            onSubmit={handleSubmit} 
            className="floating-label-form" >
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username" />
              </FloatingLabel>
        
              <FloatingLabel 
              controlId="floatingPassword" 
              label="Password">
                <Form.Control 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}        
                />
              </FloatingLabel>

              <FloatingLabel 
              controlId="floatingEmail" 
              label="Email">
                <Form.Control 
                type="email" 
                placeholder="name@example.com" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}        
                />
              </FloatingLabel>

              <FloatingLabel 
              controlId="floatingBirthday" 
              label="Birthdate">
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
              className="form-button" > 
              Update your data 
              </Button>
              </div>
            </Form>
        </Col>          
        <Col md={6} >          
            <>
              <Button variant="outline-primary"> 
                Delete your Profile
               </Button>
            </>
        </Col>
      </Row>
    </Container>
  );
}