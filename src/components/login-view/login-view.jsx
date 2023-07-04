import { React, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const LoginView = ({onLoggedIn}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const Backend_API = "https://guarded-peak-19726.herokuapp.com";

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password,
        };

        fetch(`${Backend_API}/login`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
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
            .catch((e) => {
                console.log("Error occurred: ", e);
                alert("Something went wrong");
            });
    }

//////////Form////////////
    return (
    <Form onSubmit={handleSubmit} className="floating-label-form">
        <h1 align="center"> Login </h1>
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
      <p />
      <div className="d-grid gap-2">
      <Button type="submit" variant="primary" size="sm" className="form-button" > Login </Button>
      </div>
    </Form>
  );
}
