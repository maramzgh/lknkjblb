import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/Navbar.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import ConnectButton from './ConnectButton';
import * as Icon from 'react-bootstrap-icons';

function MyNavbar(props) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <Navbar bg="transparent" expand="lg" className="Nav">
        <Container fluid>
          <Navbar.Brand className="Brand">
            <Link
              to={'/'}
              style={{
                textDecoration: 'none',
                color: '#000',
                fontWeight: 'bold',
                fontSize: '1.4em',
              }}
            >
              Sailify
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link
                href="#action2"
                className="NavLink"
                style={{ color: 'black' }}
              >
                My Favorites
              </Nav.Link>
              <Nav.Link
                href="/voiliers"
                className="NavLink"
                style={{ color: 'black' }}
              >
                All sailboats
              </Nav.Link>

              <Form className="d-flex ">
                <Form.Control
                  style={{ border: '1px black solid' }}
                  type="search"
                  placeholder="Search"
                  className="me-2 rounded-pill SearchBox"
                  aria-label="Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
                <Button
                  variant="light"
                  className="rounded-pill SearchButton"
                  style={{ border: '1px black solid' }}
                >
                  <Icon.Search className="SearchIcon" />
                </Button>
              </Form>
            </Nav>

            <ConnectButton className="ConnexionButton" />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default MyNavbar;
