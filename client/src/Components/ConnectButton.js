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
  // eslint-disable-next-line
  const [errorMsg, setErrorMsg] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleConnect = (e) => {
    e.preventDefault();
    if (!email) {
      document.getElementById("email-input").classList.add("is-invalid");
      document.getElementById("email-error").textContent = "Email is required";
      return;
    }
    if (!password) {
      document.getElementById("password-input").classList.add("is-invalid");
      document.getElementById("password-error").textContent =
        "Password is required";
      return;
    }
    // Perform connect functionality with email and password
    setShowLoginModal(false);
  };
  
  // eslint-disable-next-line
  const handleShowLogin = () => {
    setShowLoginModal(true);
    setShowRegistrationModal(false);
    setErrorMsg('');
  };

  const handleShowRegistration = () => {
    setShowRegistrationModal(true);
    setShowLoginModal(false);
    setErrorMsg('');
  };
  
  const handleRegistrationSuccess = () => {
    setShowRegistrationModal(false);
    setShowLoginModal(true);
    setErrorMsg('');
  };
  return (
    <>
      <Button variant="light" onClick={() => setShowLoginModal(true)}>
        < Button 
        variant="primary"
        onClick={() => setShowLoginModal(true)}
        style={{
          backgroundColor: '#000',
          border: 'none',
          borderRadius: '5px',
          fontSize: '1.2rem',
          fontWeight: '500',
          padding: '10px 20px',
          margin: '0 10px',
        }}>
        Connexion
        <Icon.Person size="1.2em"></Icon.Person>
      </Button>
      </Button>

      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Connect to your account</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Form onSubmit={handleConnect}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="email-input"
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
            <div id="email-error" className="invalid-feedback"></div>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password-input"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
            <div id="password-error" className="invalid-feedback"></div>
            <Link style={{
                  color: '#3f5c88',
                  textDecoration: 'none',
                  margin: '5px',
                  fontWeight: '500',
                }}>
              Forgot password?
            </Link>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            style={{
              backgroundColor: '#3f5c88',
              border: 'none',
              borderRadius: '5px',
              fontSize: '1.2rem',
              fontWeight: '500',
              marginTop: '20px',
              padding: '10px 20px',
            }}
          >
            Login
          </Button>
        </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleShowRegistration}
          style={{
            backgroundColor: '#000',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.2rem',
            fontWeight: '500',
            padding: '10px 20px',
          }}>
            Create an account
          </Button>
        </Modal.Footer>
      </Modal>

      <RegistrationModal
        show={showRegistrationModal}
        setShow={setShowRegistrationModal}
        onRegistrationSuccess={handleRegistrationSuccess}
        
      />
    </>
  );
};

export default ConnectButton;
