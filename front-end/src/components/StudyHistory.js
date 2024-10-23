import React, { useState } from 'react';
import { ListGroup, Container, Row, Col } from 'react-bootstrap';
import './StudyHistory.css';

function StudyHistory() {
    const [history, setHistory] = useState([
        { id: 1, name: 'Introduction to AI', status: 'Completed' },
        { id: 2, name: 'Machine Learning', status: 'Completed' },
        { id: 3, name: 'Data Science', status: 'In Progress' },
    ]);

    return (
        <Container className="study-history-container">
            <h1 className="text-center mt-4 mb-4">Study History</h1>
            <Row>
                <Col md={8} className="mx-auto">
                    <ListGroup>
                        {history.map((course) => (
                            <ListGroup.Item key={course.id}>
                                <strong>{course.name}</strong> - {course.status}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
}

export default StudyHistory;
