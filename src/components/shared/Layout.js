import Navbar from 'react-bootstrap/Navbar';
import { Container, Button } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import PropTypes from 'prop-types';

import AuthContext from './AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="primary" variant="dark" style={{ padding: '10px' }}>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            {user && (
              <Nav.Link as={Link} to="/admin-ui">
                Admin UI
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {!user && (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
            {user && <Nav.Link href="#">{user?.email}</Nav.Link>}
          </Nav>
          {user && (
            <Button
              variant="primary"
              type="button"
              onClick={() => {
                logout();
              }}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Navbar>
      <Container>{children}</Container>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
