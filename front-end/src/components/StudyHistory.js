import React, { useState, useEffect } from 'react';
import { ListGroup, Container, Row, Col, Alert, Button } from 'react-bootstrap';
import CourseDataService from '../services/course.service';
import UserDataService from '../services/user.service';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './StudyHistory.css';

function StudyHistory() {
    const { user, setCourseInfo } = useAuth(); // Auth context to get/set course info
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState(null);
    const [history, setHistory] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch student ID on load based on the logged-in user's username
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setStudentId(response.data.userId);
                })
                .catch(error => {
                    setErrorMessage('Failed to fetch user information: ' + error.message);
                });
        }
    }, [user]);

    // Fetch the study history once the student ID is available
    useEffect(() => {
        if (studentId) {
            CourseDataService.getAllCourseByStudentId(studentId)
                .then(response => {
                    setHistory(response.data);
                })
                .catch(error => {
                    setErrorMessage('Failed to load study history: ' + error.message);
                });
        }
    }, [studentId]);

    const handleTakeCourse = (courseId) => {
        setCourseInfo(courseId, studentId); // Save course and student ID to context
        navigate('/take-course'); // Redirect to TakeCourse.js
    };

    return (
        <Container className="study-history-container">
            <h1 className="text-center mt-4 mb-4">Study History</h1>

            <Button variant="secondary" onClick={() => navigate('/student-dashboard')} className="mb-3">
                Back to Dashboard
            </Button>

            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <Row>
                <Col md={8} className="mx-auto">
                    {history.length > 0 ? (
                        <ListGroup className="history-list">
                            {history.map((entry) => (
                                <ListGroup.Item key={entry.historyId} className="history-item">
                                    <h5 className="course-title">{entry.course.title}</h5>
                                    <p className="course-content">{entry.course.content}</p>
                                    <p><strong>Level:</strong> {entry.course.level}</p>
                                    <p><strong>Price:</strong> ${entry.course.price.toFixed(2)}</p>
                                    <p><strong>Instructor:</strong> {entry.course.teacher.username}</p>
                                    <Button variant="primary" onClick={() => handleTakeCourse(entry.course.courseId)}>
                                        Take Course
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p className="text-center">No study history available.</p>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default StudyHistory;
