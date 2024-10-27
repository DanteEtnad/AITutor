import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import './TeacherDashboard.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function TeacherDashboard() {
    const navigate = useNavigate();
    const navigateToProfile = () => navigate('/profile');
    const navigateToUploadCourse = () => navigate('/upload-course');
    const navigateToFinance = () => navigate('/finance');
    const navigateToMyCourses = () => navigate('/my-courses');
    const navigateToLogin = () => navigate('/login');
    return (
        <div className="teacher-dashboard-wrapper">
            <Container>
                <h1 className="dashboard-title">Teacher Dashboard</h1>

                <Row className="mb-4">
                    {/* Overview Cards */}
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Courses</Card.Title>
                                <Card.Text>Manage all your courses</Card.Text>
                                <Button variant="primary" href="/my-courses">Manage Courses</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Upload Courses</Card.Title>
                                <Card.Text>Upload course materials</Card.Text>
                                <Button variant="primary" href="/upload-course">Manage Upload Courses</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="dashboard-card">
                            <Card.Body>
                                <Card.Title>Finance</Card.Title>
                                <Card.Text>View balance and transactions</Card.Text>
                                <Button variant="primary" href="/finance">Manage Finance</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={3}>
                        <Card className="dashboard-card">
                             <Card.Body>
                             <Card.Title>Profile</Card.Title>
                             <Card.Text>View or update your profile</Card.Text>
                             <Button variant="primary" href="/profile">Manage Profile</Button>
                             </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-4">
                    <Col className="text-center">
                        <Button variant="danger" onClick={navigateToLogin}>
                            Logout
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default TeacherDashboard;
