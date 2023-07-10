import { React, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Backend_API } from "../../utils/constant";

export const SignupView = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthdate, setBirthdate] = useState("");
    
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
                })
                .then(response => {
                  if (!response.ok) {
                    throw new Error("Failed to create user"); // Throw an error if the response status is not OK
                  }
                  return response.json();
                  
                })
                .then((data) => {
                  console.log('Login response: ', data);
                  alert("You can proceed to login");
                })
                .catch((error) => {
                      console.log("Error occurred during signup: ", error);
                      alert("Something went wrong during signup");
                    })
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
