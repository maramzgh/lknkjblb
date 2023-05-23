import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const Registration = ({ show, setShow, onRegistrationSuccess, onRegistrationComplete, onRegistrationFailure}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const formData = { username, email, password };
  // eslint-disable-next-line
  const [usernameError, setUsernameError] = useState(false);
  // eslint-disable-next-line
  const [emailError, setEmailError] = useState(false);
  // eslint-disable-next-line
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleRegistration(event) {
    event.preventDefault();
    onRegistrationSuccess();
    // Check if the form data is empty
    if (!username || !email || !password) {
      setShow(false); // Close the modal when the form data is empty
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (res.status === 201) {
        // Handle successful registration
        console.log('User registered successfully');
      } else if (res.status === 409) {
        // Handle registration failure (user already exists)
        console.log('User already exists');
      } else {
        // Handle other registration failures
        console.log('Failed to register user');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      onRegistrationFailure();
    }
  }

  const handleClose = () => setShow(false);
  const handleBackButtonClick = () => {
    setShow(false);
   
};

  return (
    <Modal show={show} onHide={handleClose}>
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
              type="submit"
              onClick={handleClose}
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
              onClick={handleBackButtonClick}
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

