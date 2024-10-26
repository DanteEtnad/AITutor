import React, { useState, useEffect } from 'react';
import { Button, Card, Container, Row, Col, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CourseDataService from '../services/course.service';
import UserDataService from '../services/user.service';
import './StudentDashboard.css';

function StudentDashboard() {
    const { user, setCourseInfo, logout } = useAuth(); // Get user and courseInfo functions from AuthContext
    const navigate = useNavigate();
    const [studentId, setStudentId] = useState(null);
    const [recentCourses, setRecentCourses] = useState([]); // Store last three courses
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch studentId on component load
    useEffect(() => {
        if (user && user.username) {
            UserDataService.getUserInfo(user.username)
                .then(response => {
                    setStudentId(response.data.userId);
                })
                .catch(error => {
                    setErrorMessage(`Failed to fetch user information: ${error.message}`);
                });
        }
    }, [user]);

    // Fetch the last three courses once studentId is available
    useEffect(() => {
        if (studentId) {
            CourseDataService.getAllCourseByStudentId(studentId)
                .then(response => {
                    const lastThreeCourses = response.data.slice(-3).reverse(); // Get the last three courses
                    setRecentCourses(lastThreeCourses);
                })
                .catch(error => {
                    setErrorMessage(`Failed to load recent courses: ${error.message}`);
                });
        }
    }, [studentId]);

    // Navigate to course and save course info
    const handleTakeCourse = (courseId) => {
        setCourseInfo(courseId, studentId); // Save courseId and studentId to context
        navigate('/take-course');
    };

    // Additional navigation handlers
    const navigateToProfile = () => navigate('/profile');
    const navigateToRecharge = () => navigate('/recharge');
    const navigateToCourses = () => navigate('/course-list');
    const navigateToHistory = () => navigate('/study-history');
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Container className="dashboard-container">
            <h1 className="text-center mt-4 mb-4">Welcome, {user.username}!</h1>

            <Row className="dashboard-actions mb-4">
                <Col>
                    <Button variant="info" onClick={navigateToProfile} className="dashboard-btn">View Profile</Button>
                </Col>
                <Col>
                    <Button variant="success" onClick={navigateToRecharge} className="dashboard-btn">Recharge</Button>
                </Col>
                <Col>
                    <Button variant="primary" onClick={navigateToCourses} className="dashboard-btn">Courses</Button>
                </Col>
                <Col>
                    <Button variant="warning" onClick={navigateToHistory} className="dashboard-btn">Study History</Button>
                </Col>
            </Row>

            {/* Display error message if any */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            <div className="recent-courses">
                <h3>Recently Taken Courses</h3>
                {recentCourses.length > 0 ? (
                    <ListGroup className="mb-4">
                        {recentCourses.map((entry) => (
                            <ListGroup.Item key={entry.historyId} className="course-item">
                                <div className="course-info">
                                    <h5>{entry.course.title}</h5>
                                    <p>{entry.course.content}</p>
                                    <p><strong>Level:</strong> {entry.course.level}</p>
                                    <p><strong>Instructor:</strong> {entry.course.teacher.username}</p>
                                </div>
                                <Button variant="primary" onClick={() => handleTakeCourse(entry.course.courseId)}>
                                    Go to Course
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <p className="text-center">No recent courses available.</p>
                )}
            </div>

            <div className="logout-button">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
            </div>
        </Container>
    );
}

export default StudentDashboard;
