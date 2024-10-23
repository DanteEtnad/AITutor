import React, { useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import './CourseList.css';

function CourseList() {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Introduction to AI', description: 'Learn the basics of artificial intelligence.', isSelected: false },
        { id: 2, name: 'Machine Learning', description: 'A deep dive into machine learning techniques.', isSelected: false },
        { id: 3, name: 'Data Science', description: 'Understanding data science workflows and tools.', isSelected: false },
        { id: 4, name: 'Deep Learning', description: 'Explore neural networks and deep learning.', isSelected: false },
    ]);

    const selectCourse = (id) => {
        setCourses(
            courses.map(course =>
                course.id === id ? { ...course, isSelected: !course.isSelected } : course
            )
        );
    };

    return (
        <Container className="course-list-container">
            <h1 className="text-center mt-4 mb-4">Available Courses</h1>
            <Row>
                {courses.map((course) => (
                    <Col key={course.id} md={6} lg={4} className="mb-4">
                        <Card className={`course-card ${course.isSelected ? 'selected' : ''}`}>
                            <Card.Body>
                                <Card.Title>{course.name}</Card.Title>
                                <Card.Text>{course.description}</Card.Text>
                                <Button
                                    variant={course.isSelected ? 'success' : 'primary'}
                                    onClick={() => selectCourse(course.id)}
                                >
                                    {course.isSelected ? 'Selected' : 'Select Course'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CourseList;
