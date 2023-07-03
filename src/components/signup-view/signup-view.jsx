import { React, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export const SignupView = () => {

    const handleSubmit = (event) => {};
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

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
              label="Birthday">
                <Form.Control 
                placeholder="08.05.1978" 
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
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