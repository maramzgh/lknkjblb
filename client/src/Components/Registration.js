import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import useFetch from '../useFetch';

const Registration = ({ show, setShow, onRegistrationSuccess, onRegistrationComplete, onRegistrationFailure }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const formData = { username, email, password };

  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  

 async function handleRegistration(event) {
  event.preventDefault();
  onRegistrationSuccess();
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    onRegistrationComplete(data);
  } catch (error) {
    console.error('Error registering user:', error);
    onRegistrationFailure();
  }
}

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create an account</Modal.Title>
      </Modal.Header>
  
      <Modal.Body>
        <Form onSubmit={handleRegistration}>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
              isInvalid={usernameError}
            />
            <Form.Control.Feedback type="invalid">
              Username is required
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
              isInvalid={emailError}
            />
            <Form.Control.Feedback type="invalid">
              Email is required
            </Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
              isInvalid={passwordError}
            />
            <Form.Control.Feedback type="invalid">
              Password is required
            </Form.Control.Feedback>
          </Form.Group>
          
          <Button
              variant="primary"
              type="button"
              onClick={() => setShow(false)}
              style={{
                backgroundColor: '#3f5c88',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.2rem',
                fontWeight: '500',
                marginTop: '20px',
                padding: '10px 20px',
              }}
              disabled={!username || !email || !password}
            >
              sign up
            </Button>
            
          <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: '#000',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.2rem',
              fontWeight: '500',
              padding: '10px 20px',
            }}
            
          >
            Back
          </Button></Modal.Footer>
        
        </Form>
      </Modal.Body>
    </Modal>
  );
  
    
  
}; 
export default Registration;

