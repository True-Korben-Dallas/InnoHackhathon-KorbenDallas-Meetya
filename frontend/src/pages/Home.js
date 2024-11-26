import React, { useEffect, useState, useCallback } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Collapse, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import sampleImage from '../assets/sample-image.jpg';
import { tagStyles, tagsList } from '../constants/tags';
import styles from './Home.module.scss';

const Home = ({ user }) => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedTags, setSelectedTags] = useState({});
    const [openFilters, setOpenFilters] = useState(false);
    const [userGroups, setUserGroups] = useState([]); 
    const navigate = useNavigate();

    useEffect(() => {
        const groups = ['Group 1', 'Group 2'];
        setUserGroups(groups);

        const sampleEvents = [
            { id: 1, title: 'Sample Event 1', date: '2024-11-25', description: 'This is a sample event description.', imageUrl: '', tags: { tag1: true, tag2: false, tag3: true }, group: 'Group 1' },
            { id: 2, title: 'Sample Event 2', date: '2024-12-01', description: 'This is another sample event description.', imageUrl: '', tags: { tag1: false, tag2: true, tag3: false }, group: 'Group 2' },
            { id: 3, title: 'Sample Event 3', date: '2024-12-15', description: 'This is a third sample event description.', imageUrl: '', tags: { tag1: true, tag2: true, tag3: false }, group: 'Group 3' },
            { id: 4, title: 'Sample Event 4', date: '2025-01-10', description: 'This is a fourth sample event description.', imageUrl: '', tags: { tag1: false, tag2: false, tag3: true }, group: 'Group 1' },
        ];
        setEvents(sampleEvents);
        setFilteredEvents(sampleEvents.filter(event => groups.includes(event.group)));
    }, []);

    const filterEvents = useCallback(() => {
        const filtered = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
            const matchesTags = Object.entries(selectedTags).every(([key, value]) => {
                return !value || event.tags[key];
            });
            const matchesGroup = userGroups.includes(event.group);
            return matchesSearch && matchesTags && matchesGroup;
        });
        setFilteredEvents(filtered);
    }, [events, search, selectedTags, userGroups]);

    useEffect(() => {
        filterEvents();
    }, [search, selectedTags, userGroups, filterEvents]);

    const handleTagChange = (e) => {
        setSelectedTags({ ...selectedTags, [e.target.name]: e.target.checked });
    };

    const handleView = (event) => {
        navigate(`/event/${event.id}`, { state: { event } });
    };

    const toggleFilters = () => {
        setOpenFilters(!openFilters);
    };

    const navigateToCreateEvent = () => {
        navigate('/create-event');
    };

    return (
        <div>
            <Header user={user} />
            <Container className="mt-4">
                <div className={styles.headerContainer}>
                    <div>
                        <h2>Welcome to the <b>MeetYa!</b></h2>
                        <p>Here you can create, manage, and join events. Use the navigation above to get started.</p>
                    </div>
                    <div className={styles.buttonGroup}>
                        <Button
                            variant="info"
                            onClick={toggleFilters}
                            aria-controls="filter-panel"
                            aria-expanded={openFilters}
                        >
                            {openFilters ? 'Hide Filters' : 'Show Filters'}
                        </Button>
                        <Button
                            variant="primary"
                            onClick={navigateToCreateEvent}
                            className={styles.createEventButton}
                        >
                            Create Event
                        </Button>
                    </div>
                </div>
                <Collapse in={openFilters}>
                    <div id="filter-panel" className={styles.filterPanelContainer}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="search">
                                    <Form.Label>Search by Title</Form.Label>
                                    <Form.Control type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="tags">
                                    <Form.Label>Filter by Tags</Form.Label>
                                    <div className={styles.filterTags}>
                                        {tagsList.map(tag => (
                                            <div key={tag} className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    id={tag}
                                                    name={tag}
                                                    checked={selectedTags[tag]}
                                                    onChange={handleTagChange}
                                                />
                                                <label className="form-check-label" htmlFor={tag}>{tag}</label>
                                            </div>
                                        ))}
                                    </div>
                                </Form.Group>
                            </Col>
                        </Row>
                    </div>
                </Collapse>
                <h3 className={styles.existingEventsHeader}>Existing Events</h3>
                {filteredEvents.length === 0 ? (
                    <Alert variant="warning">No events found.</Alert>
                ) : (
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
                )}
            </Container>
        </div>
    );
};

export default Home;
