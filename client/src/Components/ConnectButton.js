import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import RegistrationModal from './Registration';

const ConnectButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [username, setUsername] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        const username = data.username; // Retrieve the username from the user object in the response
        setUsername(username);
        setErrorMessage('');
        setLoginSuccess(true);
      } else if (res.status === 401) {
        setErrorMessage('Incorrect password');
        setLoginSuccess(false);
      } else if (res.status === 404) {
        setErrorMessage('User not found');
        setLoginSuccess(false);
      } else {
        const errorData = await res.json();
        setErrorMessage(errorData.message || 'Login failed');
        setLoginSuccess(false);
      }
    } catch (error) {
      setErrorMessage('Login failed');
      setLoginSuccess(false);
    }
  };
  
      

  const handleShowLogin = () => {
    setShowLoginModal(true);
    setShowRegistrationModal(false);
  };

  const handleShowRegistration = () => {
    setShowRegistrationModal(true);
    setShowLoginModal(false);
  };

  const handleRegistrationSuccess = () => {
    setShowRegistrationModal(false);
    setShowLoginModal(true);
  };

  const handleClose = () => {
    setShowLoginModal(false);
    setErrorMessage('');
    setLoginSuccess(false);
  };
  if (loginSuccess) {
    return (
      <div>
        <Button variant="light" onClick={handleClose}
        style={{
          backgroundColor: '#000',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
          fontWeight: '500',
          padding: '10px 20px',
          margin: '0 10px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
        }} >
        <Icon.PersonFill size="1.2em" style={{ marginRight: '5px', marginLeft: '0' }} />
          <p style={{ margin: '0' }}>Hello, {username}</p>
          
        </Button>
      </div>
    );
  }
  return (
    <>
      <Button variant="light" onClick={handleShowLogin}
        
        style={{
          backgroundColor: '#000',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
          fontWeight: '500',
          padding: '10px 20px',
          margin: '0 10px',
          color: '#fff',
        }}
      >
        Connexion
        <Icon.Person size="1.2em" />
      </Button>
      

      <Modal show={showLoginModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Connect to your account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                {errorMessage}
              </div>
            )}

            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                id="email-input"
                name="email"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <div className="invalid-feedback" id="email-error" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                id="password-input"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <div className="invalid-feedback" id="password-error" />
            </Form.Group>

            <Button variant="primary" type="submit"
             style={{
                backgroundColor: '#3f5c88',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.2rem',
                fontWeight: '500',
                marginTop: '20px',
                padding: '10px 20px',
              }}>
              Login
            </Button>

            <p className="text-center mt-2 mb-0">
              New to Sailify?{' '}
              <Link onClick={handleShowRegistration} 
              style={{
                color: '#3f5c88',
                textDecoration: 'underline',
              }}>
                <u>Create an account</u>
              </Link>
            </p>
          </Form>
        </Modal.Body>
      </Modal>

      <RegistrationModal
        show={showRegistrationModal}
        onHide={() => setShowRegistrationModal(false)}
        onRegistrationSuccess={handleRegistrationSuccess}
      />
    </>
  );
};

export default ConnectButton;
