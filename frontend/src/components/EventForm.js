import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { tagsList } from '../constants/tags';
import styles from './EventForm.module.scss';


const EventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState(tagsList.reduce((acc, tag) => {
    acc[tag] = false;
    return acc;
  }, {}));
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      title,
      description,
      tags,
      date,
      location,
      image,
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleTagChange = (e) => {
    setTags({ ...tags, [e.target.name]: e.target.checked });
  };

  return (
    <Form onSubmit={handleSubmit} className={styles.eventForm}>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Event Title</Form.Label>
            <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3" controlId="tags">
            <Form.Label>Tags</Form.Label>
            <div className={styles.tagsContainer}>
              {tagsList.map(tag => (
                <div key={tag} className={styles.formCheck}>
                  <input
                    className={styles.formCheckInput}
                    type="checkbox"
                    id={tag}
                    name={tag}
                    checked={tags[tag]}
                    onChange={handleTagChange}
                  />
                  <label className={styles.formCheckLabel} htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))}
            </div>
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="description">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Form.Group>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="image">
        <Form.Label>Event Image</Form.Label>
        <Form.Control type="file" onChange={handleImageChange} />
        {image && <img src={image} alt="Event Preview" className={`${styles.imagePreview} img-thumbnail`} />}
      </Form.Group>
      <Button variant="primary" type="submit">Create Event</Button>
    </Form>
  );
};

export default EventForm;
