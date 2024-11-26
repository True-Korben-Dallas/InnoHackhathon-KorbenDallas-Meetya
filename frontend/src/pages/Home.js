import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
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
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/events/');
                console.log('Fetched events:', response.data);
                setEvents(response.data);
                setFilteredEvents(response.data); 
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const filterEvents = useCallback(() => {
        console.log('Filtering events:', events);
        const filtered = events.filter(event => {
            const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
            const matchesTags = Object.entries(selectedTags).every(([key, value]) => !value || event.tags[key]);
            return matchesSearch && matchesTags;
        });
        setFilteredEvents(filtered);
        console.log('Filtered events:', filtered);
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

    const toggleFilters = () => {
        setOpenFilters(!openFilters);
    };

    const navigateToCreateEvent = () => {
        navigate('/create-event');
    };

    return (
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
                                <Card.Img variant="top" src={event.image || sampleImage} />
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>Date: {new Date(event.date).toLocaleDateString()}</Card.Text>
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
    );
};

export default Home;
