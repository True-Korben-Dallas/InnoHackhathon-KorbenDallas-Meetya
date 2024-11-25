import React from 'react';
import Header from '../components/Header';
import EventForm from '../components/EventForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';

const CreateEvent = () => {
    return (
        <div>
            <Header />
            <Container className="mt-4">
                <h2 className="mb-4">Create an Event</h2>
                <EventForm />
            </Container>
        </div>
    );
};

export default CreateEvent;
