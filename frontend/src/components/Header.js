import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import styles from './Header.module.scss';

const Header = ({ user }) => {
    const username = user?.name || 'Guest';

    return (
        <Navbar bg="white" expand="lg" className={styles.header}>
            <Container>
                <Navbar.Brand href="#/">Event Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#/create-event">Create Event</Nav.Link>
                        <Nav.Link href="#/groups">Users Group</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title={<><PersonFill size={30} /><span className={styles.username}>{username}</span></>} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#/profile">Profile</NavDropdown.Item>
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
