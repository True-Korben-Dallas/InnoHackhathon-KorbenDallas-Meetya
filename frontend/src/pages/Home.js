import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import sampleImage from '../assets/sample-image.jpg';
import { tagStyles } from '../constants/tags';
import styles from './Home.module.scss';

const Home = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const sampleEvents = [
            { id: 1, title: 'Sample Event 1', date: '2024-11-25', description: 'This is a sample event description.', imageUrl: '', tags: { tag1: true, tag2: false, tag3: true } },
            { id: 2, title: 'Sample Event 2', date: '2024-12-01', description: 'This is another sample event description.', imageUrl: '', tags: { tag1: false, tag2: true, tag3: false } },
            { id: 3, title: 'Sample Event 3', date: '2024-12-15', description: 'This is a third sample event description.', imageUrl: '', tags: { tag1: true, tag2: true, tag3: false } },
            { id: 4, title: 'Sample Event 4', date: '2025-01-10', description: 'This is a fourth sample event description.', imageUrl: '', tags: { tag1: false, tag2: false, tag3: true } },
        ];
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents);
    }, []);

    const filterEvents = useCallback(() => {
        const filtered = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
            const matchesTags = Object.entries(selectedTags).every(([key, value]) => {
                return !value || event.tags[key];
            });
            return matchesSearch && matchesTags;
        });
        setFilteredEvents(filtered);
    }, [events, search, selectedTags]);

    useEffect(() => {
        filterEvents();
    }, [search, selectedTags, filterEvents]);

    const handleTagChange = (e) => {
        setSelectedTags({ ...selectedTags, [e.target.name]: e.target.checked });
    };

    const handleView = (event) => {
        navigate(`/event/${event.id}`, { state: { event } });
    };

    return (
        <div>
            <Header user={user} />
            <Container className="mt-4">
                <h2 className="mb-4">Welcome to the Event Management System</h2>
                <p className="mb-5">Here you can create, manage, and join events. Use the navigation above to get started.</p>
                <Form>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Label>Search by Title</Form.Label>
                        <Form.Control type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="tags">
                        <Form.Label>Filter by Tags</Form.Label>
                        {Object.keys(tagStyles).map(tag => (
                            <Form.Check key={tag} type="checkbox" label={tag} name={tag} checked={selectedTags[tag]} onChange={handleTagChange} />
                        ))}
                    </Form.Group>
                </Form>
                <h3 className="mb-4">Existing Events</h3>
                <Row>
                    {filteredEvents.map(event => (
                        <Col key={event.id} md={4} className="mb-4">
                            <Card className={styles.eventCard}>
                                <Card.Img variant="top" src={event.imageUrl || sampleImage} />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>Date: {event.date}</Card.Text>
                                    <Card.Text>{event.description}</Card.Text>
                                    <Card.Text>
                                        Tags: {event.tags ? Object.entries(event.tags).filter(([key, value]) => value).map(([key]) => (
                                            <span key={key} className={`badge ${tagStyles[key]}`}>{key}</span>
                                        )) : 'No tags'}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleView(event)}>View</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Home;
