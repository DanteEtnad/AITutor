import React from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CoursePreview() {
    const navigate = useNavigate();

    // 假设这是公开的课程数据
    const courses = [
        { id: 1, title: 'AI Basics', description: 'Introduction to AI and its applications.' },
        { id: 2, title: 'Machine Learning', description: 'Fundamentals of Machine Learning.' },
        { id: 3, title: 'Deep Learning', description: 'Understanding Neural Networks and Deep Learning.' },
    ];

    return (
        <Container>
            <h1 className="text-center my-4">Course Preview</h1>
            <Row>
                {courses.map(course => (
                    <Col key={course.id} md={4}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate('/login')}
                                >
                                    View Details (Login Required)
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CoursePreview;
