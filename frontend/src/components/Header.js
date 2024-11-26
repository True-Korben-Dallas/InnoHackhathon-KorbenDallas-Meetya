import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import styles from './Header.module.scss';

const Header = ({ user, setUser }) => {
    const username = user?.username || 'Guest';

    const handleLogout = () => {
        localStorage.removeItem('access_token'); 
        setUser(null); 
    };

    return (
        <Navbar bg="white" expand="lg" className={styles.header}>
            <Container>
                <Navbar.Brand href="#/">MeetYa!</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#/create-event">Create Event</Nav.Link>
                        <Nav.Link href="#/groups">Users Group</Nav.Link>
                    </Nav>
                    <Nav>
                        {!user ? (
                            <>
                                <Nav.Link href="#/login">Login</Nav.Link>
                                <Nav.Link href="#/register">Register</Nav.Link>
                            </>
                        ) : (
                            <NavDropdown title={<><PersonFill size={30} /><span className={styles.username}>{username}</span></>} id="basic-nav-dropdown">
                                <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
