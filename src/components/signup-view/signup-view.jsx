import { React, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SignupView = ({onLoggedIn}) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const Backend_API = "https://guarded-peak-19726.herokuapp.com";
    
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
        
        // Perform login after successful registration
        
                fetch(`${Backend_API}/login`, {
                    method: "POST",
                    body: JSON.stringify(data),
                    headers: {
                      "Content-Type": "application/json"
                    }
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log('Login response: ', data);
                      if (data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        localStorage.setItem('token', data.token);
                        onLoggedIn(data.user, data.token);
                        alert('Logged in successfully, please proceed to the homepage')
                      } else {
                        alert('No such user');
                      }
                    })
                    .catch((error) => {
                      console.log("Error occurred during login: ", error);
                      alert("Something went wrong during login");
                    });
            };

    return (
      <Form 
      onSubmit={handleSubmit} 
      className="floating-label-form" >
                <h1 align="center"> Register </h1>
              <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
              >
                <Form.Control 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
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
                required
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
                required
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
                required
                />
              </FloatingLabel>

              <p />
              <div className="d-grid gap-2">
              <Button 
              type="submit" 
              variant="primary" 
              size="sm" 
              className="form-button" > 
              Register 
              </Button>
              </div>
            </Form>
          );
        };