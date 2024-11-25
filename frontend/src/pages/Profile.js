import React, { useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import userProfileImage from '../assets/sample-image.jpg';

const Profile = () => {
    const [user, setUser] = useState({
        name: 'Username',
        email: 'user@example.com',
        eventsCreated: 5,
        eventsJoined: 10,
    });

    const [editModalShow, setEditModalShow] = useState(false);
    const [currentUser, setCurrentUser] = useState(user);

    const handleSave = () => {
        setUser(currentUser);
        setEditModalShow(false);
    };

    return (
        <div>
            <Header />
            <Container className="mt-4">
                <Row>
                    <Col md={4} className="text-center">
                        <img src={userProfileImage} alt="User Profile" className="img-thumbnail mb-3" />
                        <h3>{user.name}</h3>
                        <p>{user.email}</p>
                        <Button variant="primary" onClick={() => setEditModalShow(true)}>Edit Profile</Button>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                <h4>Profile Details</h4>
                                <p><strong>Events Created:</strong> {user.eventsCreated}</p>
                                <p><strong>Events Joined:</strong> {user.eventsJoined}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={currentUser.name} onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={currentUser.email} onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditModalShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Profile;
