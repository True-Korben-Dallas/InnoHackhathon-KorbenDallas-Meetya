import React, { useState } from 'react';
import Header from '../components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { tagStyles, tagsList } from '../constants/tags';
import styles from './Groups.module.scss';

const Groups = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: 'Group 1',
      description: 'This is group 1',
      tags: { tag1: true, tag2: false },
    },
    {
      id: 2,
      name: 'Group 2',
      description: 'This is group 2',
      tags: { tag1: false, tag2: true },
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentGroup, setCurrentGroup] = useState({
    name: '',
    description: '',
    tags: tagsList.reduce((acc, tag) => {
      acc[tag] = false;
      return acc;
    }, {}),
  });

  const handleSave = () => {
    if (currentGroup.id) {
      setGroups(groups.map((group) => (group.id === currentGroup.id ? currentGroup : group)));
    } else {
      setCurrentGroup({ ...currentGroup, id: Date.now() });
      setGroups([...groups, { ...currentGroup, id: Date.now() }]);
    }
    setShowModal(false);
    setCurrentGroup({
      name: '',
      description: '',
      tags: tagsList.reduce((acc, tag) => {
        acc[tag] = false;
        return acc;
      }, {}),
    });
  };

  const handleTagChange = (e) => {
    setCurrentGroup({
      ...currentGroup,
      tags: { ...currentGroup.tags, [e.target.name]: e.target.checked },
    });
  };

  const handleEditGroup = (group) => {
    setCurrentGroup({
      ...group,
      tags: {
        ...tagsList.reduce((acc, tag) => {
          acc[tag] = false;
          return acc;
        }, {}),
        ...group.tags,
      },
    });
    setShowModal(true);
  };

  return (
    <div>
      <Header />
      <Container className={`mt-4 ${styles.groupsContainer}`}>
        <div className={styles.headerContainer}>
          <h2>Users Group</h2>
          <Button
            variant="success"
            onClick={() => {
              setCurrentGroup({
                name: '',
                description: '',
                tags: tagsList.reduce((acc, tag) => {
                  acc[tag] = false;
                  return acc;
                }, {}),
              });
              setShowModal(true);
            }}
          >
            Create New Group
          </Button>
        </div>
        <Row>
          {groups.map((group) => (
            <Col key={group.id} md={6} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{group.name}</Card.Title>
                  <Card.Text>{group.description}</Card.Text>
                  <Card.Text>
                    Tags:{' '}
                    {group.tags
                      ? Object.entries(group.tags)
                          .filter(([key, value]) => value)
                          .map(([key]) => (
                            <span key={key} className={`badge ${styles.tagBadge} ${tagStyles[key]}`}>
                              {key}
                            </span>
                          ))
                      : 'No tags'}
                  </Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleEditGroup(group)}
                  >
                    Edit Group
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentGroup.id ? 'Edit Group' : 'Create New Group'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentGroup.name}
                onChange={(e) =>
                  setCurrentGroup({ ...currentGroup, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={currentGroup.description}
                onChange={(e) =>
                  setCurrentGroup({
                    ...currentGroup,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="tags">
              <Form.Label>Tags</Form.Label>
              {tagsList.map((tag) => (
                <div key={tag} className={styles.formCheck}>
                  <input
                    className={styles.formCheckInput}
                    type="checkbox"
                    id={tag}
                    name={tag}
                    checked={currentGroup.tags[tag]}
                    onChange={handleTagChange}
                  />
                  <label className={styles.formCheckLabel} htmlFor={tag}>
                    {tag}
                  </label>
                </div>
              ))}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            {currentGroup.id ? 'Save Changes' : 'Create Group'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Groups;
