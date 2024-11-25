import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import Header from '../components/Header';
import sampleImage from '../assets/sample-image.jpg';
import { tagStyles, tagsList } from '../constants/tags';
import styles from './EventDetail.module.scss';

const EventDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const event = state?.event;

    const [editModalShow, setEditModalShow] = useState(false);
    const [deleteModalShow, setDeleteModalShow] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(event || {});

    const handleDelete = () => {
        navigate('/');
    };

    const handleSave = () => {
        setEditModalShow(false);
    };

    const handleTagChange = (e) => {
        setCurrentEvent({ ...currentEvent, tags: { ...currentEvent.tags, [e.target.name]: e.target.checked } });
    };

    return (
        <div>
            <Header />
            <Container className={`mt-4 ${styles.eventDetail}`}>
                {event ? (
                    <Card>
                        <Card.Img variant="top" src={event.imageUrl || sampleImage} className={styles.cardImage} />
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <Card.Title>{event.title}</Card.Title>
                                <div>
                                    <Button variant="secondary" className="me-2" onClick={() => setEditModalShow(true)}>Edit</Button>
                                    <Button variant="danger" onClick={() => setDeleteModalShow(true)}>Delete</Button>
                                </div>
                            </div>
                            <Card.Text>Date: {event.date}</Card.Text>
                            <Card.Text>{event.description}</Card.Text>
                            <Card.Text>
                                Tags: {event.tags ? Object.entries(event.tags).filter(([key, value]) => value).map(([key]) => (
                                    <span key={key} className={`badge ${tagStyles[key]}`}>{key}</span>
                                )) : 'No tags'}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                ) : (
                    <p>Event not found</p>
                )}
            </Container>

            <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentEvent && (
                        <Form>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Event Title</Form.Label>
                                <Form.Control type="text" value={currentEvent.title} onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} value={currentEvent.description} onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="date">
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" value={currentEvent.date} onChange={(e) => setCurrentEvent({ ...currentEvent, date: e.target.value })} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tags">
                                <Form.Label>Tags</Form.Label>
                                {tagsList.map(tag => (
                                    <Form.Check key={tag} type="checkbox" label={tag} name={tag} checked={currentEvent.tags[tag]} onChange={handleTagChange} />
                                ))}
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditModalShow(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this event?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>Close</Button>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EventDetail;
