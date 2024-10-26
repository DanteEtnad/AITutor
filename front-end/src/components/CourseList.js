import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Alert, Modal } from 'react-bootstrap';
import CourseDataService from '../services/course.service';
import UserDataService from '../services/user.service';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './CourseList.css';

function CourseList() {
    const { user, setCourseInfo } = useAuth(); // Get user and setCourseInfo from AuthContext
    const [userId, setUserId] = useState(null);
    const [courses, setCourses] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const navigate = useNavigate(); // Navigation hook

    // Fetch user information on component load to get userId
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setUserId(response.data.userId); // Set the userId
                })
                .catch(e => {
                    setErrorMessage(`Error fetching user info: ${e.response?.data || e.message}`);
                });
        }
    }, [user]);

    // Fetch all courses
    useEffect(() => {
        CourseDataService.getAllCourse()
            .then(response => {
                setCourses(response.data.map(course => ({ ...course, isSelected: false })));
            })
            .catch(error => {
                const message = error.response?.data?.message || 'Failed to load courses';
                setErrorMessage(message);
            });
    }, []);

    // Handle course selection
    const handleSelectCourse = (course) => {
        if (!userId) {
            setErrorMessage('Please log in to select a course.');
            return;
        }

        CourseDataService.selectCourse(userId, course.courseId)
            .then(response => {
                setSelectedCourse(course);
                setCourseInfo(course.courseId, userId); // Save courseId and userId to AuthContext
                setShowModal(true);
            })
            .catch(error => {
                const message = error.response?.data || 'Course selection failed, please try again.';
                setErrorMessage(message);
            });
    };

    // Close modal and navigate to TakeCourse
    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/take-course'); // Redirect to TakeCourse
    };

    return (
        <Container className="course-list-container">
            <h1 className="text-center mt-4 mb-4">Available Courses</h1>

            {errorMessage && (
                <Alert variant="danger">
                    {typeof errorMessage === 'string' ? errorMessage : 'An error occurred'}
                </Alert>
            )}

            <Row>
                {courses.map(course => (
                    <Col key={course.courseId} md={6} lg={4} className="mb-4">
                        <Card className="course-card">
                            <Card.Body>
                                <Card.Title>{course.title}</Card.Title>
                                <Card.Text>Course ID: {course.courseId}</Card.Text>
                                <Card.Text>Instructor: {course.teacher?.username || 'N/A'}</Card.Text>
                                <Card.Text>{course.content}</Card.Text>
                                <Card.Text>Level: {course.level}</Card.Text>
                                <Card.Text>Price: ${course.price}</Card.Text>
                                <Button
                                    variant={course.isSelected ? 'success' : 'primary'}
                                    onClick={() => handleSelectCourse(course)}
                                >
                                    {course.isSelected ? 'Selected' : 'Select Course'}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Course Selected Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have successfully selected the course: {selectedCourse?.title}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Go to Course Now
                    </Button>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Study Later
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default CourseList;
